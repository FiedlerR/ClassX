"use strict";

angular.module("ClassX").component("timeTable", {
    templateUrl: "components/time-table.html",
    controller: "TimeTableController",
    bindings: {
    }
});

app.controller("TimeTableController", ["$scope", "PythonApiService", function ($scope, PythonApiService) {
    this.updateData = (response) => {
        console.log(response);
        let res = JSON.parse(response.response[0]);
        this.currentLesson = res[0];
        this.nextLesson = res[1];
        this.currentLesson.end = new Date(this.currentLesson.end);
        this.currentLesson.start = new Date(this.currentLesson.start);
    };

    this.$onInit = () => {
        PythonApiService.add("TimeTableController", "./app/api/api.py", null, 60000);
        PythonApiService.subscribe("TimeTableController", this.updateData);
    };

    $scope.$on('$destroy', () => {
        PythonApiService.unsubscribe("TimeTableController");
    });
}]);
