'use strict';

module.exports = function (route,component,application) {
    route.route("/products").get(component.controllers.index);

};