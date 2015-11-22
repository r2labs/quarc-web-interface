function robocontrol_pick() {
    var p = grid_obj.phy(grid_obj.flairmove.x, grid_obj.flairmove.y);
    console.log("picking at x: " + p.x + " y: " + p.y);
    pick(p.x, p.y, 5, -90);
}

function robocontrol_place() {
    var p = grid_obj.phy(grid_obj.flairmove.x, grid_obj.flairmove.y);
    console.log("placing at x: " + p.x + " y: " + p.y);
    place(p.x, p.y, 5, -90);
}
