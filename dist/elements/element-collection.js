"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var element_1 = require("./element");
var swear_1 = __importDefault(require("swear"));
var ElementCollection = (function () {
    function ElementCollection(context, locator) {
        if (context.browser) {
            this.browser = context.browser;
        }
        else {
            this.browser = context;
        }
        this.locator = locator;
        return this.locateElements();
    }
    ElementCollection.prototype.locateElements = function () {
        return swear_1["default"](this.browser.driver.findElements(this.locator))
            .map(function (el) { return new element_1.Element(el); });
    };
    return ElementCollection;
}());
exports.ElementCollection = ElementCollection;
