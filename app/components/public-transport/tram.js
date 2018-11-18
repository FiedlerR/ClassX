"use strict";

app.component("tram", {
    templateUrl: "components/public-transport/tram.html",
    controller: "TramController",
    bindings: {
        station: "@",
    }
});


app.controller("TramController", function ($log) {
    this.trains = [
        {
            line: "71",
            destination: "Oper",
            time: "13:37",
            delay: "+1"
        },
        {
            line: "18",
            destination: "Schlachthausgasse",
            time: "13:39",
            delay: "0"
        }
    ];
});