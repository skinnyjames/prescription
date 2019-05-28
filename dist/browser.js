"use strict";
exports.__esModule = true;
var container_1 = require("./container");
var Browser = (function () {
    function Browser(driver) {
        this.driver = driver;
        Object.assign(this, container_1.Container);
    }
    Browser.prototype.visit = function (url) {
        return this.driver.get(url);
    };
    return Browser;
}());
exports.Browser = Browser;
