"use strict";

describe("Vorlage", function() {

    beforeAll(function() {
        browser.get("angularjs-vorlage/app/index.html");
    });


    it("wird geladen", function() {
        expect(browser.getTitle()).toEqual("Vorlage");
    });


    it("hat die richtige Überschrift", function() {
        expect(element(by.tagName("h1")).getText()).toContain("AngularJS Material-Projekt");
    });

});
