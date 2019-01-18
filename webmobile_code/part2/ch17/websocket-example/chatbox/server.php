<?php

/*
	Example Chatbox Script
	 - Uses WebSocket for client and server communication
	 - Works with: ws api.php
	
	Starting the server
	 - Open any browser and visit server.php once (this file). For example: http://127.0.0.1/chatbox/server.php
	   The page should appear to "never load", this is supposed to happen and means the server is running.
	
	Connecting to the chatbox
	 - Open Firefox 6 and visit index.html. For example: http://127.0.0.1/chatbox/
	 - Type a username into the top right box, and press the connect button.
	   You should now be able to send messages, receive messages, and see a list of connected users.
	
	Protocol
	 - This example chatbox script uses a very basic text protocol.
	
	Client -> Server:
		JOIN username
		QUIT
		TEXT text here
	
	Server -> Client:
		ONJOIN username
		ONQUIT username
		ONTEXT username text here
		USERS username1 username2
		SERVER text here
	
	USERS sends a list of space-separated usernames to a client when that client has joined.
	SERVER sends text to a client that is not chat text, for example: Username already taken
	QUIT does not need to take a username because the server stores usernames for clients in $users.
*/

// settings

// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
define('CB_SERVER_BIND_HOST', '127.0.0.1');

// also change at top of main.js
define('CB_SERVER_BIND_PORT', 9300);

// also change at top of main.js
define('CB_MAX_USERNAME_LENGTH', 18);




// prevent the server from timing out
set_time_limit(0);

// include the web sockets server script (the server is started at the far bottom of this file)
require '../ws api.php';




// users are stored in this global array with syntax: $users[ integer ClientID ] = string Username
$users = array();

// when a client sends data to the server
function wsOnMessage($clientID, $message, $messageLength, $binary) {
	// check if message length is 0
	if ($messageLength == 0) {
		wsClose($clientID);
		return;
	}
	
	// split the message by spaces into an array, and fetch the command
	$message = explode(' ', $message);
	$command = array_shift($message);
	
	// check which command was received
	if ($command == 'TEXT') {
		// a client has sent chat text to the server
		
		if (!isUser($clientID)) {
			// the client has not yet sent a JOIN with a valid username, and is trying to send a TEXT
			wsClose($clientID);
			return;
		}
		
		// put the message back into a string
		$text = implode(' ', $message);
		
		if ($text == '') {
			// the text is blank
			wsSend($clientID, 'SERVER Message was blank.');
			return;
		}
		
		// fetch the client's username, and send the chat text to all clients
		// the text is actually also sent back to the client which sent the text, which sort of acts as a confirmation that the text worked
		$username = getUsername($clientID);
		sendChat($username, $text);
	}
	elseif ($command == 'JOIN') {
		// a client is joining the chat
		
		if (isUser($clientID)) {
			// the client has already sent a JOIN with a valid username
			wsClose($clientID);
			return;
		}
		
		// fetch username, and trim any whitespace before and after the username
		$username = trim($message[0]);
		
		if ($username == '') {
			// the username is blank
			wsClose($clientID);
			return;
		}
		if (strlen($username) > CB_MAX_USERNAME_LENGTH) {
			// username length is more than CB_MAX_USERNAME_LENGTH
			wsSend($clientID, 'SERVER Username length cannot be more than '.CB_MAX_USERNAME_LENGTH.'.');
			wsClose($clientID);
			return;
		}
		if (isUsername($username)) {
			// username is already being used by another client
			wsSend($clientID, 'SERVER Username already taken.');
			wsClose($clientID);
			return;
		}
		
		// add the user
		addUser($clientID, $username);
	}
	elseif ($command == 'QUIT') {
		// a client is leaving the chat
		
		if (!isUser($clientID)) {
			// the client has not yet sent a JOIN with a valid username, and is trying to send a QUIT
			wsClose($clientID);
			return;
		}
		
		// remove the user
		removeUser($clientID);
	}
	else {
		// unknown command received, close connection
		wsClose($clientID);
	}
}

// when a client closes or lost connection
function wsOnClose($clientID, $status) {
	// check if the client has sent a JOIN with a valid username
	if (isUser($clientID)) {
		removeUser($clientID);
	}
}

// user functions
function isUser($clientID) {
	// checks if a user exists (if JOIN has previously been received from the client, with a valid username)
	global $users;
	return isset($users[$clientID]);
}
function addUser($clientID, $username) {
	global $users;
	
	// let all clients know about this user joining (not including the user joining)
	foreach ($users as $clientID2 => $username2) {
		wsSend($clientID2, 'ONJOIN '.$username);
	}
	
	// send list of usernames to the user joining
	$usernames = getUsernames();
	wsSend($clientID, 'USERS '.implode(' ', $usernames));
	
	// store the user's client ID and username
	$users[$clientID] = $username;
}
function removeUser($clientID) {
	global $users;
	
	// fetch username for the user leaving
	$username = getUsername($clientID);
	
	// remove data stored for the user leaving
	unset($users[$clientID]);
	
	// let all clients know about this user quitting (not including the user leaving)
	foreach ($users as $clientID2 => $username2) {
		wsSend($clientID2, 'ONQUIT '.$username);
	}
}

// username functions
function getUsername($clientID) {
	// returns the username for a client
	global $users;
	return $users[$clientID];
}
function isUsername($username) {
	// checks if the username is being used by any client
	global $users;
	foreach ($users as $username2) {
		if ($username === $username2) return true;
	}
	return false;
}
function getUsernames() {
	// returns an array of usernames
	global $users;
	
	$usernames = array();
	foreach ($users as $username) {
		$usernames[] = $username;
	}
	
	return $usernames;
}

// chat functions
function sendChat($username, $text) {
	// sends chat text to all clients
	global $users;
	foreach ($users as $clientID => $user) {
		wsSend($clientID, 'ONTEXT '.$username.' '.$text);
	}
}




// start the server
wsStartServer(CB_SERVER_BIND_HOST, CB_SERVER_BIND_PORT);

?>