const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

let updater;
autoUpdater.autoDownload = false;

autoUpdater.on("error", (error) => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

autoUpdater.on("update-available", async () => {
  await dialog
    .showMessageBox({
      type: "info",
      title: "Updated Version Available",
      message: "There is a new version. Do you want update now?",
      buttons: ["Sure", "No"],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    });
});

autoUpdater.on("update-not-available", async () => {
  if (updater) {
    await dialog.showMessageBox({
      title: "No Updates Available",
      message: "Current version is up-to-date.",
    });

    updater.enabled = true;
    updater = null;
  }
});

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox({
      title: "Installing Updates",
      message:
        "Updates are downloaded, application will be quit for an update...",
    })
    .then(() => {
      setImmediate(() => autoUpdater.quitAndInstall());
    });
});

async function checkForUpdates(menuItem) {
  updater = menuItem;
  updater.enabled = false;

  await autoUpdater.checkForUpdates();
}

module.exports.checkForUpdates = checkForUpdates;
