import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/WishlistPage/Wishlist";
// import Cart from "./pages/CartPage/Cart";
import ProfilePage from "./pages/UserProfile/ProfilePage";
import Home from "./pages/Home/Home";
import ProductsByCategory from "./pages/ProductPages/ProductsByCategory";
import ProductsByCompany from "./pages/ProductPages/ProductsByCompany";
import ProductsBySubCategory from "./pages/ProductPages/ProductsBySubCategory";
import MyOrder from "./pages/MyOrderPage/MyOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "layouts/Admin.js";
import routes from "routes.js";
import CompanyCategory from "./pages/ProductPages/CompanyCategory";
import Fatura from "./pages/Fatura/Fatura";
import Checkout from "components/Payment/Checkout";
import CheckoutSuccess from "components/Payment/CheckoutSucces";
import ErrorPage from "components/ErrorPages/ErrorPage";
import LoginPage from "pages/Authentication/LoginPage";
import AccessDenied from "components/ErrorPages/AccessDenied";
import AlreadyLoggedIn from "components/ErrorPages/AlreadyLoggedIn";
import SignUp from "./pages/Authentication/SignUp";
import ProductsOnSale from "./pages/ProductPages/ProductsOnSale";
import "api/axiosConfig";
import PrivateRoute from "PrivateRoute";
import ProtectedRoute from "ProtectedRoute";
import "./App.css";
import CartTest from "pages/CartPage/CartTest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route
          path="/Checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/LogIn" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/already-logged-in" element={<AlreadyLoggedIn />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route
          path="/Products/Category/:categoryId"
          element={<ProductsByCategory />}
        />
        <Route
          path="/Products/Company/:companyId"
          element={<ProductsByCompany />}
        />
        <Route
          path="/Products/Category/:categoryId/SubCategory/:subCategoryId"
          element={<ProductsBySubCategory />}
        />
        <Route
          path="/Products/Company/:companyId/Category/:categoryId"
          element={<CompanyCategory />}
        />
        <Route path="Products/OnSale" element={<ProductsOnSale />} />
        <Route path="/ProductDetails/:productID" element={<ProductDetails />} />
        <Route
          path="/Fatura/:porosiaID"
          element={
            <ProtectedRoute>
              <Fatura />
            </ProtectedRoute>
          }
        />
        <Route path="/Cart" element={<CartTest/>}/>
        {/* <Route path="/Cart" element={<Cart />} /> */}
        <Route path="/Wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        <Route
          path="/ProfilePage"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MyOrder"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
