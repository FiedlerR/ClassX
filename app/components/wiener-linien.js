"use strict";

angular.module("Vorlage").component("wienerLinien", {
    templateUrl: "components/wiener-linien.html",
    controller: "WienerLinienController",
    bindings: {
        rbls: "@",
        station: "@",
        image: "@"
    }
});


app.controller("WienerLinienController", function ($scope, $interval, $http, ApiService) {
    this.lines = [];
    this.alreadySet = [];
    this.$onInit = () => {
        if(this.rbls == null) {
            this.rblss = "";
        } else {
            this.rblss = "rbl=" + this.rbls.split(',').join('&rbl=');
        }

        //this.updateData();
        ApiService.add("WienerLinienController_" + this.rbls, {
            method: 'GET',
            url: 'http://www.wienerlinien.at/ogd_realtime/monitor?' + this.rblss + '&activateTrafficInfo=stoerungkurz&activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender=rdWGw7kFZ6gPCNsF',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);
        ApiService.subscribe("WienerLinienController_" + this.rbls, this.updateData);
    };

    this.updateData = (response) => {
        this.trains = [];
        response.response.data.data.monitors.forEach(x => {
            x.lines.forEach(y => {
                if(y.type === 'ptMetro') {
                    y.towards = y.towards
                        .split(" ")
                        .map(wordPart => wordPart.charAt(0) + wordPart.toLowerCase().substr(1))
                        .join(" ");
                }
                y.departures.departure.forEach(z => {
                    var datePlanned = new Date(z.departureTime.timePlanned);
                    if(z.departureTime.timeReal != null) {
                        var dateReal = new Date(z.departureTime.timeReal);
                    } else {
                        var dateReal = datePlanned;
                    }

                    if(this.alreadySet.indexOf(y.name) === -1) {
                        this.alreadySet.push(y.name);
                        this.lines.push({
                            name: y.name,
                            symbolType: "images/"+y.type+".svg"
                        });
                    }

                    this.trains.push({
                        line: y.name,
                        destination: y.towards,
                        time: dateReal,
                        timeString: ("0" + dateReal.getHours()).substr(-2) + ":" + ("0" + dateReal.getMinutes()).substr(-2),
                        delay: z.departureTime.countdown,
                        trafficJam: y.trafficJam,
                        symbolType: "images/"+y.type+".svg"
                    });
                });
            });
        });

        this.trains.sort((x,y) =>  x.time - y.time);
    };

    $scope.$on('$destroy', () => {
        ApiService.unsubscribe("WienerLinienController_" + this.rbls);
    })
});