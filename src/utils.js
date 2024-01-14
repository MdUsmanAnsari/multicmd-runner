const fs = require("fs");
const chalk = require("chalk");
const file = require("./file.json");
const CONFIG_FILENAME = "multicmd-runner.config.json";

function createConfigFile() {
  if (!fs.existsSync(CONFIG_FILENAME)) {
    fs.writeFileSync(CONFIG_FILENAME, JSON.stringify(file), "utf8");
  }
}

function isNoCommandExists(data, type) {
  if (!data && !type) {
    console.error(chalk.red("Error: Config is empty."));
    process.exit(0);
  } else if (!type && !Array.isArray(data)) {
    console.error(
      chalk.red(
        "Error: If there is no category, JSON should be an array of objects."
      )
    );
    process.exit(0);
  } else if (type && Array.isArray(data)) {
    console.error(chalk.red("Error: JSON should be an array of objects"));
    process.exit(0);
  }
  return type ? data[type] : data;
}

function readConfigFile(type) {
  try {
    const file = fs.readFileSync(CONFIG_FILENAME, "utf8");
    const jsonData = JSON.parse(file);
    return isNoCommandExists(jsonData, type);
  } catch (error) {
    console.error(
      chalk.red(
        "Error: 'multicmd-runner.config.json' file doesn't exist! Try 'multicmd-runner init' first.\n"
      )
    );
    process.exit(0);
  }
}

module.exports = { createConfigFile, readConfigFile };
