'use strict';

/**
 * Map final part of URL to equivalent functions in controller
 */
/**
 * Map final part of URL to equivalent functions in controller
 */
module.exports = function (component,application) {
    return {
        "/": {
            get : {
                handler: component.controllers.index
            }
        },
        "/more": {
            get : {
                handler: component.controllers.more
            }
        },
        "/about": {
            get : {
                handler: component.controllers.about
            }
        }
    }
};