"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var ComponentKind_1 = require("../Models/ComponentKind");
var Class = (function () {
    function Class(name) {
        this.componentKind = ComponentKind_1.ComponentKind.CLASS;
        this.isAbstract = false;
        this.isStatic = false;
        this.constructorMethods = [];
        this.members = [];
        this.implementsInterfaces = [];
        this.typeParameters = [];
        this.dependencies = [];
        this.name = name;
    }
    Class.prototype.toPUML = function () {
        var _this = this;
        var result = [];
        var firstLine = [];
        if (this.isAbstract) {
            firstLine.push('abstract ');
        }
        firstLine.push("class " + this.name);
        if (this.typeParameters.length > 0) {
            firstLine.push('<');
            firstLine.push(this.typeParameters
                .map(function (typeParameter) { return typeParameter.toPUML(); })
                .join(', '));
            firstLine.push('>');
        }
        if (this.extendsClass !== undefined) {
            firstLine.push(" extends " + this.extendsClass);
        }
        if (this.implementsInterfaces.length > 0) {
            firstLine.push(" implements " + this.implementsInterfaces.join(', '));
        }
        if (this.members.length > 0) {
            firstLine.push(' {');
        }
        result.push(firstLine.join(''));
        this.members.forEach(function (member) {
            result.push("    " + member.toPUML());
        });
        if (this.members.length > 0) {
            result.push('}');
        }
        if (this.dependencies.length > 0) {
            this.dependencies.forEach(function (d) {
                result.push(_this.name + " --> " + d);
            });
        }
        return result.join(os.EOL);
    };
    return Class;
}());
exports.Class = Class;
