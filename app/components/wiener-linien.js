"use strict";

angular.module("Vorlage").component("wienerLinien", {
    templateUrl: "components/wiener-linien.html",
    controller: "WienerLinienController",
    bindings: {
        rbls: "@",
        station: "@",
        reqEvent: "&"
    }
});


app.controller("WienerLinienController", function ($scope, $interval, $http) {
    this.$onInit = () => {
        if(this.rbls == null) {
            this.rblss = "";
        } else {
            this.rblss = "rbl=" + this.rbls.split(',').join('&rbl=');
        }

        this.updateData();
    };

    this.updateData = () => {
        $http({
            method: 'GET',
            url: 'http://www.wienerlinien.at/ogd_realtime/monitor?' + this.rblss + '&activateTrafficInfo=stoerungkurz&activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender=rdWGw7kFZ6gPCNsF',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.trains = [];
            response.data.data.monitors.forEach(x => {
                x.lines.forEach(y => {
                    y.departures.departure.forEach(z => {
                        var datePlanned = new Date(z.departureTime.timePlanned);
                        if(z.departureTime.timeReal != null) {
                            var dateReal = new Date(z.departureTime.timeReal);
                        } else {
                            var dateReal = datePlanned;
                        }

                        this.trains.push({
                            line: y.name,
                            destination: y.towards,
                            time: dateReal,
                            timeString: ("0" + dateReal.getHours()).substr(-2) + ":" + ("0" + dateReal.getMinutes()).substr(-2),
                            delay: z.departureTime.countdown,
                            trafficJam: y.trafficJam
                        });
                    });
                });
            });

            this.trains.sort((x,y) => {
                return x.time - y.time;
            });

            this.reqEvent({
                success: true,
                component: this
            });
        }, response => {
            this.reqEvent({
                success: false,
                component: this
            });
        });
    };

    $interval(this.updateData, 60000);
});