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
    /**
     * Render about view using Nunjuck template
     */
    controller.more = function (req,res) {
        var fun = function() {
            console.log('Foo is great');
        };
        res.render('more',
            {
                title: 'More cool stuffs',
                repos: repos,
                foo: fun
            });
    };

    controller.nake = function (req,res) {
        res.render('nake');
    };
    /**
     * return JSON list of github repositories of Arrowjs.io
     */
    controller.json = function(req, res) {
        res.json(repos);
    };


};