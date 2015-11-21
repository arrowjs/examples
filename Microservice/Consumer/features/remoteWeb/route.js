'use strict';

/**
 * Map final part of URL to equivalent functions in controller
 */
module.exports = function (component,application) {
    return {
        "/remoteWeb": {
            get : {
                handler: component.controllers.remoteWeb
            }
        }
    }
};