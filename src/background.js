import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  Menu,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension from "electron-devtools-installer";
import settings from "electron-settings";
import knex from "knex";
import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { autoUpdater } from "electron-updater";
import template from "./menus";
import knexfile from "../knexfile";
import emailHelper from "./helpers/email";

const isDevelopment = process.env.NODE_ENV !== "production";
let win;
let db;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// Set Menu
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// Set Theme
(async () => {
  const theme = await settings.get("theme");
  nativeTheme.themeSource = ["system", "dark", "light"].includes(theme)
    ? theme
    : "system";

  ipcMain.handle("theme:change", (event, themeOption) => {
    nativeTheme.themeSource = themeOption;

    return nativeTheme.themeSource;
  });
})();

// Save Window Bounds
async function saveWindowBounds() {
  const bounds = win.getBounds();

  await settings.set("window-size", bounds);
}

// Setup Database
(async () => {
  const dbConfig = knexfile[process.env.NODE_ENV];
  db = knex(dbConfig);

  let config = {};

  if (!isDevelopment) {
    config = {
      directory: `${process.resourcesPath}/migrations`,
    };
  }

  await db.migrate.latest(config);
})();

// Setup SMTP Server
const server = new SMTPServer({
  secure: false,
  size: 1024 * 1024,
  disableReverseLookup: true,
  hideSTARTTLS: true,
  onAuth(auth, session, callback) {
    callback(null, { user: auth.username });
  },
  async onData(stream, session, callback) {
    const mailboxName = session.user;
    let raw = "";

    stream
      .on("data", (data) => {
        raw += data;
      })
      .on("end", () => {
        simpleParser(raw).then(async (emailData) => {
          const email = await emailHelper.saveEmail(
            db,
            mailboxName,
            emailData,
            raw
          );

          const notificationSoundSetting = await settings.get(
            "notification-sound"
          );

          win.webContents.send("refresh-mailboxes", {
            email,
            mailboxName,
            notificationSoundSetting,
          });
        });

        callback(null);
      });
  },
});

async function startSmtpServer() {
  const port = (await settings.get("port")) || "2525";

  server.listen(port, async () => {
    await settings.set("server-running", true);

    await win.webContents.send("server-status-change", {
      status: true,
      message: "Running",
    });
  });

  server.on("error", async (error) => {
    await settings.set("server-running", false);

    await win.webContents.send("server-status-change", {
      status: false,
      message:
        error.code === "EADDRINUSE"
          ? "Cannot start server. Port in use! Please try with different port number."
          : error.message,
      code: error.code,
    });
  });
}

async function stopSmtpServer() {
  server.close(async () => {
    await settings.set("server-running", false);

    await win.webContents.send("server-status-change", {
      status: false,
      message: "Stopped",
    });
  });
}

ipcMain.handle("server:start", async () => {
  await startSmtpServer();
});

ipcMain.handle("server:stop", async () => {
  await stopSmtpServer();
});

ipcMain.handle("restart-app", () => {
  app.relaunch({
    args: process.argv.slice(1).concat(["--relaunch"]),
  });

  app.exit(0);
});

async function createWindow() {
  const windowBounds = await settings.get("window-size");

  win = new BrowserWindow({
    title: process.env.VUE_APP_TITLE,
    width: windowBounds ? windowBounds.width : 1600,
    height: windowBounds ? windowBounds.height : 1200,
    x: windowBounds ? windowBounds.x : null,
    y: windowBounds ? windowBounds.y : null,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      devTools: isDevelopment,
      enableRemoteModule: true,
    },
    minWidth: 1200,
    minHeight: 600,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");

    await win.loadURL("app://./index.html");

    await autoUpdater.checkForUpdatesAndNotify();
  }

  win.on("resize", async () => {
    await saveWindowBounds();
  });

  win.on("move", async () => {
    await saveWindowBounds();
  });

  win.on("close", async () => {
    await saveWindowBounds();
  });

  ipcMain.on("window:reset-size", () => {
    win.setBounds({
      width: 1600,
      height: 1200,
    });

    win.center();
  });
}

app.on("activate", async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension({
        id: "ljjemllljcmogpfapbkkighbhhppjdbg",
        electron: ">=1.2.1",
      });
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  await createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
