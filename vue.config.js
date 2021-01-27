module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
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
