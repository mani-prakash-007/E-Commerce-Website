import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { Home } from "./Components/Home/Home.jsx";
import { Product } from "./Components/pages/Product.jsx";
import { Cart } from "./Components/pages/Cart.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store.js";
import { ErrorPage } from "./ErrorPage.jsx";
import { Category } from "./Components/pages/Category.jsx";
import { Admin } from "./Components/pages/Admin.jsx";
import { Orders } from "./Components/pages/Orders.jsx";
import { Login } from "./Components/pages/Login.jsx";
import { PrivateRoute } from "./Components/Routes/PrivateRoute.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Public Route - Index route */}
        <Route index path="" element={<Login />} />

        {/* Public route for redirecting while not authenticated */}
        <Route index path="login" element={<Login />} />

        {/* Private Route  */}
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="product">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="category">
            <Route path=":categoryName" element={<Category />} />
          </Route>
          <Route path="admin" element={<Admin />} />
          <Route path="orders" element={<Orders />} />
          
        </Route>

        {/*Undefined Routes*/}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    ),
    {
      basename: "/E---Commerce-Website",
    }
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
