"use strict";

angular.module("ClassX").component("crypto", {
    templateUrl: "components/crypto.html",
    controller: "CryptoController",
    bindings: {
    }
});

app.controller("CryptoController", ["$scope", "ApiService","KeyService", function ($scope, ApiService,KeyService) {
    this.$onInit = () => {
        let accessKey = KeyService.get("CryptoCompare");
        ApiService.add("CryptoController_BTC", {
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=EUR&api_key='+accessKey,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_ETH", {
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=EUR&api_key='+accessKey,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_XRP", {
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XRP&tsyms=EUR&api_key='+accessKey,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);

        ApiService.add("CryptoController_XMR", {
            method: 'GET',
            url: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XMR&tsyms=EUR&api_key='+accessKey,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }, 60000);
        ApiService.subscribe("CryptoController_BTC", this.updateData_btc);
        ApiService.subscribe("CryptoController_ETH", this.updateData_eth);
        ApiService.subscribe("CryptoController_XRP", this.updateData_xrp);
        ApiService.subscribe("CryptoController_XMR", this.updateData_bch);
    };

    $scope.$on('$destroy', () => {
        ApiService.unsubscribe("CryptoController_BTC");
        ApiService.unsubscribe("CryptoController_ETH");
        ApiService.unsubscribe("CryptoController_XRP");
        ApiService.unsubscribe("CryptoController_XMR");
    });


    this.updateData_btc = (response) => {
        console.log(response.response.data.RAW.BTC.EUR.CHANGEPCTDAY);
        this.btc = {
            price: (Math.round(response.response.data.RAW.BTC.EUR.PRICE * 100) / 100) + '€',
            volume: Math.round(response.response.data.RAW.BTC.EUR.VOLUMEDAY * 100) / 100,
            change: Math.round(response.response.data.RAW.BTC.EUR.CHANGEPCTDAY * 100) / 100,
            market: "Mkt. Cap.",
            marketPrice: Math.round(response.response.data.RAW.BTC.EUR.MKTCAP * 100) / 100
        };
    };

    this.updateData_eth = (response) => {
        this.eth = {
            price: (Math.round(response.response.data.RAW.ETH.EUR.PRICE * 100) / 100) + '€',
            volume: Math.round(response.response.data.RAW.ETH.EUR.VOLUMEDAY * 100) / 100,
            change: Math.round(response.response.data.RAW.ETH.EUR.CHANGEPCTDAY * 100) / 100,
            market: "Mkt. Cap.",
            marketPrice: Math.round(response.response.data.RAW.ETH.EUR.MKTCAP * 100) / 100
        };
    };

    this.updateData_xrp = (response) => {
        this.xrp = {
            price: (Math.round(response.response.data.RAW.XRP.EUR.PRICE * 100) / 100) + '€',
            volume: Math.round(response.response.data.RAW.XRP.EUR.VOLUMEDAY * 100) / 100,
            change: Math.round(response.response.data.RAW.XRP.EUR.CHANGEPCTDAY * 100) / 100,
            market: "Mkt. Cap.",
            marketPrice: Math.round(response.response.data.RAW.XRP.EUR.MKTCAP * 100) / 100
        };
    };

    this.updateData_bch = (response) => {
        this.bch = {
            price: (Math.round(response.response.data.RAW.XMR.EUR.PRICE * 100) / 100) + '€',
            volume: Math.round(response.response.data.RAW.XMR.EUR.VOLUMEDAY * 100) / 100,
            change: Math.round(response.response.data.RAW.XMR.EUR.CHANGEPCTDAY * 100) / 100,
            market: "Mkt. Cap.",
            marketPrice: Math.round(response.response.data.RAW.XMR.EUR.MKTCAP * 100) / 100
        };
    };
}]);
