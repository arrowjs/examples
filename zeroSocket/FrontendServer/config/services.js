"use strict";

module.exports = {
    services: {
        convertImage: {
            logging: true,
            protocol: "tcp",
            host: "127.0.0.1",
            port: "5555"
            //monitor: {
            //    interval: 100,
            //    numOfEvents: 0
            //}
        }
    }
};