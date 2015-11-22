var get_contours = function() {
    jQuery.getJSON("http://localhost:8080/vision", function(data) {
        grid_obj.contours = []
        jQuery.each(data.items, function(i, item) {
            c = new contour(item.cx, item.cy, item.points, item.color, item.radius);
            grid_obj.contours.push(c);
        });
        grid_obj.draw(grid_ctx);
    })
}

window.setInterval(get_contours, 100);

var contour = function(cx, cy, points, color, rad) {
    this.cx = cx;
    this.cy = cy;
    this.points = points;
    this.color = color;
    this.rad = rad;
}

contour.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.50;
    ctx.beginPath(ctx);
    ctx.fillStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (var i=1; i<this.points.length; ++i) {
        ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
