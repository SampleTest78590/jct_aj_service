const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "JCT_AJ_Services_V3",

  // exposes: {
  //   './Component': './src/app/app.component.ts',
  // },
  exposes: {
    "./child": "./src/app/modules/services-root/services.module.ts",
    // "./Component":"./src/app/modules/employees-root/employees/emp-summery/emp-summery/emp-summery.component.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
