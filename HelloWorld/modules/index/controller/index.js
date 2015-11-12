'use strict';

module.exports = function (controller,component,application) {
    /**
     * Render index view with links to other views
     */
    controller.index = function (req,res) {
        res.render('index',
            {
                title: 'Hello World app',
                links: [
                    {title: 'About this app', link: 'about'},
                    {title: 'Repositories', link: 'repos'}
                ]
            }
        )
    };
    /**
     * Render about view using Nunjuck template
     */
    controller.about = function (req,res) {
        var fun = function() {
            console.log('Foo is great');
        };
        res.render('about',
            {
                title: 'About Arrowjs.io',
                body: 'Arrowjs.io is framework that is fast, theme-able and extensible',
                foo: fun
            })
    };
    /**
     * return JSON list of github repositories of Arrowjs.io
     */
    controller.repos = function(req, res) {
        let repos = [
            { name: 'arrowjs core', url: 'https://github.com/arrowjs/ArrowjsCore' }
            , { name: 'arrowjs cms', url: 'https://github.com/arrowjs/ArrowCMS' }
            , { name: 'examples', url: 'https://github.com/arrowjs/examples' }
            , { name: 'documents', url: 'https://github.com/arrowjs/Documents' }
        ];
        res.json(repos);
    };


};