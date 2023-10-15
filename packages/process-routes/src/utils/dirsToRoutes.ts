import { Dir } from "../entities/Dir";
import { Route } from "../entities/Route";

String.prototype.splitToCammelCase = function (splitter: string) {
  return this.split(splitter)
    .filter(Boolean)
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join("");
};

export function dirsToRoutes(dirs: Dir[]): Route[] {
  const routes: Route[] = [];
  for (const dir of dirs) {
    if (dir.isDirectory && !!dir.dirs) {
      routes.push(...dirsToRoutes(dir.dirs));
      continue;
    }
    if (dir.isFile && dir.name !== "index.tsx") continue;
    routes.push({
      componentName:
        dir.path.replace("./src/pages", "").splitToCammelCase("/") + "Index",
      importPath: dir.path.replace("/src", "") + "/index",
      path: dir.path.replace("./src/pages", "") || "/",
    });
  }
  return routes;
}
