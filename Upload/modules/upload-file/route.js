'use strict';

module.exports = function (route,component,application) {
    route.route("/").get(component.controllers.index);
    route.route("/").post(component.controllers.uploadFile);


    route.route("/list").get(component.controllers.listFile);
    route.route("/download/:file").get(component.controllers.dowloadFile);
    route.route("/delete/:file").get(component.controllers.deleteFile);

};