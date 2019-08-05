#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs_1 = __importDefault(require("fs"));
var glob_1 = __importDefault(require("glob"));
var http_1 = __importDefault(require("http"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var plantuml_encoder_1 = require("plantuml-encoder");
var typescript_1 = __importDefault(require("typescript"));
var tplant_1 = require("./tplant");
var AVAILABLE_PLANTUML_EXTENSIONS = ['svg', 'png', 'txt'];
commander_1.default
    .version('2.3.1')
    .option('-i, --input <path>', 'Define the path of the Typescript file')
    .option('-o, --output <path>', 'Define the path of the output file. If not defined, it\'ll output on the STDOUT')
    .option('-p, --project <path>', 'Compile a project given a valid configuration file.' +
    ' The argument can be a file path to a valid JSON configuration file,' +
    ' or a directory path to a directory containing a tsconfig.json file.')
    .option('-C, --compositions', 'Create not heritage compositions')
    .option('-I, --only-interfaces', 'Only output interfaces')
    .parse(process.argv);
if (!commander_1.default.input) {
    console.error('Missing input file');
    process.exit(1);
}
var matches1 = [];
var input = commander_1.default.input;
input.split(',').forEach(function (path1) {
    if (path1) {
        matches1 = matches1.concat(glob_1.default.sync(path1));
    }
});
run(null, matches1);
function run(err, matches) {
    if (err !== null) {
        throw err;
    }
    console.log(commander_1.default.input);
    var tsConfigFile = findTsConfigFile(commander_1.default.input, commander_1.default.tsconfig);
    var plantUMLDocument = tplant_1.tplant.convertToPlant(tplant_1.tplant.generateDocumentation(matches.filter(function (m) { return m.indexOf('node_modules') === -1; }), getCompilerOptions(tsConfigFile)), {
        compositions: commander_1.default.compositions,
        onlyInterfaces: commander_1.default.onlyInterfaces
    });
    if (commander_1.default.output === undefined) {
        console.log(plantUMLDocument);
        return;
    }
    var extension = path_1.default.extname(commander_1.default.output)
        .replace(/^\./gm, '');
    if (AVAILABLE_PLANTUML_EXTENSIONS.includes(extension)) {
        requestImageFile(commander_1.default.output, plantUMLDocument, extension);
        return;
    }
    fs_1.default.writeFileSync(commander_1.default.output, plantUMLDocument, 'binary');
}
;
function findTsConfigFile(inputPath, tsConfigPath) {
    if (tsConfigPath !== undefined) {
        var tsConfigStats = fs_1.default.statSync(tsConfigPath);
        if (tsConfigStats.isFile()) {
            return tsConfigPath;
        }
        if (tsConfigStats.isDirectory()) {
            var tsConfigFilePath = path_1.default.resolve(tsConfigPath, 'tsconfig.json');
            if (fs_1.default.existsSync(tsConfigFilePath)) {
                return tsConfigFilePath;
            }
        }
    }
    var localTsConfigFile = path_1.default.resolve(path_1.default.dirname(inputPath), 'tsconfig.json');
    if (fs_1.default.existsSync(localTsConfigFile)) {
        return localTsConfigFile;
    }
    var cwdTsConfigFile = path_1.default.resolve(process.cwd(), 'tsconfig.json');
    if (fs_1.default.existsSync(cwdTsConfigFile)) {
        return cwdTsConfigFile;
    }
    return;
}
function getCompilerOptions(tsConfigFilePath) {
    if (tsConfigFilePath === undefined) {
        return typescript_1.default.getDefaultCompilerOptions();
    }
    var reader = function (filePath) { return fs_1.default.readFileSync(filePath, 'utf8'); };
    var configFile = typescript_1.default.readConfigFile(tsConfigFilePath, reader);
    if (configFile.error !== undefined && configFile.error.category === typescript_1.default.DiagnosticCategory.Error) {
        throw new Error("unable to read tsconfig.json file at: " + tsConfigFilePath + ".\n             Error: " + typescript_1.default.flattenDiagnosticMessageText(configFile.error.messageText, os_1.default.EOL));
    }
    else if (configFile.config === undefined) {
        throw new Error("unable to read tsconfig.json file at: " + tsConfigFilePath + ".");
    }
    var convertedCompilerOptions = typescript_1.default.convertCompilerOptionsFromJson(configFile.config.compilerOptions, path_1.default.dirname(tsConfigFilePath));
    if (convertedCompilerOptions.errors.length > 0) {
        convertedCompilerOptions.errors.forEach(function (error) {
            if (error.category === typescript_1.default.DiagnosticCategory.Error) {
                throw new Error("unable to read tsconfig.json file at: " + tsConfigFilePath + ".\n                Error: " + typescript_1.default.flattenDiagnosticMessageText(error.messageText, os_1.default.EOL));
            }
        });
    }
    return convertedCompilerOptions.options;
}
function requestImageFile(output, input, extension) {
    http_1.default.get({
        host: 'www.plantuml.com',
        path: "/plantuml/" + extension + "/" + plantuml_encoder_1.encode(input)
    }, function (res) {
        var fileStream = fs_1.default.createWriteStream(output);
        res.setEncoding('binary');
        res.pipe(fileStream);
        res.on('error', function (err) {
            throw err;
        });
    });
}
