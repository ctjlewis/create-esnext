import { mkdir, readFile, writeFile } from "fs/promises";
import { createShell } from "await-shell";
import { existsSync } from "fs";
import { resolve } from "path";

import chalk from "chalk";

export const init = async () => {
  const shell = createShell({
    log: false,
    stdio: ["ignore", "ignore", "inherit"],
  });

  await shell.run("npm init -y");

  /**
   * Standardize package.json.
   */
  const packageJsonText = await readFile("package.json", "utf8");
  const packageJson = JSON.parse(packageJsonText);

  delete packageJson.main;
  delete packageJson.type;

  const { name, version, ...rest } = packageJson;

  const standardized = {
    name,
    version,
    type: "module",
    module: "index.js",
    ...rest,
  };

  const standardizedText = JSON.stringify(standardized, null, 2);
  await writeFile("package.json", standardizedText);

  // eslint-disable-next-line no-console
  console.log(
    "\n",
    chalk.bold("Wrote package.json for ES Module:\n\n"),
    chalk.gray(standardizedText),
    "\n",
  );
};

export const createESNext = async (projectName: string) => {
  const projectPath = resolve(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    throw new Error(`Directory ${projectPath} already exists`);
  }

  const shell = createShell({
    log: false,
    stdio: ["ignore", "ignore", "inherit"]
  });

  await mkdir(projectPath);
  process.chdir(projectPath);

  await shell.run("npm init -y");

  /**
   * Standardize package.json.
   */
  const packageJsonText = await readFile("package.json", "utf8");
  const packageJson = JSON.parse(packageJsonText);

  delete packageJson.main;
  delete packageJson.type;

  const { name, version, ...rest } = packageJson;

  const standardized = {
    name,
    version,
    type: "module",
    module: "index.js",
    ...rest,
  };

  const standardizedText = JSON.stringify(standardized, null, 2);
  await writeFile("package.json", standardizedText);

  // eslint-disable-next-line no-console
  console.log(
    `Created project at ${chalk.bold(projectPath)}.\n\nWrote package.json:\n`,
    chalk.gray(standardizedText)
  );
};