angular.module('ClassX').service('ApiService', [ "$interval", "$http", function($interval, $http) {
    /*
    * Object Structure:
    *   request: Request HTTP Object
    *   response: Last sucessful response
    *   timestamp: Time of last successful response
    *   promise: promise of interval object
    *   callback: (optional) callback function after success response
    *   lastRunPass: if last run passed
    */
    var _requests = {};
    var lastRunFail = false;

    var _updateData = (req) => {
        req.lastRunPass = true;
        $http(req.request).then(response => {
            req.response = response;
            req.timestamp = new Date();
            if(req.callback) {
                req.callback(req);
            }
        }, response => {
            req.lastRunPass = false;
        });
    };

    var _add = (name, httpObject, interval, callback) => {
        if(_requests[name]) {
            return;
        } else {
            _requests[name] = {};
        }

        _requests[name].request = httpObject;
        _requests[name].response = null;
        _requests[name].timestamp = null;
        _requests[name].lastRunPass = true;
        if(callback) {
            _requests[name].callback = callback;
        }
        _requests[name].promise = $interval(_updateData, interval, 0, true, _requests[name]);
        _updateData(_requests[name]);
    };

    var _remove = (name) => {
        if(!_requests[name]) {
            return;
        }

        $interval.cancel(_requests[name].promise);
        delete _requests[name];
    };

    var _get = (name) => {
        if(!_requests[name]) {
            throw "Specified name not found!";
        }

        return _requests[name];
    };

    var _errorEncountered = () => {
        return Object.values(_requests).some((x) => {
            return !(x.lastRunPass);
        });
    };

    var _subscribe = (name, callback) => {
        if(!_requests[name]) {
            throw "Specified name not found!";
        }

        _requests[name].callback = callback;

        if(_requests[name].response) {
            callback(_requests[name]);
        }
    };

    var _unsubscribe = (name) => {
        if(!_requests[name]) {
            throw "Specified name not found!";
        }

        _requests[name].callback = null;
    };

    return ({
        add: _add,
        remove: _remove,
        get: _get,
        errorEncountered: _errorEncountered,
        subscribe: _subscribe,
        unsubscribe: _unsubscribe
    });
}]);
