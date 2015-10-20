'use strict';

var data = require('./list.json');
var Q = require('q');

module.exports = function getDummyData() {

    return Q(data.slice(-50));
    // return Q(data);

}
