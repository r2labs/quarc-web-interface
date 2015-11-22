function get_contours() {
    console.log("getcontours")
    jQuery.getJSON("http://localhost:8080/vision", function(data) {
        console.log(data)
        jQuery.each(data.items, function(i, item) {
            console.log(i + " " + item)
        })
    })
}

var contour = function(x, y, color, rad) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.rad = rad;
}
