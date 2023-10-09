// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  HR_URL: '',
  COMMON_UTIL: '',

  // APM RUM Vars
  apmUrl: 'http://hrplatformdev.ril.com/apmrum/',
  geoApiUrl: 'https://locationapi.ril.com/geolocation/loc-by-ip',
  platform: 'PeoplePlatform',
  sub_platform: 'HRPlatformContainer',
  application: 'HRPlatformContainer',
  component_name: 'JCT_AJ_Services_V3',
  sub_application: 'HRPlatformContainer',
  component_type: 'UI',
  serviceName: 'JCT_AJ_Services_V3',
  initialPageLoadName: 'JCT_AJ_Services_V3',
  env: 'dev',

  VEHICLE_LOG:
    'https://devnwnjd.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-client=186&sap-language=EN#ZHR_ESS-vehiclelog',
  COV:
    'https://devnwnjd.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-client=186&sap-language=EN#ZHR_ESS-covclv',

  DOMAIN_URL: '',
  wsoTokenName: 'wsotoken',
  APPCODE: 'HR~PMP',
  opentelemetryConfig: {
    commonConfig: {
      console: true,
      production: false,
      logBody: true,
      serviceName: 'JCT_AJ_Services_V3',
      probabilitySampler: '0.7',
      logLevel: 9999,
    },
    batchSpanProcessorConfig: {
      maxQueueSize: '2048',
      maxExportBatchSize: '512',
      scheduledDelayMillis: '5000',
      exportTimeoutMillis: '30000',
    },
    otelcolConfig: {
      url: 'https://gepp-tempo.jio.ril.com/v1/traces',
    },
    jaegerPropagatorConfig: {
      customHeader: 'custom-header',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
