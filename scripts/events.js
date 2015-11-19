var event;

function goto(x, y, z, ga) {
    if (ga == undefined) { ga = -90; }
    jQuery.ajax({
        url: 'http://localhost:8080/goto' + '?x=' + x + "&y=" + y + "&z=" + z + "&ga_d=" + ga,
    });
}

function pick(x, y) {

}
