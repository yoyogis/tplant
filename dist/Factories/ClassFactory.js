"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importDefault(require("typescript"));
var Class_1 = require("../Components/Class");
var ComponentFactory_1 = require("./ComponentFactory");
var ClassFactory;
(function (ClassFactory) {
    function create(classSymbol, checker) {
        var className = getClassName(classSymbol);
        var result = new Class_1.Class(className);
        var classDeclaration = classSymbol.getDeclarations();
        if (classDeclaration !== undefined && classDeclaration.length > 0) {
            result.isStatic = ComponentFactory_1.ComponentFactory.isStatic(classDeclaration[classDeclaration.length - 1]);
            result.isAbstract = ComponentFactory_1.ComponentFactory.isAbstract(classDeclaration[classDeclaration.length - 1]);
        }
        if (classSymbol.members !== undefined) {
            result.members = ComponentFactory_1.ComponentFactory.serializeMethods(classSymbol.members, checker);
            result.typeParameters = ComponentFactory_1.ComponentFactory.serializeTypeParameters(classSymbol.members, checker);
        }
        if (classSymbol.exports !== undefined) {
            result.members = result.members.concat(ComponentFactory_1.ComponentFactory.serializeMethods(classSymbol.exports, checker));
        }
        if (classSymbol.globalExports !== undefined) {
            result.members = result.members.concat(ComponentFactory_1.ComponentFactory.serializeMethods(classSymbol.globalExports, checker));
        }
        if (classDeclaration !== undefined && classDeclaration.length > 0) {
            var heritageClauses = classDeclaration[classDeclaration.length - 1].heritageClauses;
            if (heritageClauses !== undefined) {
                heritageClauses.forEach(function (heritageClause) {
                    if (heritageClause.token === typescript_1.default.SyntaxKind.ExtendsKeyword) {
                        result.extendsClass = ComponentFactory_1.ComponentFactory.getExtendsHeritageClauseName(heritageClause);
                    }
                    else if (heritageClause.token === typescript_1.default.SyntaxKind.ImplementsKeyword) {
                        result.implementsInterfaces = ComponentFactory_1.ComponentFactory.getImplementsHeritageClauseNames(heritageClause);
                    }
                });
            }
        }
        result.dependencies = getDependence(classSymbol, checker);
        return result;
    }
    ClassFactory.create = create;
    function getDependence(classSymbol, checker) {
        var results = new Set();
        filterNodes(classSymbol.valueDeclaration.getSourceFile().getChildren());
        return Array.from(results);
        function filterNodes(nodes) {
            nodes.forEach(function (node) {
                if (node.kind === typescript_1.default.SyntaxKind.PropertyAccessExpression) {
                    var currentNode = node;
                    var sym = checker.getSymbolAtLocation(currentNode.expression);
                    if (sym && sym.type) {
                        var className = getClassName(sym.type.getSymbol());
                        if (className === '__object') {
                            className = sym.getName();
                        }
                        results.add(className);
                    }
                    else {
                    }
                }
                filterNodes(node.getChildren());
            });
        }
    }
    ClassFactory.getDependence = getDependence;
    function getClassName(classSymbol) {
        var className = classSymbol.getName();
        var s = classSymbol;
        if (className === 'default') {
            className = s.getDeclarations()[0].name.escapedText;
        }
        if (s.parent && s.parent.valueDeclaration && s.parent.valueDeclaration.path) {
            var m = s.parent.valueDeclaration.path.match(/\.([a-z]+)\.ts/);
            if (m) {
                className = m[1] + "." + className;
            }
        }
        return className;
    }
})(ClassFactory = exports.ClassFactory || (exports.ClassFactory = {}));
