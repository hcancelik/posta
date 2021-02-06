const { notarize } = require("electron-notarize");

const password = "@keychain:POSTA_APP_PASSWORD";

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  await notarize({
    appBundleId: "com.hcancelik.posta",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: "celik@me.com",
    appleIdPassword: password,
  });
};
