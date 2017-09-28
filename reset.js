var red = ['red', '#ffebee', '#e57373', '#f44336', '#d32f2f', '#b71c1c'];
var pink = ['pink', '#fce4ec', '#f06292', '#e91e63', '#c2185b', '#880e4f'];
var purple = ['purple', '#f3e5f5', '#ba68c8', '#9c27b0', '#7b1fa2', '#4a148c'];
var deepPurple = ['deepPurple', '#ede7f6', '#9575cd', '#673ab7', '#512da8', '#311b92'];
var indigo = ['indigo', '#e8eaf6', '#7986cb', '#3f51b5', '#303f9f', '#1a237e'];
var blue = ['blue', '#e3f2fd', '#64b5f6', '#2196f3', '#1976d2', '#0d47a1'];
var lightBlue = ['lightBlue', '#e1f5fe', '#4fc3f7', '#03a9f4', '#0288d1', '#01579B'];
var cyan = ['cyan', '#e0f7fa', '#4dd0e1', '#00bcd4', '#0097a7', '#006064'];
var teal = ['teal', '#e0f2f1', '#4db6ac', '#009688', '#00796b', '#004d40'];
var green = ['green', '#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
var lightGreen = ['lightGreen', '#f1f8e9', '#aed581', '#8bc34a', '#689f38', '#33691E'];
var lime = ['lime', '#f9fbe7', '#dce775', '#cddc39', '#afb42b', '#827717'];
var yellow = ['yellow', '#fffde7', '#fff176', '#ffeb3b', '#fbc02d', '#f57f17'];
var amber = ['amber', '#fff8e1', '#ffd54f', '#ffc107', '#ffa000', '#ff6f00'];
var orange = ['orange', '#fff3e0', '#ffb74d', '#ff9800', '#f57c00', '#e65100'];
var deepOrange = ['deepOrange', '#fbe9e7', '#ff8a65', '#ff5722', '#e64a19', '#bf360C'];
var brown = ['brown', '#fbe9e7', '#a1887f', '#795548', '#5d4037', '#3e2723'];
var gray = ['gray', '#fafafa', '#e0e0e0', '#9e9e9e', '#616161', '#212121'];
var blueGray = ['blueGray', '#eceff1', '#90a4ae', '#607d8b', '#455a64', '#263238'];
var black = ['black', '#eee', '#c0c0c0', '#808080', '#696969', '#000'];

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
    black
];

var dest = blue;

var path = window.location.pathname;
var page = path.split("/").pop();

chrome.storage.sync.get(['index'], function (items) {
    if (page === 'options.html') {
        return;
    }

    dest = (items['index'] === undefined) ? dest : colors[items['index']];
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

/* for options.html BEGIN */
function saveOptions(index, color) {
    chrome.storage.sync.set({'index': index, 'color': color});
    var selectedDiv = document.getElementById("selected");
    var colorDiv = document.getElementById("color");
    selectedDiv.innerHTML = document.getElementById(index).innerHTML;
    colorDiv.innerHTML = color;
    colorDiv.style.color = color;
}

function restoreOptions() {
    chrome.storage.sync.get(['index', 'color'], function (items) {
        var index = items['index'];
        var color = items['color'];
        index = (index === undefined) ? 5 : index;
        color = (color === undefined) ? 'blue' : color;
        var selectedDiv = document.getElementById("selected");
        var colorDiv = document.getElementById("color");
        selectedDiv.innerHTML = document.getElementById(index).innerHTML;
        colorDiv.innerHTML = color;
        colorDiv.style.color = color;
    });
}

if (page === 'options.html') {
    var innerHTML = '';
    for (var colorsIndex = 0; colorsIndex < colors.length; colorsIndex++) {

        innerHTML += '<div id="' + colorsIndex + '" class="cell" title="' + colors[colorsIndex][0] + '">';
        for (var colorIndex = 1; colorIndex < colors[colorsIndex].length + 1; colorIndex++) {
            innerHTML += '<span style="background:' + colors[colorsIndex][colorIndex] + '"></span>';
        }
        innerHTML += '</div>';
    }

    innerHTML += '<div id="selected" class="clear"></div>';
    innerHTML += '<div id="color" class="clear"></div>';

    document.getElementById('container').innerHTML = innerHTML;

    window.addEventListener('load', restoreOptions);
    for (var i = 0; i < document.querySelectorAll('div[title]').length; i++) {
        var div = document.querySelectorAll('div[title]')[i];
        div.addEventListener('click', function (e) {
            saveOptions(e.target.parentElement.id, e.target.parentElement.title);
        });
    }
}
/* for options.html END */