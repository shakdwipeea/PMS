var vendors = require('../controller/vendors'),
    slots = require('../controller/slots'),
    async = require('async');

exports.random = function () {
    return Math.floor((1 + Math.random()) * 500020);
};

exports.myRandomNumber = function () {
    return Math.floor((1 + Math.random()) * 500020);
};


