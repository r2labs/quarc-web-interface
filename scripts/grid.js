/* The top left is the "x,y" reference corner */
var grid = function(x, y, width, height) {
    this.ax = x;
    this.ay = y;
    this.width = width;
    this.height = height;
    this.flairdown = new flair(0, 0, 20, true, 'red');
    this.flairmove = new flair(0, 0, 20, true, 'blue');
    this.flairhover = new flair(0, 0, 20, false, 'white');

    this.sq = this.width < this.height ? this.width : this.height;
    this.sq -= 10;
    this.x = this.width/2 - this.sq/2 + 2.5;
    this.y = this.height/2 - this.sq/2 + 2.5;

    this.px = -160;
    this.py = -320;
    this.psq = 320;
    this.dp = 20;
}

grid.prototype.draw = function(ctx) {
    ctx.clearRect(this.ax, this.ay, this.width, this.height);

    ctx.save();
    ctx.globalAlpha = 0.10;
    var d = (1.0*this.dp*this.sq)/this.psq;
    for (var i=this.x; i<this.sq+this.x; i+=d) {
        for (var j=this.y; j<this.sq+this.y; j+=d) {
            ctx.beginPath();
            ctx.strokeStyle = "#a0a0a0";
            ctx.lineWidth = 2;
            ctx.rect(i, j, d, d);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 0.50;
    ctx.beginPath();
    ctx.strokeStyle="#b0b0b0";
    ctx.lineWidth = 5;
    ctx.rect(this.x, this.y, this.sq, this.sq);
    ctx.stroke();
    ctx.restore();

    this.flairhover.draw(ctx);
    this.flairdown.draw(ctx);
    this.flairmove.draw(ctx);
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
    var pick_phy = this.phy(this.flairdown.x, this.flairdown.y);
    var place_phy = this.phy(this.flairmove.x, this.flairmove.y);
    console.log("pick: (" + pick_phy.x + ", " + pick_phy.y + ")");
    console.log("place: (" + place_phy.x + ", " + place_phy.y + ")");
    pickplace(pick_phy.x, pick_phy.y, place_phy.x, place_phy.y);
}

grid.prototype.follow_mousedown = function(ctx, x, y) {
    this.flairmove.hidden = false;
    this.flairhover.hidden = true;
    this.flairmove.interactive = true;
    this.flairmove.x = x;
    this.flairmove.y = y;
    this.flairmove.draw(ctx);
    var p = this.phy(x, y);
    goto(p.x, p.y, 120, -90);
}

grid.prototype.follow_mousemove = function(ctx, x, y) {

    this.flairhover.x = x;
    this.flairhover.y = y;

    if (this.flairmove.interactive == true) {
        this.flairmove.x = x;
        this.flairmove.y = y;
        var p = this.phy(x, y);
        goto(p.x, p.y, 120, -90);
    }
}

grid.prototype.follow_mouseup = function(ctx, x, y) {
    this.flairmove.interactive = false;
    this.flairmove.hidden = false;
    this.flairhover.hidden = false;
    this.flairhover.draw(ctx);
}

/* should have implemented change-of-basis for this, oh well */
grid.prototype.phy = function(x, y) {
    return {
        x: lerp(x - this.x, 0.0, this.sq, -180.0, 180.0),
        y: lerp(y - this.y, 0.0, this.sq, this.psq, 50.0)
    };
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
        var p = grid_obj.phy(this.x, this.y);
        console.log("x: " + p.x + " y: " + p.y);
        ctx.globalAlpha = 1.00;
        ctx.fillText("(" + Math.round(p.x) + ", " + Math.round(p.y) + ")",
                     this.x + this.radius, this.y + this.radius);
        ctx.restore();
    }
}
