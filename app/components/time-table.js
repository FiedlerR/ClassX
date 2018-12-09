"use strict";

angular.module("Vorlage").component("timeTable", {
    templateUrl: "components/time-table.html",
    controller: "TimeTableController",
    bindings: {
    }
});

app.controller("TimeTableController", function ($scope, $interval) {
    this.refreshTimeTable = () => {
        this.python.run("./app/api/api.py", {
            pythonPath: "/usr/bin/python3"
        }, (err, response) => {
            this.lessonArray = JSON.parse(response[0]);
        });
    }

    this.$onInit = () => {
        this.python = require('python-shell').PythonShell;
        this.refreshTimeTable();
    }
    $interval(this.refreshTimeTable, 5000);
});