angular.module('ClassX').service('StateService', function(){
    var _states = {};

    var _save = function(name, scope, fields) {
        if(!_states[name])
            _states[name] = {};
        for(var i=0; i<fields.length; i++){
            _states[name][fields[i]] = scope[fields[i]];
        }
    }

    var _load = function(name, scope, fields){
        if(!_states[name])
            return scope;
        for(var i=0; i<fields.length; i++){
            if(typeof _states[name][fields[i]] !== 'undefined')
                scope[fields[i]] = _states[name][fields[i]];
        }
        return scope;
    }

    // ===== Return exposed functions ===== //
    return({
        save: _save,
        load: _load
    });
});
