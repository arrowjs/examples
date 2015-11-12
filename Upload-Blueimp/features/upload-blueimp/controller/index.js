'use strict';

const upload = require('jquery-file-upload-middleware');
const fs = require('fs');

module.exports = function (controller, component, application) {
    const uploadPath = application.arrFolder + 'public/upload/';

    upload.configure({
        uploadDir: uploadPath,
        uploadUrl: "/download"
    });

    controller.list_file = function (req, res, next) {
        console.log("=====list=====");
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
            //console.log(data);
            res.render('basic-plus', {
                data: data
            });
        });
    };

    controller.basic = function (req, res) {
        console.log(uploadPath);
        res.render('basic');
    };


    controller.upload = function (req, res, next) {
        console.log("===upload===");
        upload.fileHandler({
            uploadDir: function () {
                return uploadPath
            },
            uploadUrl: function () {
                return "/download";
            }
        })(req, res, next);
    };

    controller.upload_done = function (req, res, next) {
        console.log("=====upload-done=====");
        res.redirect('/');
    };

    controller.download = function (req, res, next) {

        res.download(uploadPath + req.params.file, function (err) {
            if (!err) return; // file sent
            if (err && err.status !== 404) return next(err); // non-404 error
            // file for download not found
            res.statusCode = 404;
            res.send('Cant find that file, sorry!');
        });
    };

    controller.delete_file = function (req, res, next) {
        fs.unlink(uploadPath + req.params.file, function () {
            res.redirect('/');
        });
    };

};
