define([
    "interface/Expediente",
    "knockout",
    "appController",
    "sweetAlert",
    "utils",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojmodule-element-utils",
    "ojs/ojmodule-element",
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
    Expediente,
    ko, 
    global, 
    Sweet,
    utils,
    mapping,
    ArrayDataProvider,
    ModuleElementUtils) {
    function BandejaConsultaExpViewModel() {

        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;
        
        self.expediente = mapping.fromJS(Expediente.values);
        self.filtro = mapping.fromJS(Expediente.filtros);

        self.selected = ko.observable(utils.clearSelectedRow());

        self.moduleNew = ko.observable(false);
        self.dataExpediente = ko.observable(null);

        self.ModuleElementUtils = ModuleElementUtils;

        self.columns = [
            { headerText: "N°", field: "id" },
            { headerText: "N° Expediente", field: "numero_expediente" },
            { headerText: "Proceso", field: "tipo_proceso" },
            { headerText: "Ponencia", field: "ponencia" }, 
            { headerText: "Actor", field: "actor" }, 
            { headerText: "Descripción", field: "descripcion" }, 

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
                numero_expediente: "PJE-TJA-1-2024-JO-C1-2-2",
                tipo_proceso: "Prueba1",
                ponencia: "Ponencia 1",
                actor: "María Méndez Pérez",
                descripcion: "Descripción del expediente 1",
            },
            {
                id: 2,
                numero_expediente: "PJE-TJA-2-2024-JO-C1-1-1",
                tipo_proceso: "Prueba2",
                ponencia: "Ponencia 2",
                actor: "Juan Pérez López",
                descripcion: "Descripción del expediente 2",
                fecha: "06/05/2024",
            },
            {
                id: 3,
                numero_expediente: "PJE-TJA-3-2024-JO-C3-7-7",
                tipo_proceso: "Prueba3",
                ponencia: "Ponencia 3",
                actor: "Karina Reyes Gómez",
                descripcion: "Descripción del expediente 3",
                fecha: "10/02/2024",
            }
        ];

        self.expedientesDP = new ArrayDataProvider(self.expedientes, { keyAttributes: "id" });

        self.onNewExpediente = () => {
            mapping.fromJS(Expediente.values, self.expediente);
            $("#expedientes").fadeOut("slow", () => {
                self.moduleNew(true);
            });
        };

        self.back = () => {
            self.moduleNew(false);
            $("#expedientes").fadeIn("slow");
        };



        // self.onConfigExpediente = async () => {
        //     const expediente_id = Array.from(self.selected().row.values())?.[0] ?? null;


        //     if(expediente_id){
        //         mapping.fromJS(Expediente.values, self.expediente);
        //     }

        //     if(activo_id && activo_code){
        //         mapping.fromJS(Reasignacion.value, self.reasign);
        //         //self.getMotivosTraspaso();
        //         let data = self.activosDP().data.find(x => x.activo_id == activo_id && x.activo_code == activo_code);
        //         if(data){
        //             self.dataActivo(data);
        //             $("#activosTable").fadeOut("slow", () => {
        //                 self.viewReasign(true);
        //             });
        //         }
        //     } else {
        //         self.messages.push(commonJS.infoMsg("Seleccione un activo"));
        //     }
        // };


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

        self.onSendDocument = () => {
            Sweet.confirm(
                'Envío a Digitalización',
                '¿Estás seguro de enviar este expediente?'
            )
            .then(result => {
                if(result.isConfirmed) {
                    Sweet.msgUpdated(
                        'Envidado a Digitalización',
                        'El expediente ha sido enviado exitosamente.'
                    );
                }
            })
        };

        self.onEditExpediente = () => {
            const expediente_id = Array.from(self.selected().row.values())?.[0] ?? null;
            if(expediente_id){
                
            } else {
                Sweet.rowInfo();
            }
            
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
   