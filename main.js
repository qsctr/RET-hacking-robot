var id;
var rec = "";
var jamming = false;
var jamInterval;
var currentKey;
var sleeping = false;
var sleepInterval;
var constantInterval;
var constanting = false;
var view = null;
var intervals = [];

chrome.serial.getDevices(function (ports) {
    for (var i = 0; i < ports.length; i++) {
        var elem = document.createElement("p");
        var text = document.createTextNode(ports[i].path);
        elem.appendChild(text);
        elem.addEventListener("click", start);
        connect.appendChild(elem);
    }
});

function start(e) {
    var path = e.target.textContent;
    chrome.serial.connect(path, {
        bitrate: 9600
    }, function (connectionInfo) {
        id = connectionInfo.connectionId;
        messages.style.display = "block";
        jammer.style.display = "block";
        sleep.style.display = "block";
        constant.style.display = "block";
        addMessage("connected");
    });
    connect.style.display = "none";
}

function addMessage(m) {
    var elem = document.createElement("p");
    elem.appendChild(document.createTextNode(m));
    if (messages.children.length > 10) {
        messages.removeChild(messages.children[0]);
    }
    messages.appendChild(elem);
}

chrome.serial.onReceive.addListener(function (info) {
    if (info.data) {
        view = new Uint8Array(info.data);
        var s = String.fromCharCode.apply(null, view);
        if (s.charAt(s.length - 1) === '\n') {
            rec += s.substring(0, s.length - 1);
            addMessage(rec);
            rec = "";
        }
        else {
            rec += s;
        }
    }
});

setInterval(function () {
    if (view !== null) {
        console.log(view);
        view = null;
    }
    if (rec !== "") {
        addMessage(rec);
        rec = "";
    }
}, 200);

function serialSend() {
    var bytes = new Uint8Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        bytes[i] = arguments[i];
    }
    chrome.serial.send(id, bytes.buffer, function (sendInfo) {
        if (sendInfo.bytesSent > 0) {
            addMessage("successfully sent");
        }
        else {
            addMessage("not sent");
        }
    });
}

window.addEventListener("keydown", function (e){
    var s = String.fromCharCode(e.which).toLowerCase();
    if (s === ' ') {
        serialSend(30, 28, 29);
    }
    else if (currentKey !== s) {
        if (s === 'w') {
            serialSend(17, 19, 18);
        }
        else if (s === 'a') {
            serialSend(21, 20, 6);
        }
        else if (s === 's') {
            serialSend(7, 26, 7);
        }
        else if (s === 'd') {
            serialSend(14, 15, 24);
        }
        else if (s === 'q') {
            serialSend(23, 25, 2);
        }
        else if (s === 'e') {
            serialSend(1, 22, 5);
        }
        currentKey = s;
    }
});

window.addEventListener("keyup", function () {
    if (['w', 'a', 's', 'd', 'q', 'e'].indexOf(currentKey) >= 0) {
        serialSend(30, 28, 29);
        currentKey = null;
    }
});

window.addEventListener("blur", function () {
    if (currentKey) {
        console.log("stopping");
        serialSend(30, 28, 29);
        currentKey = null;
    }
});

jammer.addEventListener("click", function () {
    if (jamming) {
        jamming = false;
        clearInterval(jamInterval);
        jammer.textContent = "DO NOT PRESS THIS BUTTON";
    }
    else {
        jamming = true;
        jamInterval = setInterval(function () {
            serialSend(Math.floor(Math.random() * 95) + 32);
        }, 100);
        jammer.textContent = "PLEASE PRESS THIS BUTTON";
    }
});

sleep.addEventListener("click", function () {
    if (sleeping) {
        sleeping = false;
        clearInterval(sleepInterval);
        sleep.textContent = "SLEEP";
    }
    else {
        sleeping = true;
        sleepInterval = setInterval(function () {
            var arr = [];
            for (var i = 0; i < 200; i++) {
                arr.push(90);
            }
            serialSend.apply(null, arr);
        }, 300);
        sleep.textContent = "WAKE UP";
    }
});

constant.addEventListener("click", function () {
    if (constanting) {
        constanting = false;
        clearInterval(constantInterval);
        constant.textContent = "CONSTANT";
    }
    else {
        constanting = true;
        constantInterval = setInterval(function () {
            var randomThing = Math.floor(Math.random() * 95) + 32;
            var arr = [];
            for (var i = 0; i < 200; i++) {
                arr.push(randomThing);
            }
            serialSend.apply(null, arr);
        }, 300);
        constant.textContent = "STOP CONSTANT";
    }
});

// function makeButton (elem, activatedText, fn, ms) {
//     var n = intervals.push({});
//     var originalText = elem.textContent;
//     elem.addEventListener("click", function () {
//         if (intervals[n].activated) {
//             intervals[n].activated = false;
//             clearInterval(intervals[n].interval);
//             elem.textContent = originalText;
//         } else {
//             intervals[n].activated = true;
//             intervals[n].interval =
//         }
//     })
// }
