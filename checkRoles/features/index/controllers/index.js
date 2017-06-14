'use strict';

module.exports = function (controller,component,application) {
    controller.index = function (req, res) {
        res.render('index');
    };
    controller.about = function (req,res) {
        res.render('about');
    };
    controller.post = function (req,res) {
        res.render('post');
    };
    controller.role = function (req,res) {
        //console.log(req.session.permissions);
        res.render('role');
    };
    controller.rolePost = function (req,res) {

        req.session.permissions = {
            features : {
                index :  [{
                    name : "index"
                },{
                    name : "about"
                },{
                    name : "post"
                }]
            }
        }
        //console.log(component);
        //console.log(controller);
        //console.log(req.session.permissions.features.index);
        req.flash.success("Change role successfully");
        res.render('role');
    };
};