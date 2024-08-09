define([
    "interface/catalogos/Usuario",
    "knockout",
    "appController",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojcollapsible",
    "oj-c/input-text",
    "oj-c/button",
], function(
    Usuario,
    ko, 
    global,
    mapping,
    ArrayDataProvider) {
    function ProcesosViewModel() {

        var self = this;

        // self.messages = global.messages;
        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.usuario = mapping.fromJS(Usuario.values);
        self.label = mapping.fromJS(Usuario.labels);
        self.filtros = mapping.fromJS(Usuario.filtros);

        self.columns = [
            { headerText: "Clave", field: "institucion" },
            { headerText: "Nombre", field: "institucion" },
            { headerText: "Estatus", field: "institucion" },
        ];

        self.popSearchAdv = () => {
            document.getElementById("pop-searchAdv").open();
        };

        self.onCancelPopSearchAdv = () => {
            document.getElementById("pop-searchAdv").close();
        };

        this.connected = () => {
            document.title = "Catálogo - Usuarios";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return ProcesosViewModel;
});
   