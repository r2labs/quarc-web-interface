function get_mouse_pos(cnv, evt) {
    var rect = grid_cnv.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function lerp(x, x_min, x_max, y_min, y_max) {
    if (x > x_max) { return y_max; }
    else if (x < x_min) { return y_min; }
    return y_min + ((y_max - y_min)*(x- x_min))/(x_max - x_min);
}

function throttle(fn, threshold, scope) {
    if (threshold == undefined) { threshold = 250; }
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
