'use strict';

module.exports = function (controller, component, application) {

    controller.loginView = function (req, res) {
        // adding flash message
        //console.log(req.session);
        res.render('login', { failure: req.session.flash.error, success: req.session.flash.success });
    };

    controller.createView = function (req, res) {
        res.render('create', { failure: req.session.flash.error, success: req.session.flash.success });
    };

    controller.create = function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        component.models.user.find({
            where: {
                username: username
            }
        }).then(function (result) {
            if (result) { 
                //return res.send('Username already exists'); 
                req.flash.error('Username already exists');
                res.redirect('/create');
                return false;
            }
            component.models.user.create({
                username: username,
                password: password
            }).then(function (a) {
                // redirect back to '/' and then '/login'
                // if we want to login right after signing up, have to write this controller.create with passport strategy and return done(null, user)
                req.flash.success('Register successfully');
                res.redirect('/');
            }).catch(function (err) {
                console.log(err);
            })
        })
    };

    controller.index = function (req, res) {
        //console.log(req.user.username);
        res.render('index', { username: req.user.username });
    }
};

