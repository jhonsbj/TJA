define([
    "knockout",
    "appController",
    "sweetAlert",
    "ojs/ojarraydataprovider",
    "ojs/ojtable",
    "ojs/ojformlayout",
    "ojs/ojfilepicker",
    "oj-c/input-text",
    "oj-c/select-single",
    "oj-c/text-area",
    "oj-c/radioset",
    "oj-c/button",
    "ojs/ojswitch",
    "ojs/ojoption", 
    "ojs/ojmenu"

], function(
    ko, 
    global,
    Sweet,
    ArrayDataProvider,) {
    function DigitalizacionViewModel() {

        var self = this;

        // self.messages = global.messages;
        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;
        self.option = ko.observable("por_digitalizar");        

        self.columns = [
            { headerText: "N° Expediente", field: "numero_expediente" },
            { headerText: "Tipo", field: "tipo" },
            { headerText: "Fecha", field: "fecha" },   
            { 
                headerText: "Estado", 
                template: "estatusTemplate",
                field: "estatus" 
            },   
            {
                frozenEdge: "end",
                className: "oj-helper-text-align-center oj-sm-padding-0-vertical",
                template: "actionTemplate",
                id: "action",
            },      
        ];

        self.columnsExp = [
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
                numero_expediente: "PJE-TJA-1-2024-JO-C1-2-2",
                tipo_proceso: "Prueba1",
                fecha: "01/01/2024",
            },
        ];

        self.expedientesDP = new ArrayDataProvider(self.expedientes, { keyAttributes: "id" });



        self.datos = [
            {
                id: 1,
                numero_expediente: "PJE-TJA-1-2024-JO-C1-2-2",
                tipo: "Demanda",
                fecha: "01/01/2021",
                estatus: "Por digitalizar",
            },
        ];

        this.dp = new ArrayDataProvider(self.datos, { keyAttributes: "id" });

        this.dp2 = new ArrayDataProvider([], { keyAttributes: "id" });


        this.laptopOptions = [
            { value: "por_digitalizar", label: "Pendientes de Digitalizar" },
            { value: "digitalizado", label: "Digitalizados" },
        ];


        this.empArray = [
            {
                EmployeeId: 1001,
                Name: "John Brown",
                Department: "Administration",
                Status: "Pending",
            },
            {
                EmployeeId: 1002,
                Name: "Garrett Rose",
                Department: "Administration",
                Status: "Pending",
            },
        ];

        this.dataprovider = new ArrayDataProvider(this.empArray, {
            keyAttributes: "EmployeeId",
        });

        this.menuListener = (event, context) => {
            let option = event.detail.selectedValue;
            console.log(option);
            if(option === 'return_document'){
                self.windowReturnDocument();
            } else if(option === 'edit_document'){
                document.getElementById("dlg-digitalizacion").open();
            }
        };

        self.windowReturnDocument = () => {
            document.getElementById("dlg-motivoDevolucion").open();
        };

        self.onSaveReturnDocument = () => {
            Sweet.confirm(
                'Devolución de Documento',
                '¿Estás seguro(a) de regresar el documento a Oficialía?'
            ).then(result => {
                if(result.isConfirmed){
                    document.getElementById("dlg-motivoDevolucion").close();
                    Sweet.msgUpdated(
                        'Devolución Exitosa',
                        'El documento fue devuelto a Oficialía correctamente.'
                    );
                }
            });
        };

    
        this.fileNames = ko.observable([]);
        this.invalidMessage = ko.observable("");
        this.selectListener = (event) => {
            this.invalidMessage("");
            const files = event.detail.files;
            this.fileNames(Array.prototype.map.call(files, (file) => {
                return file.name;
            }));
        };
        this.invalidListener = (event) => {
            this.fileNames([]);
            this.invalidMessage("{severity: '" +
                event.detail.messages[0].severity +
                "', summary: '" +
                event.detail.messages[0].summary +
                "'}");
            const promise = event.detail.until;
            if (promise) {
                promise.then(() => {
                    this.invalidMessage("");
                });
            }
        };

        this.beforeSelectListener = (event) => {
            const accept = event.detail.accept;
            const files = event.detail.files;
            const messages = [];
            let file;
            const invalidFiles = [];
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                if (file.size > 100000) {
                    invalidFiles.push(file.name);
                }
            }
            if (invalidFiles.length === 0) {
                accept(Promise.resolve());
            }
            else {
                if (invalidFiles.length === 1) {
                    messages.push({
                        severity: "error",
                        summary: "File " +
                            invalidFiles[0] +
                            " is too big.  The maximum size is 100kb.",
                    });
                }
                else {
                    const fileNames = invalidFiles.join(", ");
                    messages.push({
                        severity: "error",
                        summary: "These files are too big: " +
                            fileNames +
                            ".  The maximum size is 100kb.",
                    });
                }
                accept(Promise.reject(messages));
            }
        };


        self.openDigitalizacion = () => {
            document.getElementById("dlg-digitalizacion").open();
        };

        self.onActualizacion = () => {
            document.getElementById("dlg-actualizarDoc").open();
        };

        self.popSearchAdv = () => {
            document.getElementById("pop-searchAdv").open();
        };


        self.closeDialog = (event) => {
            let btn = event.target.id;
            let dlgs = {
                "btn-searchAdv": "pop-searchAdv",
                "btn-digitalizacion": "dlg-digitalizacion",
                "btn-actualizarDoc": "dlg-actualizarDoc",
                "btn-motivoDevolucion": "dlg-motivoDevolucion"
            };

            document.getElementById(dlgs[btn]).close();
        };

        this.connected = () => {
            // accUtils.announce('Dashboard page loaded.', 'assertive');
            document.title = "Digitalización";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return DigitalizacionViewModel;
});
   