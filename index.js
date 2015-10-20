'use strict';

var fs = require('fs')

var getData = require('./get-data');
var getDummyData = require('./get-dummy-data');
var filterData = require('./filter-data');
var createSubjects = require('./create-subjects');
var groupSubjects = require('./group-subjects');
var upload = require('./upload');

// return getData()
return getDummyData()
    .then(filterData)
    .then(createSubjects)
    .then(groupSubjects)
    .then(upload)
    // .then(function (data) {
    //     console.log(data);
    //     process.exit(0);
    // }, function (error) {
    //     console.log('Error: ' + error);
    // });

    // .catch(function (error) {
    //     console.log('Error getting data:', error.message);
    //     process.exit(1);
    // })
    // .then(function (data) {
    //     console.log(data)
    // });
