/* The top left is the "x,y" reference corner */
var grid = function(x, y, width, height, phywidth, phyheight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.phywidth = phywidth;
    this.phyheight = phyheight;
    this.flairdown = new flair(0, 0, 10, true, 'red');
    this.flairmove = new flair(0, 0, 10, true, 'blue');
}

grid.prototype.draw = function(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.restore();
    this.flairdown.draw(ctx);
    this.flairmove.draw(ctx);
}

grid.prototype.mousedown = function(ctx, x, y) {
    this.flairdown.x = x;
    this.flairdown.y = y;
    this.flairdown.hidden = false;
    this.flairmove.hidden = false;
    this.flairmove.interactive = true;
    this.flairmove.x = x;
    this.flairmove.y = y;
    this.flairdown.draw(ctx);
}

grid.prototype.mousemove = function(ctx, x, y) {
    if (this.flairmove.interactive == true) {
        this.flairmove.x = x;
        this.flairmove.y = y;
    }
    this.flairmove.draw(ctx);
}

grid.prototype.mouseup = function(ctx, x, y) {
    this.flairmove.interactive = false;
}

var flair = function(x, y, radius, hidden, style) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.hidden = hidden;
    this.style = style;
    this.interactive = false;
}

flair.prototype.draw = function(ctx) {
    if (this.hidden == false) {
        console.log("drawing flair: " + this.x + " " + this.y)

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.style;
        ctx.fillRect(this.x, this.y, this.radius, this.radius);
        ctx.fill();
        ctx.restore();

        /* var radius = 10; */
        /* var center_x = this.x + this.width/2; */
        /* var center_y = this.y + this.height/2; */
        /* var overlay_radius = this.height > this.width ? this.width*2/5 : this.height*2/5; */
        /* var inner_radius = overlay_radius*2/5; */

        /* ctx.save(); */
        /* ctx.beginPath(); */
        /* ctx.globalAlpha = 1.0; */
        /* ctx.fillStyle = this.style; */
        /* ctx.arc(center_x, center_y, overlay_radius, 0, Math.PI * 2, false); */
        /* ctx.fill(); */

        /* ctx.beginPath(); */
        /* ctx.arc(center_x, center_y, overlay_radius, 0, Math.PI * 2, false); */
        /* ctx.clip(); */

        /* ctx.beginPath(); */
        /* ctx.strokeStyle = 'white'; */
        /* ctx.lineWidth = 5; */
        /* ctx.shadowBlur = 30; */
        /* ctx.shadowColor = 'white'; */
        /* ctx.shadowOffsetX = 0; */
        /* ctx.shadowOffsetY = 0; */
        /* ctx.arc(center_x, center_y, radius+3, 0, Math.PI * 2, false); */
        /* ctx.stroke(); */
    }
}
