"use strict";

describe("ClassX", function() {

    // Wird _vor_ jedem it() ausgeführt
    beforeEach(() => {
        // An den jeweiligen Modulnamen anpassen 
        // (gibt an, welches Modul getestet wird)
        module("ClassX");
    });

    
    it("ist testbar mit Karma/Jasmine", function() {
        expect(true).toEqual(true);
    });

});
