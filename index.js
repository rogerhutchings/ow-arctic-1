'use strict';

var fs = require('fs')

var getData = require('./get-data');
var getDummyData = require('./get-dummy-data');
var filterData = require('./filter-data');

// return getData()
return getDummyData()
    .then(filterData)
    .then(function (data) {
        console.log(data);
    }, function (error) {
        console.log('Error: ' + error);
    });

    // .catch(function (error) {
    //     console.log('Error getting data:', error.message);
    //     process.exit(1);
    // })
    // .then(function (data) {
    //     console.log(data)
    // });
