export const environment = {
  production: true,
  DOMAIN_URL: '',
  HR_URL: '',
  COMMON_UTIL: '',

  // APM RUM Vars
  apmUrl: 'https://hrplatform.ril.com/apmrum/',
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
    'https://fiorinjp.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-ushell-config-url%3Dcfg%2Fsap%2FCacheBuster.json&sap-theme=ZRIL_HC_BASE%40%2Fsap%2Fpublic%2Fbc%2Fthemes%2F~client-586&sap-ushell-config=headerless#ZHR_ESS-vehiclelog?appAct=payroll&semObj=ZHR_ESS',
  COV:
    'https://fiorinjp.ril.com/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html?saml2=disabled&sap-ushell-config-url%3Dcfg%2Fsap%2FCacheBuster.json&sap-theme=ZRIL_HC_BASE%40%2Fsap%2Fpublic%2Fbc%2Fthemes%2F~client-586&sap-ushell-config=headerless#ZHR_ESS-covclv?appAct=payroll&semObj=ZHR_ESS',

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
