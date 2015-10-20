'use strict';

var _ = require('lodash');

module.exports = groupSubjects;

function groupSubjects(data) {

    return _.chain(data)
        .groupBy(function (object) {
            return object.metadata.vessel + '-' + object.metadata.year;
        })
        .map(function (subjects) {
            var sample = subjects[0].metadata;
            return {
                set: {
                    display_name: [sample.vessel, sample.year].join(' '),
                    metadata: sample,
                    links: {
                        project: '1253',
                        workflows: ['886']
                    }
                },
                subjects: subjects.map(function (subject) {
                    subject.links = {
                        project: '1253'
                    };
                    return subject;
                })
            };
        })
        .value();

}
