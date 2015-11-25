"use strict";


/**
 * Logic base system
 * @type {{features: {path: {folder: string, file: string}, extend: {system: boolean, active: boolean}, model: {path: {folder: string, file: string}}, view: {path: {folder: string}}, controller: {path: {folder: string, file: string}}, route: {path: {file: string}}}}}
 */
module.exports = {
    features: {
        "path": {
            "folder": "/features",
            "file": "feature.js"
        },
        "view": {
            "path": {
                "folder": "view"
            }
        },
        "controller": {
            "path": {
                "folder": "controller",
                "file": "*.js"
            }
        },
        "route": {
            "path": {
                "file": "route.js"
            }
        }
    }
};