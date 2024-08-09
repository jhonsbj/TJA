define([
    "interface/catalogos/Usuario",
    "knockout",
    "appController",
    "sweetAlert",
    "commonJS",
    "mapping",
    "ojs/ojarraydataprovider",
    "ojs/ojvalidationgroup",
    "ojs/ojformlayout",
    "oj-c/input-text",
    "oj-c/button",
    "ojs/ojswitch"
], function(
    Usuario,
    ko, 
    global,
    Sweet,
    commonJS,
    mapping,
    ArrayDataProvider) {
    function UsuariosViewModel() {

        var self = this;

        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.user = mapping.fromJS(Usuario.values);
        self.filtros = mapping.fromJS(Usuario.filtros);

        self.selected = ko.observable(commonJS.clearSelectedRow());
        self.dialogTitle = ko.observable(null);


        self.columns = [
            { headerText: "Clave", field: "clave" },
            { headerText: "Nombre", field: "nombre_completo" },
            { headerText: "Correo", field: "correo_electronico" }, 
            { headerText: "Creación", field: "fecha_creacion" },
        ];

        self.users = [
            {
                id: 1,
                clave: "2123",
                nombre: "Jhonatan",
                apellido_paterno: "Barbosa",
                apellido_materno: "Jiménez",
                nombre_completo: "Jhonatan Barbosa Jiménez",
                correo_electronico: "jhonatan@gmail.com",
                fecha_creacion: "01/08/2024",
            }
        ];

        self.usersDP = new ArrayDataProvider(self.users, { keyAttributes: "id" });

        self.popSearchAdv = () => {
            document.getElementById("pop-searchAdv").open();
        };

        self.onNewUser = () => {
            mapping.fromJS(Usuario.values, self.user);
            self.dialogTitle("Agregar Usuario");
            document.getElementById("dlg-configUser").open();
        };

        self.onEditUser = () => {
            const usuario_id = Array.from(self.selected().row.values())?.[0] ?? null;
            if(usuario_id){
                let data = self.usersDP.data.find((x) => x.id == usuario_id);
                mapping.fromJS(data, self.user);
                self.dialogTitle("Editar Usuario");
                document.getElementById("dlg-configUser").open();
            } else {
                Sweet.info("Información", "Seleccione un registro para poder editar.");
                return;
            }
        };

        self.onSaveUser = () => {
            if(commonJS.checkValidationGroup()){
                console.log('x');
            }
        };
        
        self.closeDialog = (event) => {
            let btn = event.target.id;
            let dlgs = {
                "btn-searchAdv": "pop-searchAdv",
                "btn-configUser": "dlg-configUser",
            };

            document.getElementById(dlgs[btn]).close();
        };

        this.connected = () => {
            document.title = "Catálogo - Usuarios";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return UsuariosViewModel;
});
   