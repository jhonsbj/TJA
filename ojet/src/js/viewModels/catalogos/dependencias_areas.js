define([
    "interface/catalogos/DepArea",
    "knockout",
    "appController",
    "sweetAlert",
    "commonJS",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojtable",
    "ojs/ojcollapsible",
    "oj-c/input-text",
    "oj-c/button",
], function(
    DepArea,
    ko, 
    global,
    Sweet,
    commonJS,
    mapping,
    ArrayDataProvider) {
    function DependenciasAreasViewModel() {

        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.dependencia = mapping.fromJS(DepArea.dep);
        self.area = mapping.fromJS(DepArea.area);

        self.selectedDependencia = ko.observable(commonJS.clearSelectedRow());
        self.selectedArea = ko.observable(commonJS.clearSelectedRow());

        self.dialogTitle = ko.observable(null);

        self.columns = [
            { headerText: "Clave", field: "clave" },
            { headerText: "Nombre", field: "nombre" },
        ];

        self.dependencias = [
            {
                id: 1,
                clave: "DEP1",
                nombre: "Dependencia 1",
            }
        ];

        self.areas = [
            {
                id: 1,
                clave: "A1",
                nombre: "Area 1",
            }
        ];

        self.dependenciasDP = new ArrayDataProvider(self.dependencias, { keyAttributes: "id" });

        self.areasDP = new ArrayDataProvider(self.areas, { keyAttributes: "id" });



        self.onNewDependencia = () => {
            self.dialogTitle("Nueva Dependencia");
            mapping.fromJS(DepArea.dep, self.dependencia);
            document.getElementById("dlg-configDep").open();
        };
        
        self.onEditDependencia = () => {
            const dependencia_id = Array.from(self.selectedDependencia().row.values())?.[0] ?? null;
            if (dependencia_id) {
                let data = self.dependenciasDP.data.find((x) => x.id == dependencia_id);
                mapping.fromJS(data, self.dependencia);
                self.dialogTitle("Editar Dependencia");
                document.getElementById("dlg-configDep").open();
            } else {
                Sweet.rowInfo();
                return;
            }
        };

        self.onNewArea = () => {
            mapping.fromJS(DepArea.area, self.area);
            self.dialogTitle("Nueva Area");
            document.getElementById("dlg-configArea").open();
        };

        self.onEditArea = () => {
            const area_id = Array.from(self.selectedArea().row.values())?.[0] ?? null;
            if (area_id) {
                let data = self.areasDP.data.find((x) => x.id == area_id);
                mapping.fromJS(data, self.area);
                self.dialogTitle("Editar Area");
                document.getElementById("dlg-configArea").open();
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
                "btn-configDep": "dlg-configDep",
                "btn-configArea": "dlg-configArea",
            };

            document.getElementById(dlgs[btn]).close();
        };


        this.connected = () => {
            document.title = "Catálogo - Usuarios";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return DependenciasAreasViewModel;
});
   