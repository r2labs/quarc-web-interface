var event;

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

function pick(x, y, z) {
    if (z == undefined) { z = 40; }
    goto(x, y, 120);
    ungrip();
    goto(x, y, 120);
    window.setTimeout(function() { goto(x, y, z)}, 1000);
    window.setTimeout(function() { grip()}, 2000);
    window.setTimeout(function() { goto(x, y, 120)}, 3000);
}

function place(x, y, z) {
    if (z == undefined) { z = 40; }
    goto(x, y, 120);
    window.setTimeout(function() { goto(x, y, z)}, 1000);
    window.setTimeout(function() { ungrip()}, 2000);
    window.setTimeout(function() { goto(x, y, 120)}, 3000);
}

function pickplace(pick_x, pick_y, place_x, place_y) {
    window.setTimeout(function() { pick(pick_x, pick_y) }, 150);
    window.setTimeout(function() { place(place_x, place_y) }, 3500);

}
