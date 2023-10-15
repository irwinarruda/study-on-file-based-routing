import fs from "fs/promises";
import { Dir } from "../entities/Dir";

export async function readDir(path: string) {
  const readDirs = await fs.readdir(path, { withFileTypes: true });
  const dirs: Dir[] = [];
  for (const rDir of readDirs) {
    const dir: Dir = {
      name: rDir.name,
      path: rDir.path,
      isDirectory: rDir.isDirectory(),
      isFile: rDir.isFile(),
    };
    if (rDir.isDirectory())
      dir.dirs = await readDir(rDir.path + "/" + rDir.name);
    dirs.push(dir);
  }
  return dirs;
}
