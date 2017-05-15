var utils = require("nextap-base-utility").utils;

var globalConfig = require("raw!./configurations/config.global.json");
var localConfig = require("raw!./configurations/config.local.json");

var config;

if (localConfig) {
    globalConfig = JSON.parse(globalConfig);
    localConfig = JSON.parse(localConfig);
    config = utils.combine(globalConfig, localConfig);
} else {
    config = globalConfig;
}
export default config;
