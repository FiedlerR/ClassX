"use strict";

describe("Vorlage", function() {

    // Wird _vor_ jedem it() ausgeführt
    beforeEach(() => {
        // An den jeweiligen Modulnamen anpassen 
        // (gibt an, welches Modul getestet wird)
        module("Vorlage");
    });

    
    it("ist testbar mit Karma/Jasmine", function() {
        expect(true).toEqual(true);
    });

});
