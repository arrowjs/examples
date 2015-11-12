'use strict';

module.exports = function (component,application) {
    return {
        "/"  : {
            get : {
                handler : [component.controllers.list_file]
            }
        },
        "/basic" : {
            get : {
                handler : [component.controllers.basic]
            }
        },
        "/upload" : {
            get :  {
                handler : [component.controllers.upload]
            },
            post : {
                handler : [component.controllers.upload]
            }
        },
        "/upload_done" : {
            get : {
                handler : [component.controllers.upload_done]
            }
        },
        "/download/:file" : {
            get :  {
                handler : [component.controllers.download]
            }
        },
        "/delete_file/:file" : {
            get :  {
                handler : [component.controllers.delete_file]
            }
        }
    };
};