module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["knex", "sqlite3"],
      builderOptions: {
        productName: "Posta",
        extraResources: ["migrations/*.js"],
        mac: {
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: "build/entitlements.mac.plist",
          entitlementsInherit: "build/entitlements.mac.plist",
        },
        linux: {
          category: "Utility",
        },
        afterSign: "notarize.js",
        publish: ["github"],
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      const argList = [...args];

      argList[0].title = process.env.VUE_APP_TITLE;

      return argList;
    });
  },
};
