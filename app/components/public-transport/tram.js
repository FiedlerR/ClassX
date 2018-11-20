"use strict";

app.component("tram", {
    templateUrl: "components/public-transport/tram.html",
    controller: "TramController",
    bindings: {
        rbl: "@"
    }
});


app.controller("TramController", function ($log) {
    this.station = "Oberzellergasse";
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
    ];
});