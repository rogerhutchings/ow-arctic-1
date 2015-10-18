'use strict';

module.exports = filterData;

function filterData(data) {

    var filenames = data.map(function (object) {
        return getFilenameFromObject(object);
    });

    return data.filter(function (object) {
        
        var file = getFilenameFromObject(object);
        var suffix = file.substr(-2);
        
        // If it's a split page or a single-page subject, return the object. 
        // Otherwise, filter it out as it isn't a valid subject.
        if (suffix === '-0' || suffix === '-1') {
            return true;
        } else if (isSinglePageSubject(file, filenames)) {
            return true;
        } else {
            return false;
        }
        
    });
}

// Return the filename only, no path or extension.
function getFilenameFromObject(object) {
    return object.Key.split('/').pop().replace(/\.[^/.]+$/, '');
}

// Double pages are split into two files, with the -0 and -1 suffixes. If an
// object with a suffixed key doesn't exist, it's a single page.
function isSinglePageSubject(file, filenames) {
    return (filenames.indexOf(file + '-0') === -1) ? true : false;
}
