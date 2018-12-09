"use strict";

angular.module("Vorlage").component("timeTable", {
    templateUrl: "components/time-table.html",
    controller: "TimeTableController",
    bindings: {
    }
});

app.controller("TimeTableController", function ($scope, $interval) {
    this.refreshTimeTable = () => {
        this.python.run("./app/api/api.py", null, (err, response) => {
            let res = JSON.parse(response[0]);
            this.currentLesson = res[0];
            this.nextLesson = res[1];
            this.currentLesson.end = new Date(this.currentLesson.end);
            this.currentLesson.start = new Date(this.currentLesson.start);
            console.log(res)
        });
    }

    this.$onInit = () => {
        this.python = require('python-shell').PythonShell;
        this.refreshTimeTable();
    }
    $interval(this.refreshTimeTable, 5000);
});