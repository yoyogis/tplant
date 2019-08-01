"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentKind_1 = require("../Models/ComponentKind");
var EnumValue = (function () {
    function EnumValue(name) {
        this.componentKind = ComponentKind_1.ComponentKind.PROPERTY;
        this.name = name;
    }
    EnumValue.prototype.toPUML = function () {
        return this.name;
    };
    return EnumValue;
}());
exports.EnumValue = EnumValue;
