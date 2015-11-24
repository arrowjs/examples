'use strict';

module.exports = function (controller,component,application) {
    /**
     * Render index view with links to other views
     */
    let repos = [
        { name: 'arrowjs core', url: 'https://github.com/arrowjs/ArrowjsCore' }
        , { name: 'arrowjs cms', url: 'https://github.com/arrowjs/ArrowCMS' }
        , { name: 'examples', url: 'https://github.com/arrowjs/examples' }
        , { name: 'documents', url: 'https://github.com/arrowjs/Documents' }
    ];

    controller.index = function (req,res) {
        res.render('index',
            {
                message: 'Arrowjs runs fast as arrow',
                features: [
                    'Fast',
                    'Simple - Yeoman Generator',
                    'Feature loosely couple',
                    'Theme-able',
                    'CMS ready',
                    'RBAC',
                    'WebSocket',
                    'ES6 ready',
                    'Content Cache',
                    'Scalable'
                ]
            }
        )
    };
    controller.logic = function (req,res) {
        res.render('logic', {repos: repos});
    };

    controller.inherit = function (req,res) {
        res.render('inherit');
    };

    let foo = function() {
        return application.arrFolder;
    };
    controller.call = function (req,res) {
        res.render('call', {func: foo});
    };

};