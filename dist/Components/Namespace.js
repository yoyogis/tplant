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
var Namespace = (function () {
    function Namespace(name) {
        this.componentKind = ComponentKind_1.ComponentKind.NAMESPACE;
        this.parts = [];
        this.name = name;
    }
    Namespace.prototype.toPUML = function () {
        var result = [];
        result.push("namespace " + this.name + " {");
        this.parts.forEach(function (part) {
            result.push(part.toPUML()
                .replace(/^(?!\s*$)/gm, '    '));
        });
        result.push('}');
        return result.join(os.EOL);
    };
    return Namespace;
}());
exports.Namespace = Namespace;
