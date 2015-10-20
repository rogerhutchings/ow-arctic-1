'use strict';

var _ = require('lodash');
var http = require('http');
var Q = require('q');
var Panoptes = require('panoptes-client');
var xhrc = require('xmlhttprequest-cookie');

global.XMLHttpRequest = xhrc.XMLHttpRequest;
http.globalAgent.maxSockets = 20;

var client = new Panoptes({

    // Prod
    appID: '2b10a14e8f11eefb130a275f01898c8406600834bff1063bb1b7938795acc8a3',
    host: 'https://panoptes.zooniverse.org'

});

module.exports = uploadSets;

function _login() {
    return client.api.auth.signIn({
        login: process.env.PANOPTES_USERNAME,
        password: process.env.PANOPTES_PASSWORD
    });
}

function _logout() {
    return client.api.auth.signOut();
}

function uploadSets(data) {
    return _login()
        // .then(function () {
            // return data.reduce(function (promise, setData) {
            //     return promise.then(function (result) {
            //         return uploadSet(setData, result);
            //     });        
            // }, Q());
        // })
        .then(function () {
            console.log('Logged in!')
        }, function (error) {
            console.log('Failed to login, and here\'s why:', error);
        });
}

function _uploadSet(setData) {
    
    console.log('Uploading set \"' + setData.set.display_name + '\"...');
    
    var subjectIds = [];
    
    return setData.subjects.reduce(function (promise, subject) {
        return promise.then(function () {
            return _uploadSubject(subject)
                .then(function (newSubjectId) {
                    subjectIds.push(newSubjectId);
                }, function () {
                    console.error('Error creating subject');
                });
        });
    }, Q())
    .then(function () {
        setData.set.links.subjects = subjectIds;
        var newSet = client.api.type('subject_sets').create(setData.set)
        return newSet.save()
            .then(function (set) {
                return set;
            }, function (error) {
                console.log('Error creating set ' + newSet.display_name , error);
            });
    });
}

function uploadSubject(subject) {
    var newSubject = client.api.type('subjects').create(subject);
    return newSubject.save()
        .then(function () {
            return newSubject.id;
        }, function (error) {
            console.log('Error creating subject ' + newSet.display_name + ':', error);
        })
}
