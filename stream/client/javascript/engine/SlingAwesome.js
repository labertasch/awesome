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

var http = require("http");
var Q = require("q");
var ws = require("ws");
var util = require("util");
var EventEmitter = require('events').EventEmitter;
var Resource = require("./Resource");
var ConnectionManager = require("./ConnectionManager");
var URL = require("./../utils/URL");

var _ = require("lodash");
var jquery = require("jquery");
var QUnit = require("qunitjs");


// data-sa-on="{'path', 'self.do(function() { countCompleted(); })'}"


function commands (instance) {
    instance.on("message", function (e) {
        if(e && e.type) {
                instance.emit(e.path, e);
        }else {
            console.log("unkown repsonse");
        }
    })
}

/**
 * SlingAewsome Engine
 * @class
 */
function SlingAwesome(url, callbackmsg){
    EventEmitter.call(this);
}

util.inherits(SlingAwesome, EventEmitter);


/*SlingAwesome.prototype.connect = function () {
    connect(this.SlingServer, this);
} */


SlingAwesome.prototype.Version = "0.0.1 Prototype";

SlingAwesome.prototype.SlingServer = "ws://localhost:4502/bin/awesome/stream";

SlingAwesome.prototype.index = 0;

SlingAwesome.prototype.connected = false;

var test = new Resource("path;");


function sendMessage (command) {
    ConnectionManager.send(command);
}

/**
 * Sling Awesome Client version
 * @function
 * @returns {string}   version number / string
 */
SlingAwesome.prototype.getVersion = function () {
    return this.Version;
}


SlingAwesome.prototype.init = function () {
    var self = this;
    ConnectionManager.register(this);
    var currentUrl =  URL.decompose(location.href);
        this.resolve(currentUrl.resourcePath).then(
            function (res) {
                self.resource = res;
            }
        );

}

SlingAwesome.currentResource = function () {
    return this.resource;
}

/**
 * internal dummy index, always counts++ if someone is calling this function
 * @returns {number}
 */
SlingAwesome.prototype.getIndex = function () {
    return this.index++;             rce
}

SlingAwesome.prototype.config = function (url) {
    this.SlingServer = url;
}

/**
 * Apache Sling SErver Endpoint
 * @returns {string} url
 */
SlingAwesome.prototype.getUrl = function () {
    return this.SlingServer;
}

/**
 * returns true if the websocket connection to the server is there
 * @returns {boolean} connected to server
 */
SlingAwesome.prototype.isConnected = function () {
    return this.connected;
}

var connected = false;

/**
 *
 * @static
 * @param url
 * @returns {*}
 */
SlingAwesome.prototype.resolve = function (url) {
  return ConnectionManager.resolve(url, this);
}

SlingAwesome.prototype.listChildren = function () {

}

SlingAwesome.prototype.addResource = function (resource) {
    // requires Resource object
    return ConnectionManager.addResource(resource);
}


module.exports = SlingAwesome;

/*
function doAwesome() {
  var slingUrl = new URL.decompose(location.href);
  console.log(slingUrl);
}


jquery(document).ready(doAwesome);

//global.SlingAwesome = SlingAwesome;

//global.SlingAwesome.Resource = Resource;
global.SlingAwesome = new SlingAwesome();

global.SlingAwesome.ConnectionManager = ConnectionManager;
global.SlingAwesome.URL = URL;

global.jQuery = jquery;
global.$ = jquery;
global._ = _;
global.QUnit = QUnit;       */
