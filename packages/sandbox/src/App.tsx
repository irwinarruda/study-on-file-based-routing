import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutIndex from "./pages/about/index";
import Index from "./pages/index";
import ProductsIndex from "./pages/products/index";
import ProductsOneIndex from "./pages/products/one/index";
import ProductsOneTwoIndex from "./pages/products/one/two/index";

const router = createBrowserRouter([
  {
    path: "/about",
    element: <AboutIndex />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/products",
    element: <ProductsIndex />,
  },
  {
    path: "/products/one",
    element: <ProductsOneIndex />,
  },
  {
    path: "/products/one/two",
    element: <ProductsOneTwoIndex />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;