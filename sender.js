function s() {
    var argsArray = Array.prototype.slice.call(arguments);
    return setInterval(function () {
        serialSend.apply(null, argsArray.map(function (x) { return typeof x === 'string' ? x.charCodeAt(0) : x; }));
    }, 500);
}

function a(x) {
    clearInterval(x);
}
