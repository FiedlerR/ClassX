"use strict";

angular.module("Vorlage").component("infobar", {
    templateUrl: "components/infobar.html",
    controller: "InfobarController",
    bindings: {
    }
});

app.controller("InfobarController", function ($scope, $interval) {
    this.refreshTime = () => {
        this.time = moment().format("HH:mm:ss");
    };

    this.$onInit = this.refreshTime;
    $interval(this.refreshTime, 1000);
});