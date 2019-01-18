window.onload=function(){
			var video = document.getElementById("vv");
			var pp=document.getElementById("play");
			video.onpause = video.onplay = function(e) {
			  playPause.value = video.paused ? 'Play' : 'Pause';
			  }
			pp.onclick=function () {video.play();};
			document.getElementById("pause").onclick=function (){video.pause();};
			document.getElementById("playPause").onclick=function playPause() {
			  if (video.paused || video.ended) {
				video.play();
			  } else {
				video.pause();
			  }
			}
}