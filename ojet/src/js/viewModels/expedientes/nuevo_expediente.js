define([
    "interface/Expediente",
    "knockout",
    "appController",
    "sweetAlert",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojarraydataprovider",
    "ojs/ojlistview",
    "ojs/ojlistitemlayout",
    "ojs/ojcollapsible",
    "ojs/ojformlayout",
    "oj-c/input-text",
    "oj-c/select-single",
    "oj-c/input-number",
    "oj-c/radioset",
    "oj-c/button",
    "oj-c/text-area",
    "ojs/ojdatetimepicker",

], function(
    Expediente,
    ko, 
    global, 
    Sweet,
    mapping,
    ArrayDataProvider,
    ArrayListDataProvider
) {
    function NuevoExpedienteViewModel(params) {
        console.log(params)
        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.expediente = mapping.fromJS(Expediente.values);
        self.actRep = mapping.fromJS(Expediente.actRep);

        self.optionCaptura = ko.observable("act");
        self.labelConteo = ko.observable(null);
        self.contadorAct = ko.observable(1);
        self.contadorRep = ko.observable(1);

        self.nombre = ko.observable(null);
        self.apellidoPaterno = ko.observable(null);
        self.apellidoMaterno = ko.observable(null);

        self.firstSelectedItem = ko.observable();

        self.correos = [
            { 
                cuerpo_id: 1, 
                nombre_cuerpo: "Jhonatan Barbosa Jimenez",
                created_date: "2021-09-01",
                created_by: "Jhonatan Barbosa Jimenez",
                estatus: "ACTIVO"
            }
        ];

        self.correosProvider = new ArrayListDataProvider(self.correos, {
            keyAttributes: "cuerpo_id",
        });



        self.options = [
            { value: "act", label: "Actores" },
            { value: "rep", label: "Representantes" },
        ];


        self.capturaAnterior = () => {

        };


        self.cambio = ko.computed(() => {
            let option = self.optionCaptura();
            let label = option === "act" ? "Actor" : "Representante";
            let current = option === "act" ? self.contadorAct() : self.contadorRep();
            let count = option === "act" ? self.expediente.num_actores() : self.expediente.num_representantes();

            self.labelConteo(`${label} ${current} de ${count}`);
        });

        self.capturaSiguiente = () => {


            const contador = (label, total) => {
                let option = self.optionCaptura();
                let current = option === "act" ? self.contadorAct() : self.contadorRep();
                if (current <= total) {
                    self.labelConteo(`${label} ${current} de ${total}`);
                    current++;
                    if (option === "act") {
                        self.contadorAct(current);
                    } else {
                        self.contadorRep(current);
                    }
                }
            };

            const objActRep = {
                nombre: self.nombre(),
                apellido_paterno: self.apellidoPaterno(),
                apellido_materno: self.apellidoMaterno(),
            };

            self.expediente.actRep.push(objActRep);

            console.log(self.expediente);
        
            let option = self.optionCaptura();

            if (option === "act") {
                contador("Actor", self.expediente.num_actores());
            } else {
                contador("Representante", self.expediente.num_representantes());
            }

            self.nombre(null);
            self.apellidoPaterno(null);
            self.apellidoMaterno(null);
        };

        self.onSaveActRep = () => {

        };


        self.columns = [
            {
                headerText: "ReadOnly", 
                field: "DepartmentId",
                headerClassName: "oj-helper-text-align-end",
                className: "oj-helper-text-align-end oj-table-data-cell-padding",
            }
        ]


    //     columns='[{"field": "DepartmentId",
    //     "headerText": "ReadOnly",
    //     

    //     "template": "deptIdTemplate",
    //     "id": "depId",
    //     "minWidth": "7rem"},
    //    {"field": "DepartmentName",
    //     "weight": 3,
    //     "minWidth": "10rem",
    //     "headerText": "InputText",
    //     "template": "deptNameTemplate",
    //     "id": "depName"},
    //    {"field":"LocationId",
    //     "weight": 2,
    //     "showRequired": true,
    //     "headerText": "InputText Number",
    //     "headerClassName": "oj-helper-text-align-end",
    //     "className": "oj-helper-text-align-end",
    //     "template": "locIdTemplate",
    //     "id": "locId",
    //     "minWidth": "10rem"},
    //    {"field":"Type",
    //     "headerText": "SelectSingle",
    //     "weight": 2,
    //     "minWidth": "10rem",
    //     "template": "typeTemplate",
    //     "id": "type"},
    //    {"field":"Currency",
    //     "headerText": "Combobox",
    //     "minWidth": "8rem",
    //     "weight": 2,
    //     "template": "currencyTemplate",
    //     "id": "currency"},
    //    {"field":"StartDate",
    //     "weight": 2,
    //     "minWidth": "10rem",
    //     "headerText": "InputDate",
    //     "template": "dateTemplate",
    //     "id": "start"},
    //    {"field":"Primary",
    //     "headerText": "Checkboxset",
    //     "headerStyle": "text-align: center;",
    //     "minWidth": "8rem",
    //     "style": "padding-top: 0px; padding-bottom: 0px; text-align: center;",
    //     "template": "primaryTemplate",
    //     "id": "primary"},
    //    {"headerText": "Action",
    //     "width": "6.2rem",
    //     "style":"padding-top: 0px; padding-bottom: 0px;",
    //     "headerClassName": "oj-helper-text-align-end",
    //     "className": "oj-helper-text-align-end",
    //     "template": "actionTemplate",
    //     "id": "action"}]'
        


        self.classCol = "oj-typography-subheading-md oj-text-color-secondary";

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

        self.onCaptureActores = () => {
            document.getElementById("dlg-captura").open();
        };

        self.closeDialog = () => {
            document.getElementById("dlg-captura").close();
        };

        this.connected = () => {
            document.title = "Expedientes";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return NuevoExpedienteViewModel;
});
   