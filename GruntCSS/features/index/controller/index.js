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
        res.render('index');
    };
    /**
     * Render about view using Nunjuck template
     */
    controller.more = function (req,res) {
        res.render('more');
    };

    controller.about = function (req,res) {
        res.render('sub/about');
    };


};