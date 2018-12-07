"use strict";

angular.module("Vorlage").component("crypto", {
    templateUrl: "components/crypto.html",
    controller: "CryptoController",
    bindings: {
    }
});

app.controller("CryptoController", function ($scope, $interval, ApiService) {
    this.$onInit = () => {
        ApiService.add("CryptoController_BTC", {
            method: 'GET',
            url: 'https://api.cryptonator.com/api/full/btc-eur',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_ETH", {
            method: 'GET',
            url: 'https://api.cryptonator.com/api/full/ETH-eur',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_XRP", {
            method: 'GET',
            url: 'https://api.cryptonator.com/api/full/xrp-eur',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_BCH", {
            method: 'GET',
            url: 'https://api.cryptonator.com/api/full/BCH-eur',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.subscribe("CryptoController_BTC", this.updateData_btc);
        ApiService.subscribe("CryptoController_ETH", this.updateData_eth);
        ApiService.subscribe("CryptoController_XRP", this.updateData_xrp);
        ApiService.subscribe("CryptoController_BCH", this.updateData_bch);
    };

    $scope.$on('$destroy', () => {
        ApiService.unsubscribe("CryptoController_BTC");
        ApiService.unsubscribe("CryptoController_ETH");
        ApiService.unsubscribe("CryptoController_XRP");
        ApiService.unsubscribe("CryptoController_BCH");
    });

    this.updateData_btc = (response) => {
        this.btc = {
            price: (Math.round(response.response.data.ticker.price * 100) / 100) + '€',
            volume: Math.round(response.response.data.ticker.volume * 100) / 100,
            change: Math.round(response.response.data.ticker.change * 10000) / 100
        };
    };

    this.updateData_eth = (response) => {
        this.eth = {
            price: (Math.round(response.response.data.ticker.price * 100) / 100) + '€',
            volume: Math.round(response.response.data.ticker.volume),
            change: Math.round(response.response.data.ticker.change * 10000) / 100
        };
    };

    this.updateData_xrp = (response) => {
        this.xrp = {
            price: (Math.round(response.response.data.ticker.price * 100) / 100) + '€',
            volume: Math.round(response.response.data.ticker.volume),
            change: Math.round(response.response.data.ticker.change * 10000) / 100
        };
    };

    this.updateData_bch = (response) => {
        this.bch = {
            price: (Math.round(response.response.data.ticker.price * 100) / 100) + '€',
            volume: Math.round(response.response.data.ticker.volume),
            change: Math.round(response.response.data.ticker.change * 10000) / 100
        };
    };
});