define([
    "knockout",
    "appController",
    "ojs/ojarraydataprovider",
    "ojs/ojresponsiveutils", 
    "ojs/ojresponsiveknockoututils",
    "ojs/ojnavigationlist", 
    "ojs/ojmodule",
    "ojs/ojtable",
    "ojs/ojpopup",
    "ojs/ojformlayout",
    "ojs/ojswitch",
    "oj-c/input-text",
], function(
    ko, 
    global, 
    ArrayDataProvider,
    ResponsiveUtils, 
    ResponsiveKnockoutUtils) {
    function CatalogosViewModel() {

        var self = this;

        // self.messages = global.messages;
        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.modulePath = ko.pureComputed(() => {
            return "catalogos/" + self.selectedItem();
        }, self);

        let mdQuery = ResponsiveUtils.getFrameworkQuery("md-up");
        if (mdQuery) {
            self.medium = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        }

        self.selectedItem = ko.observable("usuarios");

        const data = [
            { id: "usuarios", name: "Usuarios", icons: "oj-ux-ico-contact-group" },
            { id: "salas_ponencias", name: "Salas y Ponencias", icons: "oj-ux-ico-gavel" },
            { id: "dependencias_areas", name: "Dependencias y Áreas", icons: "oj-ux-ico-building" },
            { id: "estados_municipios", name: "Estados y Municipios", icons: "oj-ux-ico-backtomap" },
            { id: "procesos", name: "Procesos", icons: "oj-ux-ico-processes-alt" },
        ];

        // oj-ux-ico-warehouse
        // oj-ux-ico-unpublish
        // oj-ux-ico-sync

        self.dataProvider = new ArrayDataProvider(data, { keyAttributes: "id" });
        

        this.connected = () => {
            document.title = "Expedientes";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return CatalogosViewModel;
});
   