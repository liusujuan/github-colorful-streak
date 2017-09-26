(function () {
    var rects = document.getElementsByTagName('rect');
    for (var index in rects) {
        rects[index].style.fill = '#f00';
    }
}());