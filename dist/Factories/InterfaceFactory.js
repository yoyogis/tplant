"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importDefault(require("typescript"));
var Interface_1 = require("../Components/Interface");
var ComponentFactory_1 = require("./ComponentFactory");
var InterfaceFactory;
(function (InterfaceFactory) {
    function create(interfaceSymbol, checker) {
        var result = new Interface_1.Interface(getClassName(interfaceSymbol));
        var declaration = interfaceSymbol.getDeclarations();
        if (interfaceSymbol.members !== undefined) {
            result.members = ComponentFactory_1.ComponentFactory.serializeMethods(interfaceSymbol.members, checker);
            result.typeParameters = ComponentFactory_1.ComponentFactory.serializeTypeParameters(interfaceSymbol.members, checker);
        }
        if (declaration !== undefined && declaration.length > 0) {
            var heritageClauses = declaration[declaration.length - 1].heritageClauses;
            if (heritageClauses !== undefined) {
                heritageClauses.forEach(function (heritageClause) {
                    if (heritageClause.token === typescript_1.default.SyntaxKind.ExtendsKeyword) {
                        result.extendsInterface = [ComponentFactory_1.ComponentFactory.getExtendsHeritageClauseName(heritageClause)];
                    }
                });
            }
        }
        return result;
    }
    InterfaceFactory.create = create;
    function getClassName(classSymbol) {
        var className = classSymbol.getName();
        var s = classSymbol;
        if (className === 'default') {
            className = s.getDeclarations()[0].name.escapedText;
        }
        if (s.parent && s.parent.valueDeclaration && s.parent.valueDeclaration.path) {
            var m = s.parent.valueDeclaration.path.match(/\.([a-z]+)\.ts/);
            if (m) {
                className = m[1] + '.' + className;
            }
        }
        return className;
    }
})(InterfaceFactory = exports.InterfaceFactory || (exports.InterfaceFactory = {}));
