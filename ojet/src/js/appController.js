define([
    'knockout', 
    'ojs/ojcontext', 
    'ojs/ojmodule-element-utils', 
    'ojs/ojknockouttemplateutils', 
    'ojs/ojcorerouter', 
    'ojs/ojmodulerouter-adapter', 
    'ojs/ojknockoutrouteradapter', 
    'ojs/ojurlparamadapter', 
    'ojs/ojresponsiveutils', 
    'ojs/ojresponsiveknockoututils', 
    'ojs/ojarraydataprovider',
    'ojs/ojdrawerpopup', 
    'ojs/ojmodule-element', 
    'ojs/ojknockout'

],function(
    ko, 
    Context, 
    ModuleElementUtils,
    KnockoutTemplateUtils, 
    CoreRouter, 
    ModuleRouterAdapter, 
    KnockoutRouterAdapter,
    UrlParamAdapter, 
    ResponsiveUtils, 
    ResponsiveKnockoutUtils, 
    ArrayDataProvider
){

    function ControllerViewModel() {

        var self = this;

        this.KnockoutTemplateUtils = KnockoutTemplateUtils;

        // Handle announcements sent when pages change, for Accessibility.
        this.manner = ko.observable('polite');
        this.message = ko.observable();
        announcementHandler = (event) => {
            this.message(event.detail.message);
            this.manner(event.detail.manner);
        };

        document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);


        // Media queries for responsive layouts
        const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

        self.initial = ko.observable(false);


        self.navData = [
            { path: '', redirect: 'dashboard' },
            { path: 'dashboard', detail: { label: 'Dashboard', iconClass: 'oj-ux-ico-bar-chart', jsId: "dashboard" } },
            { path: 'catalogos', detail: { label: 'Catálogos', iconClass: 'oj-ux-ico-folder-open', jsId: "catalogos" } },
            { path: 'expedientes', detail: { label: 'Expedientes', iconClass: 'oj-ux-ico-file-text', jsId: "expedientes"} },
            { path: 'digitalizacion', detail: { label: 'Digitalizacion', iconClass: 'oj-ux-ico-resource-service', jdId: "digitalizacion" } },

        ];


        self.router = new CoreRouter(self.navData, {
            urlAdapter: new UrlParamAdapter()
        });

        self.moduleConfig = ModuleElementUtils.createConfig({
            name: "menu",
            params: {
                parentRouter: self.router,
            },
        });

        this.navDataProvider = new ArrayDataProvider(self.navData.slice(1), {keyAttributes: "path"});

        self.selection = new KnockoutRouterAdapter(self.router);

        self.initial(true);

        self.sideDrawerOn = ko.observable(false);

        this.mdScreen.subscribe(() => {
            self.sideDrawerOn(false);
        });

        this.toggleDrawer = () => {
            self.sideDrawerOn(!self.sideDrawerOn());
        };

        self.userLogin = ko.observable("user01@pjpuebla.gob.mx");

    }

    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
    
});
