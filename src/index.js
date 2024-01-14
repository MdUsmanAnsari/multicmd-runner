#!/usr/bin/env node
const { spawn } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const { createConfigFile, readConfigFile } = require("./utils");

const { program } = require("commander");
const argument = program.parse(process.argv).args;

function runCommands(commands) {
  for (const { command, location, title } of commands || []) {
    const resolvedPath = path.resolve(`.${location}`);
    const terminal = spawn(command, {
      shell: true,
      cwd: resolvedPath,
    });

    const outputPrefix = title || location;

    terminal.stdout.on("data", (data) => {
      console.log(`[${outputPrefix}]: ${data}`);
    });

    terminal.stderr.on("data", (data) => {
      console.error(`[${outputPrefix}]:  ${data}`);
    });
    terminal.on("close", (code) => {
      console.log(`[${outputPrefix}]: process exited with code ${code} 🔥`);
    });

    terminal.on("error", () => {
      console.error(
        chalk.red(
          `Error: Might be location is incorrect! please check once.\n🔥 Should be start with '/' like: '/api' or '/dashboard'\n Your location: ${resolvedPath}`
        )
      );
      process.exit(0);
    });
  }
}

const commands = {
  init: () => {
    createConfigFile();
  },
  runCommands: (type) => {
    const cmds = readConfigFile(type);
    runCommands(cmds);
  },
};

if (argument.includes("init")) {
  commands.init();
} else {
  commands.runCommands(argument[0]);
}
