navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;

var video = document.getElementById("monitor");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// window.URL = window.URL || window.webkitURL;

function gotStream(stream) {
    console.log("Getting Stream");

    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream; // Opera.
    }

    video.src = window.URL.createObjectURL(stream);

    setTimeout(function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }, 50);
}

function noStream(error) {
    console.log("Could not get user media");
    alert("Could not get user media");
}

function getMedia() {
    console.log("Getting user media");
    navigator.getUserMedia({video: true}, gotStream, noStream);
}

function init(el) {
    if (!navigator.getUserMedia) {
        alert('getUserMedia() is not supported in your browser');
    } else {
        console.log("getUserMedia() supported");
        getMedia();
    }
}
