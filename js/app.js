document.addEventListener("deviceready", init, false);
function init() {
	
	
	document.querySelector("#takeVideo").addEventListener("touchend", function() {
		console.log("Take video");
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
	}, false);
	
}

function captureError(e) {
	console.log("capture error: "+JSON.stringify(e));
}

function captureSuccess(s) {
	console.log("Success");
	console.dir(s[0]);
	var v = "<video controls='controls'>";
	v += "<source src='" + s[0].fullPath + "' type='video/mp4'>";
	v += "</video>";
	document.querySelector("#videoArea").innerHTML = v;
	
	
  //here you write logic when upload button is clicked
  $("#uploadvid").on("click",function(){
     uploadFile(s[0]);
  });
}

function uploadFile(mediaFile) {

var ft = new FileTransfer(),
    path = mediaFile.fullPath,
    name = mediaFile.name;
var options = new FileUploadOptions();
options.mimeType = "documents";
options.fileName = name;
options.chunkedMode = true;

ft.upload(path,
    "http://www.alicesons.org/demos/phonegap/uploadv.php",
    function(result) {
        alert('Upload success: ' + result.responseCode);
        alert(result.bytesSent + ' bytes sent');
    },
    function(error) {
        alert('Error uploading file ' + path + ': ' + error.code);
    },
    options);
}