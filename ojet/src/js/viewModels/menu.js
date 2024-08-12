define([
    "appController",
    "ojs/ojcore",
    "knockout",
    "ojs/ojarraydataprovider",
    "ojs/ojknockout",
    "ojs/ojnavigationlist",
    "ojs/ojmodule",
    "ojs/ojswitch",
    "ojs/ojconveyorbelt",
], function (appController, oj, ko, ArrayDataProvider) {
    function menus() {
        var self = this;

        self.menus = ko.observableArray([]);
        self.menusDP = new ArrayDataProvider(self.menus, { keyAttributes: "html_id" });
        self.idMenu = ko.observable();
        self.nombreMenu = ko.observable();
        self.iconMenu = ko.observable();
        self.router = ko.observable();
        self.selectedItem = ko.observable();
        self.tituloMenu = ko.observable();


        const smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

        self.menusAll = [
            {
                path: "dashboard",
                html_id: "dashboard",
                titulo: "Dashboard",
                nombre: "Dashboard",
                iconclass: "oj-ux-icon-bar-chart",
                isDefault: 1
            },
            // {
            //     path: "expedientes",
            //     html_id: "expedientes",
            //     titulo: "Expedientes",
            //     nombre: "Expedientes",
            //     iconclass: "oj-ux-ico-file-text",
            //     isDefault: 1
            // },
            {
                path: "catalogos",
                html_id: "usuarios",
                titulo: "Usuarios",
                nombre: "Usuarios",
                iconclass: "oj-ux-ico-contact-group",
                isDefault: 1
            },
            {
                path: "catalogos",
                html_id: "salas_ponencias",
                titulo: "Salas y Ponenencias",
                nombre: "Salas y Ponenencias",
                iconclass: "oj-ux-ico-gavel",
                isDefault: 0
            },
            {
                path: "catalogos",
                html_id: "dependencias_areas",
                titulo: "Dependencias y Áreas",
                nombre: "Dependencias y Áreas",
                iconclass: "oj-ux-ico-building",
                isDefault: 0
                
            },
            {
                path: "catalogos",
                html_id: "estados_municipios",
                titulo: "Estados y Municipios",
                nombre: "Estados y Municipios",
                iconclass: "oj-ux-ico-backtomap",
                isDefault: 0
            },
            {
                path: "catalogos",
                html_id: "procesos",
                titulo: "Procesos",
                nombre: "Procesos",
                iconclass: "oj-ux-ico-processes-alt",
                isDefault: 0

            }
        ];


        self.modulePath = ko.pureComputed(function () {
            var name = self.selectedItem();
            let menu = self.menus().find((x) => x.html_id == name);
            if (!menu) {
                return "dashboard";
            }
            if (menu.titulo) {
                self.tituloMenu(menu.titulo);
            } else {
                self.tituloMenu(null);
            }

            return name === "dashboard"
                ? "dashboard"
                : { name: self.idMenu() + "/" + name, params: { parentRouter: self.router(), permisos: menu?.permisos ?? [] } };
        });

        self.initialize = function (args) {
            let router = args.parentRouter;
            self.router(router);
            router.currentState.subscribe(async function (args) {
                let state = args.state;
                if (state) {
                    var val = state;
                    self.menus([]);
                    self.idMenu(val.detail.jsId);
                    self.nombreMenu(val.detail.label);
                    self.iconMenu(val.detail.iconClass);
                    
                    //buscamos pantallas en base al módulo seleccionado
                    let response = self.menusAll.filter(x => x.path == val.detail.jsId);
                    console.log(response)
                    let my_default = response.find(x => x.isDefault == 1);
                    
                    if (my_default != undefined) {
                        self.selectedItem(my_default.html_id);
                    }

                    self.menus(response);

                } else {
                    self.router().go({ path: "dashboard" });
                }
            });
        };

        self.connected = function () {};
        self.disconnected = function () {};
        self.transitionCompleted = function () {};
    }

    return new menus();
});
