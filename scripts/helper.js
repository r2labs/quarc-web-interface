function get_mouse_pos(cnv, evt) {
    var rect = grid_cnv.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
