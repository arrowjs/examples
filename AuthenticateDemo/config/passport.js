'use strict';
/**
 * Module init function.
 */
module.exports = function (passport, application) {
    return {
        serializeUser: function (user, done) {
            done(null, user.id);
        },
        deserializeUser: function (id, done) {
            application.models.user.findById(id).then(function (user) {
                done(null,user);
            }).catch(function (err) {
                done(err)
            });
        },
        checkAuthenticate : function (req,res,next) {
            console.log('Go to checkAuthenticate');
            if(req.isAuthenticated()){
                return next();
            } else {
                res.redirect('/login');
            }
        },
        handlePermission : function (permission,req,res,next) {
            console.log('Go to handlePermission');
            if(permission) {
              return  next()
            }
            req.flash.error("You do not have permission to access");
            res.redirect('/');
        },
        local1: {
            strategy : 'local',
            option: {
                successRedirect: '/',
                failureRedirect: '/login', 
                failureFlash: true // allow flash messages

            }
        },
        'facebook1': {
            strategy : 'facebook',
            option: {
                successRedirect: '/',
                failureRedirect: 'users/login'
            }
        }
    }

};