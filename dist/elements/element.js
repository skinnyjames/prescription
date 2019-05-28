"use strict";
exports.__esModule = true;
var container_1 = require("../container");
var Element = (function () {
    function Element(context, locator) {
        if (context.browser) {
            this.browser = context.browser;
        }
        else {
            this.browser = context;
        }
        this.locator = locator;
        this.element = this.locateElement();
        this.browser.currentElement = this.element;
        Object.assign(this, container_1.Container);
    }
    Element.prototype.text = function () {
        return this.element.getText();
    };
    Element.prototype.click = function () {
        return this.element.click();
    };
    Element.prototype.locateElement = function () {
        if (this.browser.currentElement) {
            return this.browser.currentElement.findElement(this.locator);
        }
        else {
            return this.browser.driver.findElement(this.locator);
        }
    };
    return Element;
}());
exports.Element = Element;
