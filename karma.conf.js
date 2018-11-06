// Karma-Konfiguration für Unit-Tests

module.exports = function (config) {
    var locale = "de";

    config.set({

        // Basisverzeichnis relativ zu dieser Datei für "files:", "exclude:"
        basePath: "app",

        // Testframeworks
        frameworks: ["jasmine"],

        // Diese Dateien in den Browser laden
        files: [
            // AngularJS und Libraries
            "vendor/jquery-*/jquery.min.js",
            "vendor/angularjs-*/angular.min.js",
            "vendor/angularjs-*/angular-*.min.js",
            "vendor/angularjs-*/i18n/angular-locale_" + locale + ".js",
            "vendor/angularjs-*/angular-mocks.js",
            "vendor/angular-material-*/angular-material.min.js",
            "vendor/angular-ui-router-*/angular-ui-router.min.js",
            "vendor/moment.js-*/moment.min.js",
            "vendor/moment.js-*/locale/" + locale + ".js",

            // App-Code
            "app*.js",
            "*(services|components|models|filters)/**/*.js"
        ],

        // Diese Dateien _nicht_ in den Browser laden
        exclude: [],

        // Dateien vorbereiten, bevor sie in den Browser geladen werden
        preprocessors: {},

        // Spec-Runner Testprotokolle auf der Konsole und im Browser zeigen
        reporters: ["spec", "kjhtml"],

        // Webserver-Port
        port: 9876,

        // Farbige Fortschrittsanzeigen und Protokolle
        colors: true,

        // Spec-Runner Testprotokolle im Browser zeigen
        client: {
            clearContext: false
        },

        // Protokoll-Detail
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // true: Tests wiederholen, sobald sich eine Datei ändert
        autoWatch: true,

        // Diese Browser starten (in WebStorm Run-Konfiguration überschreibbar)
        browsers: ["Chrome"],

        // true: nur einzelne Tests ausführen ("autoWatch:" wird ignoriert)
        singleRun: false,

        // Limit für parallel zu startende Browser
        concurrency: Infinity
    })
}
