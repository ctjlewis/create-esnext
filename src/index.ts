#!/usr/bin/env node

import { program } from "commander";

import { init } from "./lib";

program
  .command("init", { isDefault: true })
  .action(init);

program.parse(process.argv);