
/**
 * awesome.js
 *
 * Date: 08, 2015
 * @Author stas
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global WebSocket, document, window, Q */

/**
 * sling awesome base class   #streaj t8hgasdf
 * actually in file streanjs yeah
 */

(function () {

var SlingAwesome = {};

var Version = "0.0.1 Prototype";

var SlingServer = "ws://localhost:4502/bin/awesome/stream";

var index = 0;

var connected = false;

var root = typeof self === 'object' && self.self === self && self ||
typeof global === 'object' && global.global === global && global ||
this;



if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = SlingAwesome;
    }
    exports.SlingAwesome = SlingAwesome;
} else {
    root.SlingAwesome = SlingAwesome;
}

var websocket;

function onMessage(evt) {

}

function connect() {
    var deferred = Q.defer();

    websocket = new WebSocket(SlingServer);

    websocket.onopen = function(evt) {
        connected = true;
        deferred.resolve();
    };

    websocket.onclose = function(evt) {
        console.log("closed");
    };


    websocket.onmessage = onMessage;

    websocket.onerror = function(evt) {
        console.log("error");
        deferred.reject(evt);
    }

    return deferred.promise;
}


function sendMessage (command) {
    var deferred = Q.defer();
    websocket.message(command);

    return deferred.promise;
}

SlingAwesome.getVersion = function () {
    return Version;
}


SlingAwesome.init = function () {
    console.log("init");
}

SlingAwesome.getIndex = function () {
    return index++;
}

SlingAwesome.config = function (url) {
    SlingServer = url;
}

SlingAwesome.getUrl = function () {
    return SlingServer;
}


    /**
     *
     * @param url
     * @returns {*}
     */
SlingAwesome.resolve = function (url) {
    var deferred = Q.defer();
    if(!connected) {
        return connect().then(function () {
            return SlingAwesome.resolve(url);
        });
    }else {
        return sendMessage("resolve: " + url).then(function (data) {
            deferred.resolve(data);
        })
    }

    return deferred.promise;
}


if (typeof define === 'function' && define.amd) {
    define('SlingAwesome', [], function() {
        return SlingAwesome;
    });
}

})();