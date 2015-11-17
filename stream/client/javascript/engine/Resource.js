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

//var ConnectionManager = require("./ConnectionManager");
var Q = require("q");
var _ = require("lodash");

/**
 * Resource Object
 * @param path
 * @constructor
 */
var Resource = function (event, ConnectionManager) {
    this.path = event.path;
    this.event = event;
    this.ConnectionManager = ConnectionManager;
    this.dirty = false;
}

Resource.prototype = {
    /**
     * get path
     * @returns {string} resource path
     */
    getPath: function () {
        return this.path;
    },
    /**
     * retreive property resource values
     * @example
     * currentResource.get("jcr:content").then(function (resource) {
     *     console.log(resource.getPath());
     * });
     *
     * @param property key
     * @returns {Promise} value
     */
    get: function (key) {
        return this.event.properties[key];
    },

    put: function (key, value) {
        this.event.properties.key = value;
        this.dirty = true;
    },

    /**
     * has child nodes
     * @returns {boolean}
     */
    hasChildren: function () {
        return event.children;
    },

    /**
     * return array of resources
     *  @example <caption>Example usage of listChildren</caption>
     * currentResource.listChildren().then(function (children) {
     *     for(childResource in children) {
     *       childResource.get("name").then(function (name) {
     *           console.log(name);
     *       });
     *     }
     * }, function (error) {
     *
     * });
     *
     * @returns {promise}
     */
    listChildren: function (callback) {
        var deferred = Q.defer();
        var self = this;
        var index = 0;
        var results = [];
        for(var child in this.event.allChildren) {
            var childPath = self.getPath() + "/" + child;
            this.ConnectionManager.resolve(childPath).then(function (resource) {
                if(callback) {
                    callback.call(self, resource, index++);
                }
                results.push(resource);
                if(_.size(results) ===  _.keys(self.event.allChildren).length) {
                    deferred.resolve(results);
                }
            });
        }
        return deferred.promise;
    },

    /**
     * get a specific child
     * @example
     * currentResource.getChild().then(function (resource, snapshot) {
     *     console.log(resource.getPath());
     *     console.log(snapshot.path);
     *     console.log(snapshot.title);
     *     console.log(snapshot._jcr_content.title);
     * });
     *
     * @param {string} relativechild url
     * @returns {Resource}
     */
    getChild: function (key) {
        return new Resource("");
    },

    remove: function () {
        // remove this path
    }


}

module.exports = Resource;