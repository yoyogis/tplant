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
var File = (function () {
    function File() {
        this.componentKind = ComponentKind_1.ComponentKind.FILE;
        this.name = '';
        this.parts = [];
    }
    File.prototype.toPUML = function () {
        var result = [];
        this.parts.forEach(function (part) {
            result.push(part.toPUML());
        });
        return result.join(os.EOL);
    };
    return File;
}());
exports.File = File;
