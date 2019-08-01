"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentKind_1 = require("../Models/ComponentKind");
var Property = (function () {
    function Property(name) {
        this.componentKind = ComponentKind_1.ComponentKind.PROPERTY;
        this.modifier = 'public';
        this.returnType = 'any';
        this.isAbstract = false;
        this.isOptional = false;
        this.isStatic = false;
        this.name = name;
    }
    Property.prototype.toPUML = function () {
        var result = { public: '+', private: '-', protected: '#' }[this.modifier];
        result += (this.isAbstract ? '{abstract} ' : '');
        result += (this.isStatic ? '{static} ' : '');
        result += "" + this.name + (this.isOptional ? '?' : '') + ": " + this.returnType;
        return result;
    };
    return Property;
}());
exports.Property = Property;
