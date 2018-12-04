"use strict";
const python = require('python-shell').PythonShell
python.run('api/webuntis.py', null, (err, results) => {
    console.log(results);
})

const electron = require('electron');
if(electron.remote.process.argv.includes("--live")) {
    const mainWindow = electron.remote.getCurrentWindow();
    mainWindow.setFullScreen(true);
    mainWindow.setMenu(null);
}

// Einziges Modul dieser App und seine Abhängigkeiten
var app = angular.module("Vorlage", [ "ngResource", "ngMessages", "ngLocale", "ngSanitize","ngRoute",
    "ngAnimate", "ngMaterial", "ui.router" ]);


// Einstellungen für Debugging
app.config(function($logProvider, $compileProvider, $mdAriaProvider, $qProvider, $httpProvider) {
    $logProvider.debugEnabled(true);
    $compileProvider.debugInfoEnabled(true);
    $mdAriaProvider.disableWarnings();
    $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.defaults.useXDomain = true;
});


readKeys();
function readKeys() {
    var fs = require('fs');
    var contents = fs.readFileSync('config/.keys', 'utf8');
    console.log(contents);
    return contents;
}



//
var index = 0;
let interval;
app.config(function($routeProvider) {
    const handler = throttled(4000, (event) => {
        rotatePage();
        clearInterval(interval);
        interval = setInterval(rotatePage, 5000);
    });
    document.addEventListener("keydown", handler);


    $routeProvider
        .when("/id0", {
            templateUrl : "index0.html"
        }).when("/id1", {
        templateUrl : "index1.html"
    }).when("/id2", {
        templateUrl : "index2.html"
    });
});
interval = setInterval(rotatePage, 5000);
function rotatePage() {
    window.location.href="#!id"+index; if(index < 2){index++}else{index = 0;}
}
// Debounced Function
function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
        const now = (new Date).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    }
}

app.controller('cryptoController', function($scope, $http) {
    $http.get("https://api.cryptonator.com/api/full/btc-eur")
        .then(function(response) {
            $scope.bitcoin = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/ETH-eur")
        .then(function(response) {
            $scope.ethereum = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/xrp-eur")
        .then(function(response) {
            $scope.ripple = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/BCH-eur")
        .then(function(response) {
            $scope.bitcoinCash = response.data;
        });
});




//
app.controller('wienerLinienController', function($scope, $http) {
    $http.get("https://www.wienerlinien.at/ogd_realtime/monitor?rbl=4915&rbl=4902&activateTrafficInfo=stoerungkurz&" +
        "activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender=rdWGw7kFZ6gPCNsF")
        .then(function(response) {
            $scope.metro = response.data;
        });
    $http.get("http://www.wienerlinien.at/ogd_realtime/monitor?rbl=2044&rbl=2015&rbl=293&rbl=284&activateTrafficInfo=stoerungkurz&" +
        "activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender=rdWGw7kFZ6gPCNsF")
        .then(function(response) {
            $scope.tram = response.data;
        });
});

// Thema einstellen, mögliche Paletten sind:
// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
// light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("pink")
        .accentPalette("deep-orange");
});


// Datepicker auf AngularJS-Gebietsschema einstellen
app.config(function($localeProvider, $mdDateLocaleProvider) {
    var locale = $localeProvider.$get();

    moment.locale(locale.id);

    $mdDateLocaleProvider.months = moment.months();
    $mdDateLocaleProvider.shortMonths = moment.monthsShort();
    $mdDateLocaleProvider.days = moment.weekdays();
    $mdDateLocaleProvider.shortDays = moment.weekdaysShort();
    $mdDateLocaleProvider.firstDayOfWeek = locale.DATETIME_FORMATS.FIRSTDAYOFWEEK;

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, "L", locale.id);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function(date) {
        var m = moment(date);
        return m.isValid() ? m.format("L") : "";
    };

    $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
        return `${moment.monthsShort()[date.getMonth()]}  ${date.getFullYear()}`;
    };

    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
        return `Woche ${weekNumber}`;
    };

    $mdDateLocaleProvider.msgCalendar = "Kalender";
    $mdDateLocaleProvider.msgOpenCalendar = "Kalender öffnen";
});
