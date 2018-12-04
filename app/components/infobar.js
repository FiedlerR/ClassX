"use strict";

angular.module("Vorlage").component("infobar", {
    templateUrl: "components/infobar.html",
    controller: "InfobarController",
    bindings: {
        displayError: "<"
    }
});

app.controller("InfobarController", function ($scope, $interval) {
    this.refreshTime = () => {
        this.time = moment().format("HH:mm:ss");

        this.wifi.getCurrentConnections((err, currentConnections) => {
            if(err) {
                this.level = 0;
            } else {
                let signal = currentConnections[0].signal_level;
                if(signal >= -50) {
                    this.level = 4;
                } else if (signal < -50 && signal >= -60) {
                    this.level = 3;
                } else if (signal < -60 && signal >= -70) {
                    this.level = 2;
                } else if (signal < -70) {
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
    }
    $interval(this.refreshTime, 1000);
});