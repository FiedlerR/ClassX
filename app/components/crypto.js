"use strict";

angular.module("Vorlage").component("crypto", {
    templateUrl: "components/crypto.html",
    controller: "CryptoController",
    bindings: {
        currency: "@"
    }
});

app.controller("CryptoController", function ($scope, $interval) {
    $http.get("https://api.cryptonator.com/api/full/btc-eur")
        .then(function(response) {
            $scope.bitcoin = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/ETH-eur")
        .then(function(response) {
            $scope.ethereum = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/xrp-eur")
        .then(function(response) {
            $scope.ripple = response.data;
        });
    $http.get("https://api.cryptonator.com/api/full/BCH-eur")
        .then(function(response) {
            $scope.bitcoinCash = response.data;
        });
});