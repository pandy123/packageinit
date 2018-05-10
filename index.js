#!/usr/bin/env node

var fs = require('fs')
var StringBuffer = require('stringtypebuffer').StringBuffer
var currentpath = process.cwd()
var filePath = process.argv[1]
var basePath = filePath.substr(0, filePath.length - 9)
var argv = process.argv[2]

function copyFile(srcPath, desPath) {
    var read = fs.createReadStream(srcPath)
    var write = fs.createWriteStream(desPath)
    read.pipe(write)
}

var createInit = function() {
    var srcpath = new StringBuffer().pushString(currentpath).pushString('/src').toString()
    if (!fs.existsSync(srcpath)) {
        fs.mkdir(srcpath)
    }
    var buildpath = new StringBuffer().pushString(currentpath).pushString('/build').toString()
    if (!fs.existsSync(buildpath)) {
        fs.mkdir(buildpath)
    }
    var typepath = new StringBuffer().pushString(currentpath).pushString('/types').toString()
    if (!fs.existsSync(typepath)) {
        fs.mkdir(typepath)
    }
    var ignorefile = new StringBuffer().pushString(currentpath).pushString('/.gitignore').toString()
    if (!fs.existsSync(ignorefile)) {
        copyFile(basePath + '/template/.gitignore', currentpath + '/.gitignore')
    }

    var tsconfigfile = new StringBuffer().pushString(currentpath).pushString('/tsconfig.json').toString()
    if (!fs.existsSync(tsconfigfile)) {
        copyFile(basePath + '/template/tsconfig.json', currentpath + '/tsconfig.json')
    }

    var buildfile = new StringBuffer().pushString(currentpath).pushString('/build.bat').toString()
    if (!fs.existsSync(buildfile)) {
        copyFile(basePath + '/template/build.bat', currentpath + '/build.bat')
    }
}

createInit()