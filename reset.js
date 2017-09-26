var origin = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
var blue = ['#E3F2FD', '#64B5F6', '#2196F3', '#1976D2', '#0D47A1'];
var demo = ['#', '#', '#', '#', '#'];

var rects = document.getElementsByTagName('rect');
for (var i = 0; i< rects.length; i++) {
    var style = window.getComputedStyle(rects[i], null);
    var fill = rgb2hex(style.getPropertyValue('fill'));
    for (var j in origin) {
        if (fill === origin[j]) {
            rects[i].style.fill = blue[j];
        }
    }
}

for (var k = 0; k < 5; k++) {
    console.log('a');//document.querySelector('li[style]'));
    document.querySelectorAll('li[style]')[k].style.backgroundColor = blue[k];
}

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}