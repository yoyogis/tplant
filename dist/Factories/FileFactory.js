"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = require("../Components/File");
var ComponentFactory_1 = require("./ComponentFactory");
var FileFactory;
(function (FileFactory) {
    function create(sourceFile, checker) {
        var file = new File_1.File();
        file.parts = ComponentFactory_1.ComponentFactory.create(sourceFile, checker);
        return file;
    }
    FileFactory.create = create;
})(FileFactory = exports.FileFactory || (exports.FileFactory = {}));
