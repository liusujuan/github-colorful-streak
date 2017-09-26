// Saves options to localStorage.
function saveOptions(id, color) {
    console.log('saveOptions: ' + id + ", " + color);
    // var select = document.getElementById("color");
    // var index = select.children[select.selectedIndex].value;
    // chrome.storage.sync.set({'index': index});
    // var status = document.getElementById("status");
    // status.innerHTML = 'Options Saved.';
    // setTimeout(function () {
    //     status.innerHTML = '';
    // }, 750);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
    console.log('load...');
    // chrome.storage.sync.get(['index'], function (items) {
    //     var index = items['index'];
    //     var select = document.getElementById('color');
    //     for (var i = 0; i < select.children.length; i++) {
    //         var child = select.children[i];
    //         if (child.value === index) {
    //             child.selected = 'true';
    //             break;
    //         }
    //     }
    // });
}

window.addEventListener('load', restoreOptions);
for (var i = 0; i < document.querySelectorAll('div[title]').length; i++) {
    var div = document.querySelectorAll('div[title]')[i];
    div.addEventListener('click', function (e) {
        saveOptions(e.target.parentElement.id, e.target.parentElement.title);
    });
}
