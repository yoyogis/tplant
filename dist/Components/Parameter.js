"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentKind_1 = require("../Models/ComponentKind");
var Parameter = (function () {
    function Parameter(name) {
        this.componentKind = ComponentKind_1.ComponentKind.PARAMETER;
        this.hasInitializer = false;
        this.isOptional = false;
        this.parameterType = 'any';
        this.name = name;
    }
    Parameter.prototype.toPUML = function () {
        return "" + this.name + (this.isOptional || this.hasInitializer ? '?' : '') + ": " + this.parameterType;
    };
    return Parameter;
}());
exports.Parameter = Parameter;
