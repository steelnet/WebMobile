cb = {
	// settings
	serverHost: window.location.host, // automatically retrieved from the URL
	serverPort: 9300,
	usernameMaxLength: 18,
	
	// internal variables
	socket: false,
	connected: false,
	
	// events
	onClickConnect: function() {
		// this function is called when a user clicks the connect or disconnect button
		
		if (cb.isConnected()) {
			// already connected to the server, so disconnect from the server
			cb.disconnect();
			return;
		}
		
		// fetch the username
		var Username = document.getElementById('usernameInput').value;
		
		// validate the username
		if (Username == '') {
			cb.log('You must type a username.');
		}
		else if (Username.indexOf(' ') != -1) {
			cb.log('The username cannot contain a space.');
		}
		else if (Username.length > cb.usernameMaxLength) {
			cb.log('The username cannot be more than '+cb.usernameMaxLength+' characters.');
		}
		else {
			// connect to the server
			cb.setElementsDisabled(true);
			cb.log('Connecting..');
			cb.connect();
		}
	},
	onClickSend: function() {
		// this function is called when a user clicks the send button
		
		// fetch text input element, and text
		var ChatInputElement = document.getElementById('chatInput');
		var Text = ChatInputElement.value;
		
		// validate connection and text
		if (!cb.isConnected()) {
			cb.log('Not connected.');
		}
		else if (Text == '') {
			cb.log('You must type a message.');
		}
		else {
			// send text to server
			cb.socket.send('TEXT '+Text);
			
			// clear the text input
			ChatInputElement.value = '';
		}
	},
	
	// chat lines
	log: function(Text) {
		// add text to the chat area on a new line
		var ChatLinesElement = document.getElementById('chatLines');
		ChatLinesElement.value += ((ChatLinesElement.value != '') ? '\n' : '') + Text;
		
		// scroll the chat area to the far bottom
		ChatLinesElement.scrollTop = 100000;
	},
	
	// server connection
	isConnected: function() {
		return cb.connected;
	},
	connect: function() {
		var Socket = new MozWebSocket('ws://'+cb.serverHost+':'+cb.serverPort);
		cb.setSocketEvents(Socket);
		cb.socket = Socket;
	},
	disconnect: function() {
		cb.socket.send('QUIT');
		cb.socket.close();
	},
	
	// socket events
	setSocketEvents: function(Socket) {
		Socket.onopen = function() {
			// now connected to the server
			cb.connected = true;
			cb.log('Connected.');
			
			// set elements enabled, and connect button text to "Disconnect"
			document.getElementById('sendButton').disabled = false;
			document.getElementById('connectButton').value = 'Disconnect';
			document.getElementById('connectButton').disabled = false;
			
			// fetch username, add username to users list, and send JOIN to server
			var Username = document.getElementById('usernameInput').value;
			cb.users.add(Username);
			cb.socket.send('JOIN '+Username);
		}
		
		Socket.onmessage = function(Message) {
			// fetch data received from server, split data by spaces into array, and fetch command
			var Data = Message.data;
			var Args = Data.split(' ');
			var Command = Args.shift();
			
			// check command
			if (Command == 'ONTEXT') {
				// received chat text
				var Username = Args.shift();
				var Text = Args.join(' ');
				cb.log(Username+': '+Text);
			}
			else if (Command == 'SERVER') {
				// received server text
				var Text = Args.join(' ');
				cb.log('Server: '+Text);
			}
			else if (Command == 'ONJOIN') {
				// user joined
				var Username = Args[0];
				cb.users.add(Username);
				cb.log(Username+' joined.');
			}
			else if (Command == 'ONQUIT') {
				// user quit
				var Username = Args[0];
				cb.users.remove(Username);
				cb.log(Username+' quit.');
			}
			else if (Command == 'USERS') {
				// received list of users
				var Usernames = Args;
				cb.users.set(Usernames);
			}
		}
		
		Socket.onclose = function() {
			if (cb.connected) {
				// was connected to server before onclose was called
				cb.log('Disconnected.');
				
				// set elements disabled, and connect button text to "Connect"
				document.getElementById('sendButton').disabled = true;
				document.getElementById('connectButton').value = 'Connect';
			}
			else {
				// was not connected to server before onclose was called
				cb.log('Failed to connect.');
			}
			
			cb.connected = false;
			
			// clear the list of users
			cb.users.clear();
			
			// set elements enabled
			cb.setElementsDisabled(false);
		}
	},
	
	// users list
	users: {
		count: 0,
		
		add: function(Username) {
			var List = document.getElementById('usersList');
			
			if (cb.users.count == 0) {
				// remove the "(not connected)" list item
				List.removeChild(List.children[0]);
			}
			
			cb.users.count++;
			
			var ListItem = document.createElement('li');
			ListItem.textContent = Username;
			List.appendChild(ListItem);
		},
		remove: function(Username) {
			cb.users.count--;
			
			var List = document.getElementById('usersList');
			var ListItems = List.children;
			
			var i, j = ListItems.length;
			for (i=0; i<j; i++) {
				if (ListItems[i].textContent == Username) {
					List.removeChild(ListItems[i]);
					break;
				}
			}
		},
		set: function(Usernames) {
			var List = document.getElementById('usersList');
			var i, j = Usernames.length, ListItem;
			for (i=0; i<j; i++) {
				ListItem = document.createElement('li');
				ListItem.textContent = Usernames[i];
				List.appendChild(ListItem);
				
				cb.users.count++;
			}
		},
		clear: function() {
			// reset users count to 0
			cb.users.count = 0;
			
			// add the "(not connected)" list item
			document.getElementById('usersList').innerHTML = "<li style='text-align: center;'>(not connected)</li>";
		}
	},
	
	// elements disabled state
	setElementsDisabled: function(State) {
		document.getElementById('usernameInput').disabled = State;
		document.getElementById('connectButton').disabled = State;
	}
}

window.onload = function() {
	// reset elements values and disabled states when page reload with F5
	document.getElementById('chatLines').value = '';
	document.getElementById('chatInput').value = '';
	document.getElementById('usernameInput').value = '';
	document.getElementById('sendButton').disabled = true;
	cb.setElementsDisabled(false);
	
	// make enter key submit the message in the chat input box
	document.getElementById('chatInput').onkeydown = function(event) {
		if (event.keyCode == 13 && !event.shiftKey) { // enter key pressed down, and shift key is not pressed down
			cb.onClickSend();
			event.preventDefault(); // prevent a new line being added to the chat input box
		}
	}
}