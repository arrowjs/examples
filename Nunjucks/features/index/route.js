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
        "/logic": {
            get : {
                handler: component.controllers.logic
            }
        },
        "/inherit": {
            get : {
                handler: component.controllers.inherit
            }
        },
        "/call": {
            get : {
                handler: component.controllers.call
            }
        },
        "/async": {
            get : {
                handler: component.controllers.asyc
            }
        }
    }
};