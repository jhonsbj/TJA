define([
    "interface/catalogos/SalaPonencia",
    "knockout",
    "appController",
    "sweetAlert",
    "utils",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojtable",
    "ojs/ojcollapsible",
    "oj-c/input-text",
    "oj-c/button",
    "ojs/ojswitch"
], function(
    SalaPonencia,
    ko, 
    global,
    Sweet,
    utils,
    mapping,
    ArrayDataProvider) {
    function SalasPonenciasViewModel() {

        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.sala = mapping.fromJS(SalaPonencia.sala);
        self.ponencia = mapping.fromJS(SalaPonencia.ponencia);

        self.selectedSala = ko.observable(utils.clearSelectedRow());
        self.selectedPonencia = ko.observable(utils.clearSelectedRow());

        self.dialogTitle = ko.observable(null);

        self.columns = [
            { headerText: "Clave", field: "clave" },
            { headerText: "Descripción", field: "nombre_completo_titular" },
            { headerText: "Titular", field: "titular" }, 
        ];

        self.salas = [
            {
                id: 1,
                clave: "SC1",
                nombre: "Sala colegiada 1",
                nombre_completo_titular: "María Castillo Hernández",
                nombre_titular: "María",
                apellido_paterno_tit: "Castillo",
                apellido_materno_tit: "Hernández"
            }
        ];

        self.ponencias = [
            {
                id: 1,
                clave: "P1",
                nombre: "Ponencia 1",
                nombre_completo_titular: "Julio Fernandez Mendez",
                nombre_titular: "Julio",
                apellido_paterno_tit: "Fernandez",
                apellido_materno_tit: "Mendez"
            },
            {
                id: 2,
                clave: "P2",
                nombre: "Ponencia 2",
                nombre_completo_titular: "Ana Maria Rodriguez Gomez",
                nombre_titular: "Ana Maria",
                apellido_paterno_tit: "Rodriguez",
                apellido_materno_tit: "Gomez"
            },
            {
                id: 3,
                clave: "P3",
                nombre: "Ponencia 3",
                nombre_completo_titular: "Carlos Alberto Lopez Perez",
                nombre_titular: "Carlos Alberto",
                apellido_paterno_tit: "Lopez",
                apellido_materno_tit: "Perez"
            }
            
        ];

        self.salasDP = new ArrayDataProvider(self.salas, { keyAttributes: "id" });

        self.ponenciasDP = new ArrayDataProvider(self.ponencias, { keyAttributes: "id" });

        self.onNewSala = () => {
            self.dialogTitle("Nueva sala colegiada");
            mapping.fromJS(SalaPonencia.sala, self.sala);
            document.getElementById("dlg-configSala").open();
        };

        self.onNewPonencia = () => {
            const sala_id = Array.from(self.selectedSala().row.values())?.[0] ?? null;
            if(sala_id){
                self.dialogTitle("Nueva Ponencia");
                mapping.fromJS(SalaPonencia.ponencia, self.ponencia);
                document.getElementById("dlg-configPonencia").open();
            } else {
                Sweet.rowInfo("Seleccione la sala a la que pertenecerá la ponencia.");
            }
        };

        self.onEditSala = () => {
            const sala_id = Array.from(self.selectedSala().row.values())?.[0] ?? null;
            if(sala_id){
                let data = self.salasDP.data.find((x) => x.id == sala_id);
                console.log(data);
                mapping.fromJS(data, self.sala);
                self.dialogTitle("Editar sala colegiada");
                document.getElementById("dlg-configSala").open();
            } else {
                Sweet.rowInfo();
                return;
            }
        };

        self.onEditPonencia = () => {
            const ponencia_id = Array.from(self.selectedPonencia().row.values())?.[0] ?? null;
            if(ponencia_id){
                let data = self.ponenciasDP.data.find((x) => x.id == ponencia_id);
                mapping.fromJS(data, self.ponencia);
                self.dialogTitle("Editar ponencia");
                document.getElementById("dlg-configPonencia").open();
            } else {
                Sweet.rowInfo();
                return;
            }
        };


        self.popSearchAdv = () => {
            document.getElementById("pop-searchAdv").open();
        };

        self.closeDialog = (event) => {
            let btn = event.target.id;
            let dlgs = {
                "btn-configSala": "dlg-configSala",
                "btn-configPonencia": "dlg-configPonencia",
            };

            document.getElementById(dlgs[btn]).close();
        };

        this.connected = () => {
            document.title = "Catálogo - Usuarios";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return SalasPonenciasViewModel;
});
   