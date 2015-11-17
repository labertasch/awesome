var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Test = (function () {
    function Test() {
    }
    Test.prototype.sendMessage = function (Message) {
        this.msg = Message;
        return this.msg;
    };
    Object.defineProperty(Test.prototype, "sendMessage",
        __decorate([
            log
        ], Test.prototype, "sendMessage", Object.getOwnPropertyDescriptor(Test.prototype, "sendMessage")));
    return Test;
})();
function log(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("The method args are: " + JSON.stringify(args)); // pre
        var result = originalMethod.apply(this, args); // run and store the result
        console.log("The return value is: " + result); // post
        return result; // return the result of the original method
    };
}
var UserModel = (function () {
    function UserModel() {
    }
    UserModel.prototype.getUser = function () {
        return this.user;
    };
    __decorate([
        Resource
    ], UserModel.prototype, "user");
    Object.defineProperty(UserModel.prototype, "getUser",
        __decorate([
            log
        ], UserModel.prototype, "getUser", Object.getOwnPropertyDescriptor(UserModel.prototype, "getUser")));
    return UserModel;
})();
function Resource(target, descriptor) {
    descriptor.value = "annotated user";
}
var test = new Test().sendMessage("hello world");
var test2 = new UserModel().getUser();
