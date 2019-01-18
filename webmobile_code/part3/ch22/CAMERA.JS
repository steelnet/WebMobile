window.addEventListener("load", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		videoObj = { "video": true,"audio":true };

// 获取摄像头
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia(videoObj).then(function(stream) {
			video.src = window.URL.createObjectURL(stream);
			video.play();
			document.getElementById("snap").addEventListener("click", function() {
				context.drawImage(video, 0, 0, 640, 480);
				});
			});
		}
	})