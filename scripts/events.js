function phy(x, y) {
    return {
        x: 200.0 - x*3.0/4.0,
        y: y*3.0/4.0 + 60.0
    }
}

function goto(x, y, z, ga) {
    p = phy(x, y);
    console.log('http://localhost:8080/goto' + '?x=' + p.x + "&y=" + p.y + "&z=" + z + "&gripper_angle_degrees=" + ga)
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/goto' + '?x=' + p.x + "&y=" + p.y + "&z=" + z + "&gripper_angle_degrees=" + ga,
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
    p = phy(x, y)
    if (z == undefined) { z = 5; }
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/pick' + '?x=' + p.x + "&y=" + p.y + "&z=" + z + "&gripper_angle_degrees=" + ga,
    });
}

function place(x, y, z, ga) {
    p = phy(x, y)
    if (z == undefined) { z = 5; }
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/place' + '?x=' + p.x + "&y=" + p.y + "&z=" + z + "&gripper_angle_degrees=" + ga,
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

function sort() {
    jQuery.ajax({
        url:'http://localhost:8080/sort',
        complete: function(callback) {
            if ($('input[name="modeRadios"]:checked').val() == "Sort") {
                sort();
            }
        }
    });
}

function pickplace(pick_x, pick_y, place_x, place_y) {
    window.setTimeout(function() { pick(pick_x, pick_y) }, 150);
    window.setTimeout(function() { place(place_x, place_y) }, 3500);

}
