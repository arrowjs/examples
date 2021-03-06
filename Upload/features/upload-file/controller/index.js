'use strict';

const formidable = require('formidable');
const fs = require('fs-extra');
const util = require('util');
module.exports = function (controller, component, application) {
    const uploadPath = application.arrFolder + 'public/upload/';

    controller.index = function (req, res) {
        res.render('index');
    };

    controller.listFile = function (req, res, next) {
        let data = [];
        fs.readdir(uploadPath, function (err, listFiles) {
            if (listFiles === undefined) {
                fs.emptyDir(uploadPath, function (err) {
                    if (!err) console.log('success!')
                });
            }
            for (let item in listFiles) {
                let info = {};
                let stats = fs.statSync(uploadPath + listFiles[item]);
                let fileSizeInBytes = stats["size"];
                let fileSizeInKilobytes = fileSizeInBytes / 1024;
                let datetime = new Date(stats["birthtime"]);
                info["name"] = listFiles[item];
                info["size"] = Math.ceil(fileSizeInKilobytes);
                info["birthtime"] = datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getFullYear();
                data.push(info);
            }
            res.render('index', {
                data: data
            });
        });

    };

    controller.uploadFile = function (req, res, next) {

        let form = new formidable.IncomingForm();
        form.uploadDir = uploadPath;
        form.keepExtensions = true;

        //console.log(form)

        form.parse(req, function (err, fields, files) {
            // res.writeHead(200, {'content-type': 'text/plain'});
            // res.write('received upload:\n\n');
            // res.end(util.inspect({fields: fields, files: files}));
        });

        form.on('progress', function (bytesReceived, bytesExpected) {
            let percent_complete = (bytesReceived / bytesExpected) * 100;
            let progress = percent_complete.toFixed(2);
            console.log("--> ", progress);
        });
        form.on('fileBegin', function (name, file) {
            // update name file
            file.path = uploadPath + file.name;
        });
        form.on('end', function () {
            res.redirect('/');
        });
    };


    controller.downloadFile = function (req, res, next  ) {
        console.log("download file : ", req.params.file);

        // example dowload 1
        //let stream = fs.createReadStream(uploadPath + req.params.file);
        //stream.on('open', function () {
        //    stream.pipe(res);
        //});
        //stream.on('error', function (err) {
        //    console.log('Error at: .' + path);
        //    res.end(err);
        //});

        // example dowload 2
        res.download(uploadPath + req.params.file, function (err) {
            if (!err) return; // file sent
            if (err && err.status !== 404) return next(err); // non-404 error
            // file for download not found
            res.statusCode = 404;
            res.send('Cant find that file, sorry!');
        });
    };

    controller.deleteFile = function (req, res, next) {
        console.log("delete : ", req.params.file);
        fs.unlink(uploadPath + req.params.file, function () {
            res.redirect('/');
        });
    };
};
