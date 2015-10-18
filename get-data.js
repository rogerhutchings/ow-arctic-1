'use strict';

var _ = require('lodash');
var s3 = require('s3');
var Q = require('q');

module.exports = function getData() {

    var objects = [];
    var deferred = Q.defer();

    var client = s3.createClient({
        s3Options: {
            accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
            secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
            region: 'us-east-1'
        }
    });

    function getList(prefix) {

        console.log('Getting data from ' + prefix + '...');

        var deferred = Q.defer();
        var listData = [];

        var list = client.listObjects({
            s3Params: {
                Bucket: 'zooniverse-static',
                Prefix: prefix
            }
        });
        
        list.on('error', function (error) {
            deferred.reject(error);
        });
        
        list.on('data', function (data) {
            listData = listData.concat(data.Contents);
        });
        
        list.on('end', function () {
            deferred.resolve(listData);
        });

        return deferred.promise;

    }

    return Q.all([
        getList('old-weather-2015/The_Arctic_Frontier/Navy/'),
        getList('old-weather-2015/The_Arctic_Frontier/Coast_Geodetic_Survey/')
    ]).then(function (results) {
        return results.reduce(function (a, b) {
            return a.concat(b);
        }, []);
    });

}
