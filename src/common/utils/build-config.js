import fs from "fs";
import path from "path";
import logger from "./logger";

let config = {};

function buildConfig(configPath) {
  try {
    if (configPath && fs.existsSync(configPath)) {
      const data = fs.readFileSync(path.resolve(configPath), "utf8") || "";
      config = JSON.parse(data);
    } else {
      const data = fs.readFileSync(path.resolve(__dirname, "../config.json"), "utf8") || "";
      config = JSON.parse(data);
    }
  } catch (err) {
    logger.error(`Error while parsing config file ${err}`);
  }
}

const argv = require("minimist")(process.argv.slice(2));
buildConfig(argv.config || "");

export default config;
