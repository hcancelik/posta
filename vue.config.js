module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      const argList = [...args];

      argList[0].title = process.env.APP_TITLE;

      return argList;
    });
  },
};
