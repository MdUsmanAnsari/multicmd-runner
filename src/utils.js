const fs = require("fs");
const chalk = require("chalk");
const file = require("./file.json");
const CONFIG_FILENAME = "multicmd-runner.config.json";

function createConfigFile() {
  if (fs.existsSync(CONFIG_FILENAME)) {
    console.info(`\n✨ ${CONFIG_FILENAME} is already exits.\n`);
  } else {
    fs.writeFileSync(CONFIG_FILENAME, JSON.stringify(file), "utf8");
    console.info(`\n🚀 ${CONFIG_FILENAME} is created.\n`);
  }
}

function isNoCommandExists(data, type) {
  if (!data && !type) {
    console.error(chalk.red("\n Error: Config is empty."));
    process.exit(0);
  } else if (!type && !Array.isArray(data)) {
    console.error(
      chalk.red(
        "\n🐞 Error: If there is no specific key. JSON should be an array of commands."
      )
    );
    console.info(chalk.bold(`\nExample:`));
    console.info(`[{
     "title": "Dashboard Development Server",
     "command": "pnpm dev",
     "location": "/dashboard"
}]
    `);
    process.exit(0);
  } else if (type && Array.isArray(data)) {
    console.error(
      chalk.red("🐞 Error: JSON should be an array of commands.\n")
    );
    console.info(chalk.bold(`Example:`));
    console.info(`{
      "${type}": [
        {
          "title": "Dashboard Development Server",
          "command": "pnpm dev",
          "location": "/dashboard"
        }
      ]
}
    `);
    process.exit(0);
  } else if (Array.isArray(data) && data.length === 0) {
    console.info("\n😅 No commands specified!.");
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
    if (error.message === "Unexpected end of JSON input") {
      console.error(chalk.red("\n🐞 Error: Not a valid json file."));
    } else {
      console.error(
        chalk.red(
          "\n🐞 Error: 'multicmd-runner.config.json' file doesn't exist! Try 'multicmd-runner init' first.\n"
        )
      );
    }
    process.exit(0);
  }
}

module.exports = { createConfigFile, readConfigFile };
