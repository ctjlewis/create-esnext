import test from "ava";

import { mkdir, readFile, rm, rmdir } from "fs/promises";
import { existsSync } from "fs";
import { resolve } from "path";
import { tmpdir } from "os";

import { createShell } from "await-shell";

const TEST_DIR = resolve(tmpdir(), "create-esnext-test");
if (existsSync(TEST_DIR)) {
  await rmdir(TEST_DIR, { recursive: true });
}

await mkdir(TEST_DIR, { recursive: true });
process.chdir(TEST_DIR);

const shell = createShell();

test.beforeEach(async () => {
  if (existsSync("package.json")) {
    await rm("package.json");
  }
});

test.serial("should create new module with type: module", async (t) => {
  await t.notThrowsAsync(
    async () => await shell.run("create-esnext")
  );

  t.snapshot(await readFile("package.json", "utf8"));
});

test.serial("should work with npm init", async (t) => {
  await t.notThrowsAsync(
    async () => await shell.run("npm init esnext")
  );
});

test.serial("should work with yarn create", async (t) => {
  await t.notThrowsAsync(
    async () => await shell.run("yarn create esnext")
  );
});