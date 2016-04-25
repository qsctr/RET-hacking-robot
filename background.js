chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('window.html', {
        id: 'main',
        'outerBounds': {
            'width': 500,
            'height': 700
        }
    });
});

// chrome.app.runtime.onSuspend.addListener(function () {
//     chrome.serial.getConnections(function (connections) {
//         if (connections.length > 0) {
//             chrome.serial.disconnect(connections[0].connectionId, function () {
//                 console.log("disconnected");
//             });
//         }
//     });
// });
