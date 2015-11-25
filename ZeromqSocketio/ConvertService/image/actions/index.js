"use strict";
const im = require('imagemagick');
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
            im.convert([file,"-negate","-threshold", "0", "-negate",convertedFile], function (err,stdout,stderr) {
                if(stderr){
                    cb({error : true, message: stderr.toString()})
                } else {
                    setTimeout(function () {
                        cb(null,{link : "convert/" + data.link})
                    },3000);
                }
            })
        } else {
            cb({error : true , message : "Wrong parameter"});
        }

    }
};