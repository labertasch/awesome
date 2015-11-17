
/**
 * awesome.js
 *
 * Date: 08, 2015
 * @Author stas
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global jQuery, document, window */

/**
 * class Stnadrd Resource Resolver - connecting to apache sling server
 */
var ResourceResolver = (function () {

    var CONSTANTS = { };

    CONSTANTS.XPATH =" xpath";
    CONSTANTS.SQL = "sql";

    /**
     * open websocket connection to sling server
     */
    function connectToServer() {

    }




    return {

        /**
         * is clsoingn connection to sling server
         */
        close: function () {
            console.log("close resource resolver");
            /** The title of the book. */
            this.title = title;
        },
        /**
         * Find / Search for a resource
         * @param {string} query - The actual query
         * @param {string} language - the query language (xpath or sql)
         * @return {resource} resource
         */
        findResource: function (query, language) {

        },

        resolve: function (path) {

        },
        CONSTANTS: CONSTANTS
    }

})();

ResourceResolver.findResource("/(/babnan/(/asdf", ResourceResolver.CONSTANTS.XPATH);

ResourceResolver.resolve("/content/test")
    .success(function (resource) {

    })

    .fail(function (error) {

    });