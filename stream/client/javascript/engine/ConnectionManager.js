/******************************************************************************
 * ADOBE CONFIDENTIAL                                                         *
 * ---------------------------------------------------------------------------*
 * Copyright 2015  Adobe Systems Incorporated                                 *
 * All Rights Reserved.                                                       *
 * ---------------------------------------------------------------------------*
 * NOTICE:  All information contained herein is, and remains                  *
 * the property of Adobe Systems Incorporated and its suppliers,              *
 * if any.  The intellectual and technical concepts contained                 *
 * herein are proprietary to Adobe Systems Incorporated and its               *
 * suppliers and are protected by trade secret or copyright law.              *
 * Dissemination of this information or reproduction of this material         *
 * is strictly forbidden unless prior written permission is obtained          *
 * from Adobe Systems Incorporated.                                           *
 ******************************************************************************/



var _ = require("lodash");
var Q = require("Q");
var http = require('http');
var ws = require("ws");

var Resource = require("./Resource");

var registry = [];

var ConnectionManager = {};

ConnectionManager.connected = false;


ConnectionManager.SlingServer = "ws://localhost:4502/bin/awesome/stream";

var websocket;


function emitEvent(eventType, event) {
    _.forEach(registry, function(n) {
        if(n) {
            n.emit(eventType, event);
        }
    })
}

ConnectionManager.register = function (SlingAwesome) {
    registry.push(SlingAwesome);

    if(!ConnectionManager.connected) {
        ConnectionManager.connect(ConnectionManager.SlingServer);
    }else {
        emitEvent("open", {});
    }


    SlingAwesome.on("message", function (e) {
        if(e && e.type) {
            SlingAwesome.emit(e.path, e);
            SlingAwesome.emit(e.parent + "/*", e);
        }else {
            console.log("unkown repsonse");
        }
    });
}



ConnectionManager.connect = function (url) {
    var deferred = Q.defer();
    var self = this;

    if(!websocket) {
        console.log("creating websocket")
        websocket = new ws(ConnectionManager.SlingServer);
    }

    websocket.onopen = function(evt) {
        emitEvent("open", evt);
        console.log("connected ws");
        ConnectionManager.connected = true;
    };

    websocket.onclose = function(evt) {
        //emitEvent("close", evt);
        ConnectionManager.connected = false;
        ConnectionManager.connect(url);
    };


    websocket.onmessage = function(evt) {
        emitEvent("message", JSON.parse(evt.data));
    };

    websocket.onerror = function(evt) {
        emitEvent("error", evt);
        ConnectionManager.connected = false;
    };

  //  commands(self);

    return deferred.promise;
}

ConnectionManager.addResource = function (resource) {
    var deferred = Q.defer();

    // do the ajax request and add the resource, resolve if added

    return deferred.promise;
}

ConnectionManager.removeResource = function (resource)  {
    var deferred = Q.defer();


    return deferred.promise;
}

ConnectionManager.updateResource = function (resource) {
    var deferred = Q.defer();


    return deferred.promise;
}

ConnectionManager.resolve = function (url, target) {
    var deferred = Q.defer();
    var command  = "resolve: " + url;

    target.once(url, function (e) {
        if(e.type === "event") {
            target.once(e.path, function (e) {
                deferred.resolve(e);
            });
            ConnectionManager.send("resolve: " + e.path);
        } else {
            var resource = new Resource(e, target);

            deferred.resolve(resource);
        }
    });
    ConnectionManager.send(command);

    return deferred.promise;
}

ConnectionManager.send = function (message) {
    websocket.send(message);
}


module.exports = ConnectionManager;
