"use strict";

angular.module("Vorlage").component("crypto", {
    templateUrl: "components/crypto.html",
    controller: "CryptoController",
    bindings: {
        currency: "@"
    }
});

app.controller("CryptoController", function ($scope, $interval) {

});