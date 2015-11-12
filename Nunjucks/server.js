'use strict';
const Arrow = require('arrowjs');

const application = new Arrow();
application._config.port = 9000;
application.start();