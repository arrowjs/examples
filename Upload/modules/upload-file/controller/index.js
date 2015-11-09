'use strict';

const formidable = require('formidable');
const fs = require('fs');
const util = require('util');

module.exports = function (controller, component, application) {
    const uploadPath = application.arrFolder + 'public/upload/';
    console.log(uploadPath);

    controller.index = function (req, res) {
        res.render('index');
    };

    controller.listFile = function (req, res, next) {
        fs.readdir(uploadPath, function (err, listFiles) {
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

        form.uploadDir = uploadPath;
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
            file.path = uploadPath + file.name;
            res.redirect('/list');
        });
    };

    controller.dowloadFile = function (req, res, next) {
        let stream = fs.createReadStream(uploadPath + req.params.file);
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
        let stream = fs.createReadStream(uploadPath + req.params.file);
        fs.unlinkSync(uploadPath + req.params.file);
        res.redirect('/list');
    };
};
