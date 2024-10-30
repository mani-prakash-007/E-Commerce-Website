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
import { useSelector } from "react-redux";
import { Register } from "./Components/pages/Register.jsx";
import { AddProducts } from "./Components/pages/AddProducts.jsx";

const App = () => {
  const isLoggedIn = useSelector((state) => state.loginDetails.isLoggedin);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Public Route for Login */}
        <Route path="register" element={<Register />} />

        {/* Public Route - Index route */}
        <Route index element={!isLoggedIn ? <Login /> : <Home />} />

        {/* Public Route for Login */}
        <Route path="login" element={isLoggedIn ? <Home /> : <Login />} />

        {/* Private Routes */}
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
          <Route path="add-product" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Undefined Routes */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    ),
    {
      basename: "/E-Commerce-Website",
    }
  );

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
