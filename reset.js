var red = ['#ffebee', '#e57373', '#f44336', '#d32f2f', '#b71c1c'];
var pink = ['#FCE4EC', '#F06292', '#E91E63', '#C2185B', '#880E4F'];
var purple = ['#F3E5F5', '#BA68C8', '#9C27B0', '#7B1FA2', '#4A148C'];
var deepPurple = ['#EDE7F6', '#9575CD', '#673AB7', '#512DA8', '#311B92'];
var indigo = ['#E8EAF6', '#7986CB', '#3F51B5', '#303F9F', '#1A237E'];
var blue = ['#E3F2FD', '#64B5F6', '#2196F3', '#1976D2', '#0D47A1'];
var lightBlue = ['#E1F5FE', '#4FC3F7', '#03A9F4', '#0288D1', '#01579B'];
var cyan = ['#E0F7FA', '#4DD0E1', '#00BCD4', '#0097A7', '#006064'];
var teal = ['#E0F2F1', '#4DB6AC', '#009688', '#00796B', '#004D40'];
var green = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
var lightGreen = ['#F1F8E9', '#F1F8E9', '#8BC34A', '#689F38', '#33691E'];
var lime = ['#F9FBE7', '#DCE775', '#CDDC39', '#AFB42B', '#827717'];
var yellow = ['#FFFDE7', '#FFF176', '#FFEB3B', '#FBC02D', '#F57F17'];
var amber = ['#FFF8E1', '#FFD54F', '#FFC107', '#FFA000', '#FF6F00'];
var orange = ['#FFF3E0', '#FFB74D', '#FF9800', '#F57C00', '#E65100'];
var deepOrange = ['#FBE9E7', '#FF8A65', '#FF5722', '#E64A19', '#BF360C'];
var brown = ['#FBE9E7', '#A1887F', '#795548', '#5D4037', '#3E2723'];
var gray = ['#FAFAFA', '#E0E0E0', '#9E9E9E', '#616161', '#212121'];
var blueGray = ['#ECEFF1', '#90A4AE', '#607D8B', '#455A64', '#263238'];
var black = ['#DCDCDC', '#C0C0C0', '#808080', '#696969', '#000000'];

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