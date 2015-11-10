'use strict';

module.exports = function (route,component,application) {
    route.route("/").get(component.controllers.listFile);
    route.route("/").post(component.controllers.uploadFile);
    route.route("/download/:file").get(component.controllers.downloadFile);
    route.route("/delete/:file").get(component.controllers.deleteFile);
};