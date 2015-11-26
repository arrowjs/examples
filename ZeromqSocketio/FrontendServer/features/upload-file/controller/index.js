'use strict';

const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = function (controller, component, application) {
    const uploadPath = path.resolve(application.arrFolder, "..", "uploads") + "/";
    controller.listFile = function (req, res, next) {
        let data = [];
        fs.readdir(uploadPath, function (err, listFiles) {
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
        let socketId ="";
        let form = new formidable.IncomingForm();
        let fileName;
        form.uploadDir = uploadPath;
        form.keepExtensions = true;

        form.parse(req, function (err,fields,files) {
            if(fields.socketId) {
                socketId = fields.socketId;
            }
        });
        form.on('progress', function (bytesReceived, bytesExpected) {
            let percent_complete = (bytesReceived / bytesExpected) * 100;
            let progress = percent_complete.toFixed(2);
        });

        form.on('fileBegin', function (name, file) {
            // update name file
            fileName = path.relative(uploadPath, file.path);
        });

        form.on("end", function () {
            res.send({link: fileName});
            application.services.convertImage.send({
                action: "image.convert",
                data: {
                    link: fileName
                }
            }, function (err, data) {
                if (err) {
                    application.io.to(socketId).emit("convertError", err)
                } else {
                    application.io.to(socketId).emit("converted", data)
                }
            })
        })
    };


    controller.downloadFile = function (req, res, next) {
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
