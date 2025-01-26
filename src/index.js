#!/usr/bin/env node
const { spawn } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const { createConfigFile, readConfigFile } = require("./utils");
const { program } = require("commander");

const arguments = program.parse(process.argv).args;

function runCommands(commands) {
  for (const { command, location, title } of commands || []) {
    const resolvedPath = path.resolve(`.${location}`);

    const processInstance = spawn(command, {
      shell: true,
      cwd: resolvedPath,
    });

    const outputPrefix = title || location;

    processInstance.stdout.on("data", (data) => {
      console.log(`[${outputPrefix}]: ${data.toString().trim()}`);
    });

    processInstance.stderr.on("data", (data) => {
      console.error(`[${outputPrefix}]: ${data.toString().trim()}`);
    });

    processInstance.on("close", (code) => {
      console.log(`[${outputPrefix}]: Process exited with code ${code} 🔥`);
    });

    processInstance.on("error", (error) => {
      console.error(
        chalk.red(
          `\n❌ Error: The location might be incorrect. Please check the path.`
        )
      );
      console.error(
        chalk.yellow(
          `🔥 Hint: Location should start with '/' like '/api' or '/dashboard'.\nYour location: ${resolvedPath}\nError Details: ${error.message}`
        )
      );
      process.exit(1);
    });
  }
}

if (arguments.includes("init")) {
  createConfigFile();
} else {
  const cmds = readConfigFile(arguments[0]);
  runCommands(cmds);
}
