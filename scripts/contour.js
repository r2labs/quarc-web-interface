var get_contours = function() {
    jQuery.getJSON("http://localhost:8080/vision", function(data) {
        grid_obj.contours = []
        jQuery.each(data.items, function(i, item) {
            for (var i=0; i<item.points.length; ++i) {
                var v = virt(item.points[i][0], item.points[i][1]);
                item.points[i][0] = v.x;
                item.points[i][1] = v.y;
            }
            var v = virt(item.cx, item.cy);
            c = new contour(v.x, v.y, item.points, item.color, item.radius);
            grid_obj.contours.push(c);
        });
        grid_obj.draw(grid_ctx);
    })
}

window.setInterval(get_contours, 500);

var contour = function(cx, cy, points, color, rad) {
    this.cx = cx;
    this.cy = cy;
    this.points = points;
    this.color = color;
    this.rad = rad;
}

contour.prototype.draw = function(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.70;
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
