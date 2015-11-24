'use strict';

module.exports = function (component,application) {
    return {
        "/" : {
            get : {
                handler : [component.controllers.listFile]
            },
            post : {
                handler : [component.controllers.uploadFile]
            }
        },
        "/download/:file" : {
            get : {
                handler : [component.controllers.downloadFile]
            }
        },
        "/delete/:file" :   {
            get : {
                handler : [component.controllers.deleteFile]
            }
        }
    };
};