"use strict";

angular.module("Vorlage").component("crypto", {
    templateUrl: "components/crypto.html",
    controller: "CryptoController",
    bindings: {
    }
});

app.controller("CryptoController", function ($scope, $interval) {

    $interval(this.refreshTime, 1000);
});