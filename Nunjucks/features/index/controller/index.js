'use strict';

module.exports = function (controller,component,application) {
    /**
     * Render index view with links to other views
     */
    let students = [
        { name: 'Jeremy Falcon', major: 'Math' },
        { name: 'Henry Kissinger', major: 'English' },
        { name: 'Cataliano Jira', major: 'Math' },
        { name: 'Philips Sikas', major: 'Computer Science' },
        { name: 'Vons Batura', major: 'English' },
        { name: 'Helena Viera', major: 'Computer Science' },
        { name: 'Ada Lovelace', major: 'Physics' },
        { name: 'Ivan Rullian', major: 'English' },
        { name: 'Merks Isca', major: 'Physics' }
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
        res.render('logic', {students: students});
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