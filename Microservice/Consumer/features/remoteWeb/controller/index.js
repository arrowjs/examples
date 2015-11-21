'use strict';
const actionheroClient = require("actionhero-client")
    , request = require('request');
module.exports = function (controller,component,application) {
    controller.remoteWeb = function (req,res) {
       request('http://localhost:8080/api/getRSS', function (error, response, body) {
           if (error) {
               if (!res.headersSent) {
                   res.render('remoteWeb', {error: error});
               }
           } else if (response.statusCode == 200) {
               res.render('remoteWeb', {data: JSON.parse(body)});
           }
       })
    };
};