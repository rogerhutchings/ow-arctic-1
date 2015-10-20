'use strict';

module.exports = createSubjects;

function createSubjects(data) {

    return data.map(function (object) {
        var split = splitKey(object);
        return {
            metadata: {
                theme: split.path[1],
                group: split.path[2],
                vessel: split.path[3],
                year: getYear(split)
            },
            links: {
                project: '195'
            },
            locations: [
                'http://zooniverse-static.s3.amazonaws.com/' + object.Key
            ]
        }
    });

}

function splitKey(object) {
    var key = object.Key;
    return {
        filename: key.split('/').pop().replace(/\.[^/.]+$/, ''),
        path: key.split('/').slice(0, -1),
        extension: key.split('.').pop()
    };
}

// From split[4], remove the vessel name and '-split' to get the year(s).
function getYear(split) {
    return split.path[4].substr(split.path[3].length + 1).slice(0, -6);
}
