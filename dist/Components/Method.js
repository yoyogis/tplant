"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentKind_1 = require("../Models/ComponentKind");
var Method = (function () {
    function Method(name) {
        this.componentKind = ComponentKind_1.ComponentKind.METHOD;
        this.parameters = [];
        this.returnType = 'any';
        this.modifier = 'public';
        this.isAbstract = false;
        this.isOptional = false;
        this.isStatic = false;
        this.name = name;
    }
    Method.prototype.toPUML = function () {
        var result = { public: '+', private: '-', protected: '#' }[this.modifier];
        result += (this.isAbstract ? '{abstract} ' : '');
        result += (this.isStatic ? '{static} ' : '');
        result += this.name + "(";
        result += this.parameters
            .map(function (parameter) { return parameter.toPUML(); })
            .join(', ');
        result += "): " + this.returnType;
        return result;
    };
    return Method;
}());
exports.Method = Method;
