/* The top left is the "x,y" reference corner */
var grid = function(x, y, width, height, phywidth, phyheight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.phywidth = phywidth;
    this.phyheight = phyheight;
}

grid.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
}

var flair = function(x, y, radius, hidden, style) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.hidden = hidden;
    this.color = color;
}

flair.prototype.draw = function(ctx) {

    var center_x = this.x + this.width/2;
    var center_y = this.y + this.height/2;

    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'red';
    ctx.arc(center_x, center_y, overlay_radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center_x, center_y, overlay_radius, 0, Math.PI * 2, false);
    ctx.clip();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'white';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.arc(center_x, center_y, radius+3, 0, Math.PI * 2, false);
    ctx.stroke();
}
