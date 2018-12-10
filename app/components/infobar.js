"use strict";

angular.module("ClassX").component("infobar", {
    templateUrl: "components/infobar.html",
    controller: "InfobarController",
    bindings: {
    }
});

app.controller("InfobarController", ["$scope", "$interval", "ApiService", function ($scope, $interval, ApiService) {
    this.errorEncountered = false;

    this.refreshTime = () => {
        this.time = moment().format("HH:mm:ss");

        this.errorEncountered = ApiService.errorEncountered();
    };

    this.refreshWifi = () => {
        this.wifi.getCurrentConnections((err, currentConnections) => {
            if(currentConnections == false) {
                this.level = 0;
            } else {
                let signal = currentConnections[0].signal_level;
                if(signal >= -60) {
                    this.level = 4;
                } else if (signal < -60 && signal >= -70) {
                    this.level = 3;
                } else if (signal < -70 && signal >= -80) {
                    this.level = 2;
                } else if (signal < -90) {
                    this.level = 1;
                }
            }
        });
    };

    this.$onInit = () => {
        this.wifi = require('node-wifi');
        this.wifi.init({
            iface: null
        });
        this.level = 0;
        this.refreshTime();
        this.refreshWifi();
    };

    $interval(this.refreshTime, 1000);
    $interval(this.refreshWifi, 10000);
}]);