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
var URL =  require("url");


function decompose(link) {
    var suffix;
    var selectorString;
    var selectors = [];
    var extension;
    var resourcePath;

    if(_.isNaN(link) || _.isEmpty(link)){
        throw Error("link must not be empty");
    }

    var url =  URL.parse(link);
    var pathToParse = url.path;
    var firstDot = url.path.indexOf(".");
    var pathOnly = (firstDot < 0);


    resourcePath = (pathOnly) ?  pathToParse : pathToParse.substring(0, firstDot);
    if(_.endsWith(resourcePath, "/") && resourcePath.length > 1) {
        resourcePath = resourcePath.substring(0, resourcePath.length-1);
    }

    // todo: this code looks just wrong
    // i am sure we can cut this by half
    if(!pathOnly) {
        pathToParse = pathToParse.substring(firstDot, pathToParse.length);
        // check if there is a suffix
        var firstSlash = pathToParse.indexOf("/");
        if(firstSlash > 0) {
           suffix = pathToParse.substring(firstSlash, pathToParse.length);
           // i dont need the first dot, therefore i am starting with the next char
           pathToParse = pathToParse.substring(1, firstSlash);
        }
        var selectorArray = pathToParse.split(".");
        if(!_.isEmpty(selectorArray)) {
            // if there is only one element in the selector array
            // it is not a selector it is an extension
            if(selectorArray.length == 1) {
                var value = selectorArray[0];
                if(!_.isEmpty(value)) {
                    extension = value;
                }
            } else { // more elements, check the size
                var tmpSelectorString="";
                var lastElementExtension = selectorArray.pop();
                if(!_.isEmpty(lastElementExtension)) {
                    extension = lastElementExtension;
                }

                var first = true;
                for(var key in selectorArray) {
                    var value = selectorArray[key];
                    if(!_.isEmpty(value)) {
                       tmpSelectorString += (first) ? value : "." + value;
                       selectors.push(value);
                       first = false;
                    }
                }
                if(!_.isEmpty(tmpSelectorString)) {
                    selectorString = tmpSelectorString;
                }
            }
        }
    }

    var slingObject = {
        selectors: selectors,
        selectorString: selectorString,
        suffix: suffix,
        resourcePath: resourcePath,
        extension: extension
    }

    return _.assign(url, slingObject);
}

module.exports.decompose = decompose;

module.exports.getPathInfo = decompose;