# <img src="./assets/icon-path.svg" height="50pd" align="center" /> Sudy on file-based routing

## Introduction

File-based routing is a technique for creating layouts and pages based on the name and position of the files within a directory.

File-based routing has always existed. Some years ago, it was common to use this method for creating web pages with PHP. However, with the popularization of SPA frameworks, we began to see the use of File-based routing fade. Then, Next.js came to life and brought back a lot of old concepts, one of them was File-based routing.

At some point, Remix also came along with an improved version of File-based routing and forced Next.js to develop a new method for rendering pages and layouts that seems promising, the App Router. A lot of other frameworks like Solid Start and Svelte Kit, Qwik, and others are also following this trend.

It's now evident that this method is becoming the standard for creating pages. Because of that, I must understand it deeply, so I've created this repository to register my process of learning File-based routing.

## Roadmap

I have a brief idea of how File-based routing works, and here is my plan:

1. **Create a Simple App**: Begin by setting up a simple application using Vite and React.
2. **Build a Basic Router Component**: Develop a **basic router component** that dynamically imports routes from a './page' directory.
3. **CLI Tool for File Reading**: Develop a command-line interface (CLI) tool capable of scanning all files within the './page' directory.
4. **Convert Files in CLI**: Within the CLI, establish a service to transform each valid file into an import for the **basic router component**.
5. **Automate with Script**: Create a script that monitors changes in the './page' directory and dynamically recreates the **basic router component** accordingly.
6. **Run CLI with Vite in Watch Mode**: Establish a method to execute the CLI tool seamlessly with Vite in development watch mode.
7. **Hide Router Component**: Explore options for concealing the **basic router component** from developers, possibly within 'node_modules,' to restrict unintended modifications.
8. **Validation Function in CLI**: Implement a function within the CLI to validate whether the './page' file has a legitimate default export component. If not, automatically remove it from the list.
9. **Implement a Provider Wrapper**: Integrate a wrapper for providers, similar to Next.js's 'app.tsx.'
10. **Decision Point**: Evaluate the progress and make decisions on the next steps.

[Note: Tasks 7 to 10 are not yet completed.]

## Hightlights

You can see the code in this repo. The `sandbox` package is the test app that has the basic router component (App.tsx), and the `process-routes` is the CLI tool built with rollup. Here are some hightlites of the code.

### ReadDir function

While `Node` does provide a file reader function, transforming each file into a component required a tree-like structure to handle nested pages, such as `/products/one`. To handle this, I created a new `readDir` recursive function that converts `Node.Dirent` to a custom type to help handling those nested structures.

```ts
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
```

[Note: Since this function is async, it can be optimized by running it concurrently]

### Dir to routes

After parsing the entire `./page` directory, I had to flatten it into a new structure that simplifies the process of recreating the `App.tsx`.

```ts
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
```

### The App.tsx component

Using the `dirsToRoutes` function, it was easy to create a template for the `App.tsx` file

```tsx
export function getAppTemplate({ dirs }: GetAppTemplateArgs) {
  const routes = dirsToRoutes(dirs);
  return `import { createBrowserRouter, RouterProvider } from "react-router-dom";
${routes
  .map((r) => `import ${r.componentName} from "${r.importPath}";`)
  .join("\n")}

const router = createBrowserRouter([
${routes
  .map(
    (r) => `  {
    path: "${r.path}",
    element: <${r.componentName} />,
  },`
  )
  .join("\n")}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;`;
}
```

### Hidding App.tsx

🚧 Work in progress...
