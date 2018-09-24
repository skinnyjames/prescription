"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Browser = (function () {
    function Browser(driver) {
        this.driver = driver;
        Object.assign(this, Container);
    }
    Browser.prototype.visit = function (url) {
        return this.driver.get(url);
    };
    return Browser;
}());
var Element = (function () {
    function Element(browser, locator) {
        if (browser.browser) {
            this.browser = browser.browser;
        }
        else {
            this.browser = browser;
        }
        this.locator = locator;
        this.element = this.locateElement();
        this.browser.currentElement = this.element;
        Object.assign(this, Container);
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
var HTMLElement = (function (_super) {
    __extends(HTMLElement, _super);
    function HTMLElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HTMLElement;
}(Element));
var Anchor = (function (_super) {
    __extends(Anchor, _super);
    function Anchor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Anchor;
}(HTMLElement));
var Container = {
    div: function (args) {
        return new HTMLElement(this, args);
    },
    a: function (args) {
        return new Anchor(this, args);
    },
    td: function (args) {
        return new HTMLElement(this, args);
    }
};
module.exports = Browser;
