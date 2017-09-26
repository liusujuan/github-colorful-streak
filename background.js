chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    console.log(info.status);
    if (info.status === 'complete') {
        chrome.tabs.executeScript(
            null,
            {file: 'reset.js'}
        );
    }
});
// chrome.app.runtime.onLaunched.addListener(function() {
//     chrome.app.window.create('test.html', {
//         id: 'MyWindowID',
//         bounds: {
//             width: 800,
//             height: 600,
//             left: 100,
//             top: 100
//         },
//         minWidth: 800,
//         minHeight: 600
//     });
// });
