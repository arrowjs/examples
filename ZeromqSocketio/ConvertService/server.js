'use strict';
const Arrow = require('arrowjs');
const arrowZmq = require('arrow-zeromq');

const application = new Arrow();
application.addPlugin(arrowZmq());
application.start();