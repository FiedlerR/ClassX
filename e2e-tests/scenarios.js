"use strict";

describe("ClassX", function() {

    beforeAll(function() {
        browser.get("angularjs-classx/app/index.html");
    });


    it("wird geladen", function() {
        expect(browser.getTitle()).toEqual("ClassX");
    });


    it("hat die richtige Überschrift", function() {
        expect(element(by.tagName("h1")).getText()).toContain("AngularJS Material-Projekt");
    });

});
