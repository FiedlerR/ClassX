angular.module('ClassX').service('KeyService', function() {
    var keys;
    var _readKeys = () => {
        let fs = require('fs');
        keys = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    };
    var _get = (key) => {
        if(!keys) {
            _readKeys();
        }

        if(key) {
            return keys[key];
        } else {
            return keys;
        }
    };

    return ({
        get: _get
    });
});
