import fs from "fs/promises";
import chalk from "chalk";
import parseArgv from "arg";

import { createRouteFiles } from "./utils/createRouteFiles";

async function devExecute() {
  const watcher = fs.watch("./src/pages", { recursive: true });
  const message = chalk.yellow("Watching /src/pages for changes");
  console.log(message);
  await createRouteFiles();
  for await (const _ of watcher) {
    const message = chalk.yellow("Something changed on /src/pages");
    console.log(message);
    await createRouteFiles();
  }
}

async function prodExecute() {
  await createRouteFiles();
  const message = chalk.yellow(
    "Watched /src/pages and created routes on App.tsx"
  );
  console.log(message);
}

type MainArgs = {
  "--mode"?: "development" | "production";
};

async function main(args: MainArgs) {
  if (args["--mode"] === "production") return prodExecute();
  return devExecute();
}

main(parseArgv({ "--mode": String, "-m": "--mode" }) as MainArgs);
