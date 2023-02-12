const config = require("../config.global.json");

class GlobalConfig {
  getConfig() {
    return config;
  }
}

module.exports = new GlobalConfig();
