"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var typescript_1 = __importDefault(require("typescript"));
var Class_1 = require("./Components/Class");
var Interface_1 = require("./Components/Interface");
var Method_1 = require("./Components/Method");
var ComponentKind_1 = require("./Models/ComponentKind");
var FileFactory_1 = require("./Factories/FileFactory");
var COMPOSITION_LINE = '*--';
var REGEX_ONLY_TYPE_NAMES = /\w+/g;
var tplant;
(function (tplant) {
    function generateDocumentation(fileNames, options) {
        if (options === void 0) { options = typescript_1.default.getDefaultCompilerOptions(); }
        var program = typescript_1.default.createProgram(fileNames, options);
        var checker = program.getTypeChecker();
        var result = [];
        program.getSourceFiles()
            .forEach(function (sourceFile) {
            if (!sourceFile.isDeclarationFile) {
                var file = FileFactory_1.FileFactory.create(sourceFile, checker);
                if (file !== undefined) {
                    result.push(file);
                }
            }
        });
        return result;
    }
    tplant.generateDocumentation = generateDocumentation;
    function convertToPlant(files, options) {
        if (options === void 0) { options = {
            compositions: false,
            onlyInterfaces: false
        }; }
        var lines = [];
        if (options.onlyInterfaces) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                file.parts = file.parts
                    .filter(function (part) { return part.componentKind === ComponentKind_1.ComponentKind.INTERFACE; });
            }
        }
        lines.push('@startuml');
        files.forEach(function (file) {
            var conversion = file.toPUML();
            if (conversion !== '') {
                lines.push(conversion);
            }
        });
        if (options.compositions) {
            lines.push.apply(lines, createCompositions(files));
        }
        lines.push('@enduml');
        return lines.join(os.EOL);
    }
    tplant.convertToPlant = convertToPlant;
    function createCompositions(files) {
        var compositions = [];
        var mappedTypes = {};
        var outputConstraints = {};
        files.forEach(function (file) {
            file.parts.forEach(function (part) {
                if (part.componentKind === ComponentKind_1.ComponentKind.CLASS ||
                    part.componentKind === ComponentKind_1.ComponentKind.INTERFACE ||
                    part.componentKind === ComponentKind_1.ComponentKind.ENUM) {
                    mappedTypes[part.name] = true;
                }
            });
        });
        files.forEach(function (file) {
            if (file.componentKind !== ComponentKind_1.ComponentKind.FILE) {
                return;
            }
            file.parts.forEach(function (part) {
                if (!(part instanceof Class_1.Class) && !(part instanceof Interface_1.Interface)) {
                    return;
                }
                part.members.forEach(function (member) {
                    var checks = [];
                    if (member instanceof Method_1.Method) {
                        member.parameters.forEach(function (parameter) {
                            var parameters = parameter.parameterType.match(REGEX_ONLY_TYPE_NAMES);
                            if (parameters !== null) {
                                checks = checks.concat(parameters);
                            }
                        });
                    }
                    var returnTypes = member.returnType.match(REGEX_ONLY_TYPE_NAMES);
                    if (returnTypes !== null) {
                        checks = checks.concat(returnTypes);
                    }
                    for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
                        var allTypeName = checks_1[_i];
                        var key = part.name + " " + COMPOSITION_LINE + " " + allTypeName;
                        if (allTypeName !== part.name &&
                            !outputConstraints.hasOwnProperty(key) && mappedTypes.hasOwnProperty(allTypeName)) {
                            compositions.push(key);
                            outputConstraints[key] = true;
                        }
                    }
                });
            });
        });
        return compositions;
    }
})(tplant = exports.tplant || (exports.tplant = {}));
