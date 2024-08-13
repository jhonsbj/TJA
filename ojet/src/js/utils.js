define([
    "knockout", "ojs/ojkeyset"
], function (ko, keyset) {
    class Utils {
        constructor() {
            if (!Utils.instance) {
                Utils.instance = this;
            }
            return Utils.instance;
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

        dialog = (id) => {
            let element = document.getElementById(id);
            if (element) {
                if (element.isOpen()) {
                    element.close();
                } else {
                    element.open();
                }
            }
        };
    }

    const instance = new Utils();
    return instance;

});
