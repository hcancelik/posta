import { checkForUpdates } from "./updater";

const { shell, ipcMain } = require("electron");

const isMac = process.platform === "darwin";
const isDevelopment = process.env.NODE_ENV !== "production";

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: process.env.VUE_APP_NAME,
          submenu: [
            { role: "about" },
            {
              label: "Check For Updates",
              click: async (menuItem) => {
                await checkForUpdates(menuItem);
              },
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      ...(isDevelopment ? [{ role: "reload" }, { role: "forceReload" }] : []),
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
      ...(isDevelopment ? [{ role: "toggleDevTools" }] : []),
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      {
        label: "Reset Window Size",
        click: async () => {
          ipcMain.emit("window:reset-size");
        },
      },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More About Posta",
        click: async () => {
          await shell.openExternal(process.env.VUE_APP_URL);
        },
      },
    ],
  },
];

export default template;
