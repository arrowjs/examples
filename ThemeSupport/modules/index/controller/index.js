'use strict';

module.exports = function (controller,component,application) {
    /**
     * Render index view with links to other views
     */
    controller.index = function (req,res) {
        res.render('index')
    };

    controller.changeTheme = function (req,res) {
        let theme = req.query.theme || "clean";
        application.setConfig("theme",theme).then(function () {
            res.send("Current theme: " + application.getConfig('theme'));
        });
    }
};