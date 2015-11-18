navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;

var video = document.getElementById("monitor");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// window.URL = window.URL || window.webkitURL;

function get_mouse_pos(cnv, evt) {

    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

clicknum = 1;

video.addEventListener('click', function(evt) {

    var pos = get_mouse_pos(canvas, evt);
    draw_x(ctx, pos.x, pos.y, 10);
    console.log("video mouse pressed at " + pos.x + ", " + pos.y);

}, false);

function draw_x(ctx, center_x, center_y, inner_radius) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(center_x - inner_radius, center_y - inner_radius);
    ctx.lineTo(center_x + inner_radius, center_y + inner_radius);
    ctx.moveTo(center_x - inner_radius, center_y + inner_radius);
    ctx.lineTo(center_x + inner_radius, center_y - inner_radius);
    ctx.stroke();
}

function gotStream(stream) {
    console.log("Getting Stream");

    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream; // Opera.
    }

    video.src = window.URL.createObjectURL(stream);

    setTimeout(function() {
        console.log("Setting canvas width...");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log("Canvas: " + ctx.canvas.width + ", " + ctx.canvas.height);
    }, 3000);
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
