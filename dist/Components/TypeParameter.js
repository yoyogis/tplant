"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentKind_1 = require("../Models/ComponentKind");
var TypeParameter = (function () {
    function TypeParameter(name) {
        this.componentKind = ComponentKind_1.ComponentKind.PARAMETER;
        this.name = name;
    }
    TypeParameter.prototype.toPUML = function () {
        return "" + this.name + (this.constraint !== undefined ? " extends " + this.constraint : '');
    };
    return TypeParameter;
}());
exports.TypeParameter = TypeParameter;
