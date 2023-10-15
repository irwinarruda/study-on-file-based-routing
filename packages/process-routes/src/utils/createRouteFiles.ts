import fs from "fs/promises";

import { getAppTemplate } from "../templates/app";
import { getMainTemplate } from "../templates/main";
import { readDir } from "../utils/readDir.js";

export async function createRouteFiles() {
  const dirs = await readDir("./src/pages");
  const main = getMainTemplate();
  const app = getAppTemplate({ dirs });
  await Promise.all([
    fs.writeFile("./src/main.tsx", main),
    fs.writeFile("./src/App.tsx", app),
  ]);
}
