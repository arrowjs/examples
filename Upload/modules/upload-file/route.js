'use strict';

module.exports = function (route,component,application) {
    route.route("/list").get(component.controllers.listFile);
    route.route("/upload").get(component.controllers.index);
    route.route("/upload").post(component.controllers.uploadFile);
    route.route("/dowload/:file").get(component.controllers.dowloadFile);
    route.route("/delete/:file").get(component.controllers.deleteFile);

};