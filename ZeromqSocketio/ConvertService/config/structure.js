"use strict";


/**
 * Logic base system
 * @type {{features: {path: {folder: string, file: string}, extend: {system: boolean, active: boolean}, model: {path: {folder: string, file: string}}, view: {path: {folder: string}}, controller: {path: {folder: string, file: string}}, route: {path: {file: string}}}}}
 */
module.exports = {
    image: {
        "path": {
            "folder": "/convertImage",
            "file": "config.js",
            singleton : true
        },
        "action": {
            "path": {
                "folder": "actions",
                "file": "*.js"
            }
        }
    }
};