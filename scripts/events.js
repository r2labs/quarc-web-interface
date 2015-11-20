function goto(x, y, z, ga) {
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/goto' + '?x=' + x + "&y=" + y + "&z=" + z + "&gripper_angle_degrees=" + ga,
    });
}

function grip(pct) {
    if (pct == undefined) { pct = 1.0 }
    jQuery.ajax({
        url: 'http://localhost:8080/grip' + '?gripper_percent=' + pct
    });
}

function ungrip() {
    jQuery.ajax({
        url: 'http://localhost:8080/grip' + '?gripper_percent=0.0',
    });
}

function pick(x, y, z, ga) {
    if (z == undefined) { z = 40; }
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/pick' + '?x=' + x + "&y=" + y + "&z=" + z + "&gripper_angle_degrees=" + ga,
    });
}

function place(x, y, z, ga) {
    if (z == undefined) { z = 40; }
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/place' + '?x=' + x + "&y=" + y + "&z=" + z + "&gripper_angle_degrees=" + ga,
    });
}

function rest() {
    jQuery.ajax({
        url: 'http://localhost:8080/rest'
    });
    grid_obj.flairmove.hidden = true;
    grid_obj.flairdown.hidden = true;
    grid_obj.draw(grid_ctx);
}

function cancel() {
    jQuery.ajax({
        url: 'http://localhost:8080/cancel'
    });
    grid_obj.flairmove.hidden = true;
    grid_obj.flairdown.hidden = true;
    grid_obj.draw(grid_ctx);
}

function pickplace(pick_x, pick_y, place_x, place_y) {
    window.setTimeout(function() { pick(pick_x, pick_y) }, 150);
    window.setTimeout(function() { place(place_x, place_y) }, 3500);

}
