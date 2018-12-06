"use strict";
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
    var contents = fs.readFileSync("./app/config/.keys", 'utf8');
    console.log(contents);
    return contents;
}



//
var index = 0;
let interval;
app.config(function($routeProvider) {
    const handler = throttled(1000, (event) => {
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
    }).when("/id3", {
        templateUrl : "index3.html"
    }).when("/id4", {
        templateUrl : "index4.html"
    });
});

interval = setInterval(rotatePage, 5000);
function rotatePage() {
    window.location.href="#!id"+index; if(index < 4){index++}else{index = 0;}
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
