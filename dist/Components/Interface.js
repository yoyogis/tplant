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
var Interface = (function () {
    function Interface(name) {
        this.componentKind = ComponentKind_1.ComponentKind.INTERFACE;
        this.members = [];
        this.extendsInterface = [];
        this.typeParameters = [];
        this.name = name;
    }
    Interface.prototype.toPUML = function () {
        var result = [];
        var firstLine = [];
        firstLine.push("interface " + this.name);
        if (this.typeParameters.length > 0) {
            firstLine.push('<');
            firstLine.push(this.typeParameters
                .map(function (typeParameter) { return typeParameter.toPUML(); })
                .join(', '));
            firstLine.push('>');
        }
        if (this.extendsInterface.length > 0) {
            firstLine.push(" extends " + this.extendsInterface.join(', '));
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
        return result.join(os.EOL);
    };
    return Interface;
}());
exports.Interface = Interface;
