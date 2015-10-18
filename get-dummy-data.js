'use strict';

var data = require('./list.json');
var Q = require('q');

module.exports = function getDummyData() {

    return Q.when(data.slice(-10));
    // return Q.when(data);

}
