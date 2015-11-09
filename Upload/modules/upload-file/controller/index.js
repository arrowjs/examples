'use strict';

const formidable = require('formidable');
const fs = require('fs');
const util = require('util');

module.exports = function (controller, component, application) {

    controller.index = function (req, res) {
        res.render('index');
    };

    controller.listFile = function (req, res, next) {
        var postLastPath = __dirname.lastIndexOf('/');
        var filePath = __dirname.substring(0, postLastPath);
        fs.readdir(filePath + '/file/', function (err, listFiles) {
            for (let item in listFiles) {
                console.log(listFiles[item]);
            }
            res.render('list-file', {
                items: listFiles
            });
        });

    };

    controller.uploadFile = function (req, res, next) {
        let form = new formidable.IncomingForm();
        let postLastPath = __dirname.lastIndexOf('/');
        let rootDir = __dirname.substring(0, postLastPath);
        form.uploadDir = rootDir + "/file/";
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
            //res.writeHead(200, {'content-type': 'text/plain'});
            //res.write('received upload:\n\n');
            //res.end(util.inspect({fields: fields, files: files}));
        });

        form.on('progress', function (bytesReceived, bytesExpected) {
            let percent_complete = (bytesReceived / bytesExpected) * 100;
            let progress = percent_complete.toFixed(2);
            console.log("--  ", progress);

        });

        form.on('fileBegin', function (name, file) {
            file.path = rootDir + "/file/" + file.name;
            res.redirect('/list');
        });
    };

    controller.dowloadFile = function (req, res, next) {
        let postLastPath = __dirname.lastIndexOf('/');
        let rootDir = __dirname.substring(0, postLastPath);
        let stream = fs.createReadStream(rootDir + '/file/' + req.params.file);
        stream.on('open', function () {
            stream.pipe(res);
        });
        stream.on('error', function (err) {
            console.log('Error at: .' + path);
            res.end(err);
        });
        res.redirect('/list');
    };

    controller.deleteFile = function (req, res, next) {
        let postLastPath = __dirname.lastIndexOf('/');
        let rootDir = __dirname.substring(0, postLastPath);
        let stream = fs.createReadStream(rootDir + '/file/' + req.params.file);
        fs.unlinkSync(rootDir + '/file/' + req.params.file);
        res.redirect('/list');
    };
};
