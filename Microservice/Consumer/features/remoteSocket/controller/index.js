'use strict';
const actionheroClient = require("actionhero-client");

module.exports = function (controller,component,application) {
    controller.remoteCall = function (req,res) {
        const client = new actionheroClient();

        client.on("error", function(err, data) {
            console.log(err);
            if (!res.headersSent) {
                res.render('remote', {error: err});
            }
         });

        client.on("end", function(){
           console.log("Connection Ended");
        });

        client.on("timeout", function(err, request, caller){
            console.log(request + " timed out");
        });

        client.on("connected", function() {
            // get details about myself
            //console.log(client.details);

            // try an action
            client.action("getRSS", function(err, data, dur){
                let service = {remoteIP: client.details.remoteIP, remotePort: client.details.remotePort};
                res.render('remote',
                    {
                        error: null,
                        service: service,
                        data: data
                    });
            });


            // leave
            setTimeout(function(){
                client.disconnect(function(){
                    console.log("all done!");
                });
            }, 100);

        });

        client.connect({
            host: "127.0.0.1",
            port: "5000",
            reconnectAttempts: 6
        });

    };
};