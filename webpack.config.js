const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ks",
    projectName: "planets",
    webpackConfigEnv,
    argv,
  });

  // const standalonePlugin = defaultConfig.plugins.find(
  //   (p) => p.constructor.name === "StandaloneSingleSpaPlugin"
  // );

  // standalonePlugin.options.importMapUrl = new URL(
  //   "https://react.microfrontends.app/importmap.json"
  // );

  const externals = [/^rxjs\/?.*$/];

  if (webpackConfigEnv.standalone) {
    externals.push("react", "react-dom");
  }

  return merge(defaultConfig, {
    // customizations go here
    externals,
    resolve: {
      alias: {
        "@@": [path.resolve(__dirname, "src")],
      },
    },
  });
};
