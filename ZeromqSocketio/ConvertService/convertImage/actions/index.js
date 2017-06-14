"use strict";
const gm = require('gm');
//const im = require('imagemagick');
const path = require('path');
const fs = require('fs');

module.exports = function (action,component,application) {
    const uploadPath = path.resolve(application.arrFolder,"..","uploads") + "/";
    action.convert = function (data,cb) {
        let file = "";
        let convertedFile = "";

        if(data.link) {
            file = uploadPath + data.link;

            convertedFile = uploadPath + "convert/" + data.link;

            // Old code

            // im.convert([file,"-colorspace","Gray",convertedFile], function (err,stdout) {
            //     if(err){
            //         cb({error : true, message: err.toString()})
            //     } else {
            //         console.log('stdout:', stdout);
            //         setTimeout(function () {
            //             cb(null,{link : "convert/" + data.link})
            //         },3000);
            //     }
            // })
            
            //New code
            gm(file)
                .resizeExact(120, 150, '!')
                .write(convertedFile, function (err) {
                    if(err){
                        cb(null, {error : true, message: err.toString()})
                    } else {
                        setTimeout(function () {
                            cb(null,{link : "convert/" + data.link})
                        },3000);
                    }
                });


        } else {
            cb({error : true , message : "Wrong parameter"});
        }

    }
};