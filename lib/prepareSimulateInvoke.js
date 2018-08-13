"use strict";

const _ = require("lodash");
const path = require("path");

/**
 * Special settings for use with serverless-simulate.
 */

module.exports = {
  prepareSimulateInvoke() {
    // Use service packaging for compile
    _.set(this.serverless, "service.package.individually", false);

    return this.serverless.pluginManager.spawn("webpack:validate").then(() => {
      if (!_.get(this.serverless, "serverless.service.custom.simulate.dist")) {
        _.set(
          this.serverless,
          "service.custom.simulate.dist",
          path.relative(
            this.serverless.config.servicePath,
            path.join(this.webpackOutputPath, "service")
          )
        );
      }
      return null;
    });
  }
};
