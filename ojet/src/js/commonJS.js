define([
    "knockout", "ojs/ojkeyset"
], function (ko, keyset) {
    class commonJS {
        constructor() {
            if (!commonJS.instance) {
                commonJS.instance = this;
            }
            return commonJS.instance;
        }

        checkValidationGroup = (track = "tracker") => {
            var tracker = document.getElementById(track);
            if (tracker.valid === "valid") {
                return true;
            } else {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
                return false;
            }
        };


        getNonEmptyOrNull = (input) => {
            const vals = Object.entries(input);
            const nonEmptyOrNull = vals.filter(([key, val]) => val !== undefined && val !== "" && val !== null);
            return Object.fromEntries(nonEmptyOrNull);
        };

        clearSelectedRow = () => {
            return { row: new keyset.KeySetImpl(), column: new keyset.KeySetImpl() };
        };
    }

    const instance = new commonJS();
    return instance;

});
