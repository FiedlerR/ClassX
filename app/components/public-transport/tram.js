"use strict";

app.component("tram", {
    templateUrl: "components/public-transport/tram.html",
    controller: "TramController",
    bindings: {
        rbl: "@"
    }
});


app.controller("TramController", function ($log,$scope,$http) {
    console.log(this.rbl);
        $http.get("https://www.wienerlinien.at/ogd_realtime/monitor?rbl=4915&activateTrafficInfo=stoerungkurz&" +
            "activateTrafficInfo=stoerunglang&activateTrafficInfo=aufzugsinfo&sender=rdWGw7kFZ6gPCNsF")
            .then(function(response) {
                $scope.data = response.data;
            }).then(function () {
            console.log($scope.data);
            $scope.station = $scope.data["data"]["monitors"]["0"]["locationStop"]["properties"]["title"];
            $scope.trains = [
                {
                    line: "71",
                    destination: "Oper",
                    time: "13:37",
                    delay: "+1",
                    trafficJam: false
                },
                {
                    line: "18",
                    destination: "Schlachthausgasse",
                    time: "13:39",
                    delay: "0",
                    trafficJam: true
                },
                {
                    line: "18",
                    destination: "Schlachthausgasse",
                    time: "13:41",
                    delay: "0",
                    trafficJam: false
                }
            ];
        });
    /*this.station = "Oberzellergasse";
    this.trains = [
        {
            line: "71",
            destination: "Oper",
            time: "13:37",
            delay: "+1",
            trafficJam: false
        },
        {
            line: "18",
            destination: "Schlachthausgasse",
            time: "13:39",
            delay: "0",
            trafficJam: true
        },
        {
            line: "18",
            destination: "Schlachthausgasse",
            time: "13:41",
            delay: "0",
            trafficJam: false
        }
    ];*/
});