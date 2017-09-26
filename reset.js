var red = ['#ffebee', '#e57373', '#f44336', '#d32f2f', '#b71c1c'];
var pink = ['#fce4ec', '#f06292', '#e91e63', '#c2185b', '#880e4f'];
var purple = ['#f3e5f5', '#ba68c8', '#9c27b0', '#7b1fa2', '#4a148c'];
var deepPurple = ['#ede7f6', '#9575cd', '#673ab7', '#512da8', '#311b92'];
var indigo = ['#e8eaf6', '#7986cb', '#3f51b5', '#303f9f', '#1a237e'];
var blue = ['#e3f2fd', '#64b5f6', '#2196f3', '#1976d2', '#0d47a1'];
var lightBlue = ['#e1f5fe', '#4fc3f7', '#03a9f4', '#0288d1', '#01579B'];
var cyan = ['#e0f7fa', '#4dd0e1', '#00bcd4', '#0097a7', '#006064'];
var teal = ['#e0f2f1', '#4db6ac', '#009688', '#00796b', '#004d40'];
var green = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
var lightGreen = ['#f1f8e9', '#f1f8e9', '#8bc34a', '#689f38', '#33691E'];
var lime = ['#f9fbe7', '#dce775', '#cddc39', '#afb42b', '#827717'];
var yellow = ['#fffde7', '#fff176', '#ffeb3b', '#fbc02d', '#f57f17'];
var amber = ['#fff8e1', '#ffd54f', '#ffc107', '#ffa000', '#ff6f00'];
var orange = ['#fff3e0', '#ffb74d', '#ff9800', '#f57c00', '#e65100'];
var deepOrange = ['#fbe9e7', '#ff8a65', '#ff5722', '#e64a19', '#bf360C'];
var brown = ['#fbe9e7', '#a1887f', '#795548', '#5d4037', '#3e2723'];
var gray = ['#fafafa', '#e0e0e0', '#9e9e9e', '#616161', '#212121'];
var blueGray = ['#eceff1', '#90a4ae', '#607d8b', '#455a64', '#263238'];
var black = ['#eee', '#c0c0c0', '#808080', '#696969', '#000'];

var colors = [
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    gray,
    blueGray,
    black];
var dest = green;

chrome.storage.sync.get(['index'], function (items) {
    dest = colors[items['index']];
    resetRects();
    resetLists();
});

function resetRects() {
    var rects = document.getElementsByTagName('rect');
    for (var i = 0; i < rects.length; i++) {
        var style = window.getComputedStyle(rects[i]);
        var fill = rgb2hex(style.getPropertyValue('fill'));
        for (var j in green) {
            if (green.hasOwnProperty(j)) {
                if (fill === green[j]) {
                    rects[i].style.fill = dest[j];
                }
            }
        }
    }
}

function resetLists() {
    for (var k = 0; k < 5; k++) {
        document.querySelectorAll('li[style]')[k].style.backgroundColor = dest[k];
    }
}

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) {
        return rgb;
    }
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}