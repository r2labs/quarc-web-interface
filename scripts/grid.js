var n_requests = 0

/* The top left is the "x,y" reference corner */
var grid = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.flairdown = new flair(0, 0, 20, true, 'red');
    this.flairmove = new flair(0, 0, 20, true, 'blue');
    this.flairhover = new flair(0, 0, 20, false, 'white');
    this.contours = [];
}

grid.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.width + this.x*2, this.height + this.y*2);

    ctx.save();
    ctx.globalAlpha = 0.10;
    var d = 20;
    for (var i=this.x; i<this.width+this.x; i+=d) {
        for (var j=this.y; j<this.height+this.y; j+=d) {
            ctx.beginPath();
            ctx.strokeStyle = "#a0a0a0";
            ctx.lineWidth = 2;
            ctx.rect(i, j, d, d);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.strokeStyle="#b0b0b0";
    ctx.lineWidth = 5;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();

    this.flairhover.draw(ctx);
    this.flairdown.draw(ctx);
    this.flairmove.draw(ctx);

    for (var i=0; i<this.contours.length; ++i) {
        this.contours[i].draw(ctx);
    }
}

grid.prototype.mousedown = function(ctx, x, y, mode) {
    if (mode == "PickPlace") {
        this.pickplace_mousedown(ctx, x, y);
    } else if (mode == "Follow") {
        this.follow_mousedown(ctx, x, y);
    }
}

grid.prototype.mousemove = function(ctx, x, y, mode) {
    if (mode == "PickPlace") {
        this.pickplace_mousemove(ctx, x, y);
    } else if (mode == "Follow") {
        this.follow_mousemove(ctx, x, y);
    }
}

grid.prototype.mouseup = function(ctx, x, y, mode) {
    if (mode == "PickPlace") {
        this.pickplace_mouseup(ctx, x, y);
    } else if (mode == "Follow") {
        this.follow_mouseup(ctx, x, y);
    }
}

grid.prototype.switch_mode = function(ctx, mode) {
    this.flairdown.hidden = true;
    this.draw(ctx);
}

grid.prototype.pickplace_mousedown = function(ctx, x, y) {
    this.flairdown.x = x;
    this.flairdown.y = y;
    this.flairdown.hidden = false;
    this.flairmove.hidden = false;
    this.flairmove.interactive = true;
    this.flairmove.x = x;
    this.flairmove.y = y;
    this.flairdown.draw(ctx);
    this.flairhover.hidden = true;
}

grid.prototype.pickplace_mousemove = function(ctx, x, y) {
    if (this.flairmove.interactive == true) {
        this.flairmove.x = x;
        this.flairmove.y = y;
    }
    this.flairhover.x = x;
    this.flairhover.y = y;
}

grid.prototype.pickplace_mouseup = function(ctx, x, y) {
    this.flairhover.hidden = false;
    this.flairmove.interactive = false;
    this.flairmove.draw(ctx);
    console.log("pick: (" + this.flairdown.x + ", " + this.flairdown.y + ")");
    console.log("place: (" + this.flairmove.x + ", " + this.flairmove.y + ")");
    pickplace(this.flairdown.x, this.flairdown.y, this.flairmove.x, this.flairmove.y);
}

grid.prototype.follow_mousedown = function(ctx, x, y) {
    this.flairmove.hidden = false;
    this.flairhover.hidden = true;
    this.flairmove.interactive = true;
    this.flairmove.x = x;
    this.flairmove.y = y;
    this.flairmove.draw(ctx);
    goto(x, y, 100, -90);
}

grid.prototype.follow_mousemove = function(ctx, x, y) {

    this.flairhover.x = x;
    this.flairhover.y = y;

    if (this.flairmove.interactive == true) {
        this.flairmove.x = x;
        this.flairmove.y = y;
        n_requests++;
        if ((n_requests % 10) == 0) {
            goto(x, y, 100, -90)
        }
    }
}

grid.prototype.follow_mouseup = function(ctx, x, y) {
    this.flairmove.interactive = false;
    this.flairmove.hidden = false;
    this.flairhover.hidden = false;
    this.flairhover.draw(ctx);
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
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = 0.50;
        ctx.fillStyle = this.style;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.font = "18px Lato";
        ctx.globalAlpha = 1.00;

        textx = this.x < grid_obj.width - 100 ? this.x : this.x - 120;
        texty = this.y < grid_obj.height - 30 ? this.y : this.y - 30;
        ctx.fillText("(" + Math.round(this.x) + ", " + Math.round(this.y) + ")",
                     textx + this.radius, texty + this.radius);
        ctx.restore();
    }
}
