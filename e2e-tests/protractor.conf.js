// Protractor-Konfiguration für E2E-Tests
let SpecReporter = require("jasmine-spec-reporter").SpecReporter;

exports.config = {

    // Adresse des WebStorm-Testservers (File|Settings|Build, Execution, Deployment|Debugging)
    baseUrl: "http://localhost:63342/",

    // Testskripts, relativ zu dieser Datei
    specs: [
        "*.js"
    ],

    // Timeout für Laden der Seite (in ms)
    getPageTimeout: 5000,

    // Timeout pro Testskript (in ms)
    allScriptsTimeout: 10000,

    // In Chrome testen
    capabilities: {
        "browserName": "chrome"
    },

    // Ohne Umweg über Selenium-Server zum Browser verbinden
    directConnect: true,

    // Jasmine-Testframework verwenden
    framework: "jasmine",

    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
        print: function() {}
    }

};
