var Resource = require("./engine/Resource");
var ConnectionManager = require("./engine/ConnectionManager");
var URL = require("./utils/URL");
var slingAwesome = require("./engine/SlingAwesome");
var _ = require("lodash");
var jquery = require("jquery");
var QUnit = require("qunitjs");



var SlingUI = {

}


ConnectionManager.connect(ConnectionManager.SlingServer);


global.SlingAwesome = slingAwesome;
global.SlingAwesome.ConnectionManager = ConnectionManager;
global.SlingAwesome.URL = URL;

global.jQuery = jquery;
global.$ = jquery;
global._ = _;
global.QUnit = QUnit;