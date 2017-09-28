var imported = document.createElement('script');
imported.src = 'colors.js';
document.head.appendChild(imported);

console.log(test);

// var innerHTML = '';
// for (var colorsIndex = 0; colorsIndex < colors.length; colorsIndex++) {
//     innerHTML += '<div id="' + colorsIndex + '" class="' + ((colorsIndex % 2 === 0) ? 'left' : 'right') + '" title="' + colors[colorsIndex] + '">';
//     for (var colorIndex = 0; colorIndex < colors[colorsIndex].length; colorIndex++) {
//         innerHTML += '<span style="background:' + colors[colorsIndex][colorIndex] + '"></span>';
//     }
//     innerHTML += '</div>';
// }
//     console.log(innerHTML);
//
// document.getElementById('container').innerHTML = innerHTML;

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

window.addEventListener('load', restoreOptions);
for (var i = 0; i < document.querySelectorAll('div[title]').length; i++) {
    var div = document.querySelectorAll('div[title]')[i];
    div.addEventListener('click', function (e) {
        saveOptions(e.target.parentElement.id, e.target.parentElement.title);
    });
}
