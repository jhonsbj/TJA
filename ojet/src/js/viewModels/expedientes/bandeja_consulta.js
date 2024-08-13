define([
    "knockout",
    "appController",
    "sweetAlert",
    "commonJS",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojtable",
    "ojs/ojpopup",
    "ojs/ojformlayout",
    "ojs/ojlabelvalue",
    "oj-c/input-text",
    "oj-c/select-single",
    "oj-c/button",
    "oj-c/text-area",
    "ojs/ojdatetimepicker",
    "ojs/ojswitch",

], function(
    ko, 
    global, 
    Sweet,
    commonJS,
    mapping,
    ArrayDataProvider) {
    function BandejaConsultaExpViewModel() {

        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.columns = [
            { headerText: "N° Expediente", field: "numero_expediente" },
            { headerText: "Tipo", field: "tipo_proceso" },
            { headerText: "Fecha", field: "fecha" }, 
            {
                frozenEdge: "end",
                className: "oj-helper-text-align-center oj-sm-padding-0-vertical",
                template: "actionTemplate",
                id: "action",
            },
        ];

        self.expedientes = [
            {
                id: 1,
                numero_expediente: "8678109862716589026781058",
                tipo_proceso: "Prueba1",
                fecha: "01/01/2024",
            },
            {
                id: 2,
                numero_expediente: "5090145009134561758901869",
                tipo_proceso: "Prueba2",
                fecha: "06/05/2024",
            },
            {
                id: 3,
                numero_expediente: "1467890135678901345678913",
                tipo_proceso: "Prueba3",
                fecha: "10/02/2024",
            }
        ];

        self.expedientesDP = new ArrayDataProvider(self.expedientes, { keyAttributes: "id" });

        self.popSearchAdv = () => {
            document.getElementById("pop-searchAdv").open();
        };

        self.onCancelPopSearchAdv = () => {
            document.getElementById("pop-searchAdv").close();
        };

        self.onConfigExpediente = () => {
            document.getElementById("dlg-configExpediente").open();
        };

        self.closeDialog = () => {
            document.getElementById("dlg-configExpediente").close();
        };

        self.onSaveExpediente = () => {
            Sweet.confirm(
                'Registro de Expediente',
                '¿Estás seguro de <span><b>Registrar</b></span> este expediente?'
            ).then(result => {
                if(result.isConfirmed) {
                    document.getElementById("dlg-configExpediente").close();
                    Sweet.msgUpdated(
                        'Expediente Registrado',
                        'El expediente ha sido registrado exitosamente.'
                    );
                }
            })
        };

        this.connected = () => {
            // accUtils.announce('Dashboard page loaded.', 'assertive');
            document.title = "Expedientes";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return BandejaConsultaExpViewModel;
});
   