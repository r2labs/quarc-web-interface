function robocontrol_pick() {
    x = grid_obj.flairmove.x;
    y = grid_obj.flairmove.y;
    console.log("picking at x: " + x + " y: " + y);
    pick(x, y, 5, -90);
}

function robocontrol_place() {
    x = grid_obj.flairmove.x;
    y = grid_obj.flairmove.y;
    console.log("placing at x: " + x + " y: " + y);
    place(x, y, 5, -90);
}
