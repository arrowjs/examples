'use strict';

/**
 * Map final part of URL to equivalent functions in controller
 */
module.exports = function (route,component,application) {
    route.route("/").get(component.controllers.index);

    route.route("/about").get(component.controllers.about);

    route.route("/contact").get(component.controllers.contact);

    route.route("/post").get(component.controllers.post);

    route.route("/change").get(component.controllers.changeTheme);

};