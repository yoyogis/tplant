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
var Enum = (function () {
    function Enum(name) {
        this.componentKind = ComponentKind_1.ComponentKind.ENUM;
        this.values = [];
        this.name = name;
    }
    Enum.prototype.toPUML = function () {
        var result = [];
        var declaration = "enum " + this.name;
        if (this.values.length > 0) {
            declaration += ' {';
        }
        result.push(declaration);
        this.values.forEach(function (enumValue) {
            result.push("    " + enumValue.toPUML());
        });
        if (this.values.length > 0) {
            result.push('}');
        }
        return result.join(os.EOL);
    };
    return Enum;
}());
exports.Enum = Enum;
