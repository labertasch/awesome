/**
 * Resource Object
 * @param path
 * @constructor
 */
var Resource = function (path) {
    this.path = path;
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

        return key;
    },

    /**
     * has child nodes     a
     * @returns {boolean}
     */
    hasChildren: function () {
        return true;
    },

    /**
     * return array of resources
     *  @example <caption>Example usage of listChildren</caption>
     * currentResource.listChildren().then(function (children) {
     *     for(key in children) {
     *       Resource childResource = new Resource(key);
     *       childResource.get("name").then(function (name) {
     *           console.log(name);
     *       });
     *     }
     * }, function (error) {
     *
     * });
     * @returns {promise}
     */
    listChildren: function () {
        var func =  function() {
            var promise = new Promise(function (resolve, reject) {
                var result = resolve([]);
                this.callback.call(result);
                promise.resolve(result);
            });
            return promise;
        }

        func.prototype.forEach= function (callback){
            this.callback;
        };

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
    }
}