"use strict";
exports.__esModule = true;
var html_1 = require("./elements/html");
var html_collection_1 = require("./elements/html-collection");
var anchor_1 = require("./elements/anchor");
exports.Container = {
    div: function (args) {
        return new html_1.HTMLElement(this, args);
    },
    divs: function (args) {
        return new html_collection_1.HTMLElementCollection(this, args);
    },
    span: function (args) {
        return new html_1.HTMLElement(this, args);
    },
    a: function (args) {
        return new anchor_1.Anchor(this, args);
    },
    td: function (args) {
        return new html_1.HTMLElement(this, args);
    }
};
