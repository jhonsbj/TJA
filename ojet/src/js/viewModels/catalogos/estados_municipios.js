define([
    "knockout",
    "appController",
    "mapping",
    "ojs/ojarraydataprovider",
    'ojs/ojkeyset',
    "ojs/ojtable",
    "ojs/ojcollapsible",
    "oj-c/input-text",
    "oj-c/button",
    "ojs/ojswitch",
], function(
    ko, 
    global,
    mapping,
    ArrayDataProvider,
    keyset,
) {
    function EstadosMunicipiosViewModel() {

        var self = this;

        // self.messages = global.messages;
        self.smScreen = global.smScreen;
        self.mdScreen = global.mdScreen;

        self.estatus = ko.observable(true);

        self.selectedItems = ko.observable({
            row: new keyset.KeySetImpl(),
            column: new keyset.KeySetImpl(),
        });


        self.columns = [
            { headerText: "Clave", field: "value" },
            { headerText: "Nombre", field: "label" },
            { 
                headerText: "Estado", 
                template: "estatusTemplate",
                field: "estatus" 
            }, 
        ];

        self.estadosDeMexico = [
            { value: 1, label: "Aguascalientes" },
            { value: 2, label: "Baja California" },
            { value: 3, label: "Baja California Sur" },
            { value: 4, label: "Campeche" },
            { value: 5, label: "Chiapas" },
            { value: 6, label: "Chihuahua" },
            { value: 7, label: "Coahuila" },
            { value: 8, label: "Colima" },
            { value: 9, label: "Durango" },
            { value: 10, label: "Guanajuato" },
            { value: 11, label: "Guerrero" },
            { value: 12, label: "Hvaluealgo" },
            { value: 13, label: "Jalisco" },
            { value: 14, label: "Mexico" },
            { value: 15, label: "Mexico City" },
            { value: 16, label: "Michoacán" },
            { value: 17, label: "Morelos" },
            { value: 18, label: "Nayarit" },
            { value: 19, label: "Nuevo León" },
            { value: 20, label: "Oaxaca" },
            { value: 21, label: "Puebla" },
            { value: 22, label: "Querétaro" },
            { value: 23, label: "Quintana Roo" },
            { value: 24, label: "San Luis Potosí" },
            { value: 25, label: "Sinaloa" },
            { value: 26, label: "Sonora" },
            { value: 27, label: "Tabasco" },
            { value: 28, label: "Tamaulipas" },
            { value: 29, label: "Tlaxcala" },
            { value: 30, label: "Veracruz" },
            { value: 31, label: "Yucatán" },
            { value: 32, label: "Zacatecas" }
        ];


        self.municipiosDeMorelos = [
            { value: 1, label: "Amacuzac" },
            { value: 2, label: "Ayala" },
            { value: 3, label: "Cuernavaca" },
            { value: 4, label: "Cuautla" },
            { value: 5, label: "Cuautlancingo" },
            { value: 6, label: "Huitzilac" },
            { value: 7, label: "Jantetelco" },
            { value: 8, label: "Jojutla" },
            { value: 9, label: "Jiutepec" },
            { value: 10, label: "Jonacatepec" },
            { value: 11, label: "Mazatepec" },
            { value: 12, label: "Miacatlán" },
            { value: 13, label: "Oacalco" },
            { value: 14, label: "Ocuituco" },
            { value: 15, label: "Puente de Ixtla" },
            { value: 16, label: "Temixco" },
            { value: 17, label: "Tepoztlán" },
            { value: 18, label: "Tetecala" },
            { value: 19, label: "Tetela del Volcán" },
            { value: 20, label: "Tlalnepantla" },
            { value: 21, label: "Tlaltizapán" },
            { value: 22, label: "Tlaxcala" },
            { value: 23, label: "Xochitepec" },
            { value: 24, label: "Xochitl" },
            { value: 25, label: "Zacatepec" },
            { value: 26, label: "Zacualpan de Amilpas" },
        ];
        
        

        this.dataProvider = new ArrayDataProvider(self.estadosDeMexico, { keyAttributes: "value" });

        this.dataProviderMunicipios = new ArrayDataProvider(self.municipiosDeMorelos, { keyAttributes: "value" });



        self.selectedChangedListener = (event) => {
            self.items = [];
            let data = this.dataProviderMunicipios.data.map((x) => x.activo_id);
            if (event.detail.value.row.isAddAll()) {
                const iterator = event.detail.value.row.deletedValues();
                iterator.forEach(function (key) {
                    data.splice(data.indexOf(key), 1);
                });
                self.items = data;

            } else {
                const row = event.detail.value.row;
                if (row.values().size > 0) {
                    row.values().forEach(function (key) {
                        self.items.push(key);
                    });
                }
            }
        };


        this.connected = () => {
            document.title = "Catálogo - Estados y Municipios";
        };

        this.disconnected = () => {};

        this.transitionCompleted = () => {};
    }

    return EstadosMunicipiosViewModel;
});
   