var event;

function goto(x, y, z, ga) {
    ga = ga || -90;
    jQuery.ajax({
        url: 'http://localhost:8080/goto' + '?x=' + x + "&y=" + y + "&z=" + z + "&ga_d=" + ga,
        // async: true
    });
}

function pick(x, y) {

}
