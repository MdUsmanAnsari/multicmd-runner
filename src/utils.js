const fs = require("fs");
const chalk = require("chalk");
const defaultConfig = require("./file.json");
const CONFIG_FILENAME = "multicmd-runner.config.json";

function createConfigFile() {
  if (fs.existsSync(CONFIG_FILENAME)) {
    console.info(`\n✨ ${CONFIG_FILENAME} already exists.\n`);
    return;
  }

  fs.writeFileSync(
    CONFIG_FILENAME,
    JSON.stringify(defaultConfig, null, 2),
    "utf8"
  );

  console.info(`\n🚀 ${CONFIG_FILENAME} has been created successfully.\n`);
}

function getCommands(data, key) {
  if (!data) {
    console.error(chalk.red("\n❌ Error: Configuration is empty."));
    process.exit(1);
  }

  if (!key && !Array.isArray(data)) {
    console.error(
      chalk.red(
        "\n🐞 Error: The configuration must be an array of commands when no specific key is provided."
      )
    );
    printExampleWithoutKey();
    process.exit(1);
  }

  if (key && Array.isArray(data)) {
    console.error(
      chalk.red(
        "\n🐞 Error: The configuration should use a key when structured as an object."
      )
    );
    printExampleWithKey(key);
    process.exit(1);
  }

  if (Array.isArray(data) && data.length === 0) {
    console.info("\n😅 No commands specified in the configuration.");
    process.exit(1);
  }

  return key ? data[key] : data;
}

function readConfigFile(key) {
  try {
    const fileContent = fs.readFileSync(CONFIG_FILENAME, "utf8");
    const jsonData = JSON.parse(fileContent);
    return getCommands(jsonData, key);
  } catch (error) {
    if (error.message.includes("Unexpected end of JSON input")) {
      console.error(
        chalk.red("\n🐞 Error: The configuration file contains invalid JSON.")
      );
    } else {
      console.error(
        chalk.red(
          `\n🐞 Error: ${CONFIG_FILENAME} does not exist or is inaccessible. Try running 'multicmd-runner init' to create it.\n`
        )
      );
    }
    process.exit(1);
  }
}

function printExampleWithoutKey() {
  console.info(chalk.bold("\nExample of valid configuration (Array):"));
  console.info(`[
  {
    "title": "Dashboard Development Server",
    "command": "pnpm dev",
    "location": "/dashboard"
  }
]
`);
}

function printExampleWithKey(key) {
  console.info(
    chalk.bold("\nExample of valid configuration (Object with Key):")
  );
  console.info(`{
  "${key}": [
    {
      "title": "Dashboard Development Server",
      "command": "pnpm dev",
      "location": "/dashboard"
    }
  ]
}
`);
}

module.exports = { createConfigFile, readConfigFile };
