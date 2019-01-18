"use strict";
window.addEventListener("keydown", event => {
    event.preventDefault();
});
// Security measure for not opening the developer console
const electron = require('electron');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const keyArg = electron.remote.process.argv.filter(x => x.includes("--keyFile"));
const keyPath = path.resolve(keyArg[0].split("=")[1]);

const pythonArg = electron.remote.process.argv.filter(x => x.includes("--untis"));
const pythonPath = path.resolve(pythonArg[0].split("=")[1]);

// Einziges Modul dieser App und seine Abhängigkeiten
var app = angular.module("ClassX", [ "ngResource", "ngMessages", "ngLocale", "ngSanitize","ngRoute",
    "ngAnimate", "ngMaterial", "ui.router" ]);


// Einstellungen für Debugging
app.config(["$logProvider", "$compileProvider", "$mdAriaProvider", "$qProvider", "$httpProvider", function($logProvider, $compileProvider, $mdAriaProvider, $qProvider, $httpProvider) {
    $logProvider.debugEnabled(true);
    $compileProvider.debugInfoEnabled(true);
    $mdAriaProvider.disableWarnings();
    $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.defaults.useXDomain = true;
}]);

var index = 0;
let interval;
app.config(["$routeProvider", function($routeProvider) {
    rotatePage();
    const handler = throttled(500, event => {
        event.preventDefault();
        rotatePage();
        clearInterval(interval);
        interval = setInterval(rotatePage, 10000);
    });
    window.addEventListener("keydown", handler);

    $routeProvider.when("/id0", {
        templateUrl : "index0.html"
    }).when("/id1", {
        templateUrl : "index1.html"
    }).when("/id2", {
        templateUrl : "index2.html"
    }).when("/id3", {
        templateUrl : "index3.html"
    }).when("/id4", {
        templateUrl : "index4.html"
    }).when("/id5", {
        templateUrl : "index5.html"
    });
}]);

interval = setInterval(rotatePage, 10000);
function rotatePage() {
    window.location.href = "#!id" + index;
    if (index < 5) {
        index++;
    } else {
        index = 0;
    }
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

// Thema einstellen, mögliche Paletten sind:
// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
// light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
app.config(["$mdThemingProvider", function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("pink")
        .accentPalette("deep-orange");
}]);

// Datepicker auf AngularJS-Gebietsschema einstellen
app.config(["$localeProvider", "$mdDateLocaleProvider", function($localeProvider, $mdDateLocaleProvider) {
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
}]);

particlesJS.load('body', "config/particles.json");