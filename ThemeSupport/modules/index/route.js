'use strict';

/**
 * Map final part of URL to equivalent functions in controller
 */
module.exports = function (route,component,application) {
    route.route("/").get(component.controllers.index);
    route.route("/change")
        .get(component.controllers.changeTheme);
};