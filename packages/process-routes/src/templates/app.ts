import { Dir } from "../entities/Dir";
import { dirsToRoutes } from "../utils/dirsToRoutes";

export type GetAppTemplateArgs = {
  dirs: Dir[];
};

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
