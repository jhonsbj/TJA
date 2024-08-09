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
    moduleUtils, 
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

        let navData = [
            { path: '', redirect: 'dashboard' },
            { path: 'dashboard', detail: { label: 'Dashboard', iconClass: 'oj-ux-ico-bar-chart' } },
            { path: 'catalogos', detail: { label: 'Catálogos', iconClass: 'oj-ux-ico-folder-open' } },
            { path: 'expedientes', detail: { label: 'Expedientes', iconClass: 'oj-ux-ico-file-text' } },
            { path: 'digitalizacion', detail: { label: 'Digitalizacion', iconClass: 'oj-ux-ico-resource-service' } },

        ];

        // Router setup
        let router = new CoreRouter(navData, {
            urlAdapter: new UrlParamAdapter()
        });
        router.sync();

        this.moduleAdapter = new ModuleRouterAdapter(router);

        this.selection = new KnockoutRouterAdapter(router);

        // Setup the navDataProvider with the routes, excluding the first redirected
        // route.
        this.navDataProvider = new ArrayDataProvider(navData.slice(1), {keyAttributes: "path"});

        // Drawer
        self.sideDrawerOn = ko.observable(false);

        // Close drawer on medium and larger screens
        this.mdScreen.subscribe(() => { self.sideDrawerOn(false) });

        // Called by navigation drawer toggle button and after selection of nav drawer item
        this.toggleDrawer = () => {
            self.sideDrawerOn(!self.sideDrawerOn());
        }

        // Header
        // Application Name used in Branding Area
        this.appName = ko.observable("");
        // User Info used in Global Navigation area
        this.userLogin = ko.observable("super01@pjpuebla.gob.mx");

    }

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
    
});
