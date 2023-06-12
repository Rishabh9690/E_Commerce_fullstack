import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Home/Product";
import Registration from "./components/Registration/Registration";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import AddAddress from "./components/AddAddress/Addaddress";
import ChangePassword from "./components/Profile/ChangePassword";
import UpdateAddress from "./components/UpdateAddress/UpdateAddress";
import Wishlist from "./components/Wishlist/Wishlist";
import EmptyWishList from "./components/Wishlist/EmptyWishList";
import Cart from "./components/Cart/Cart";
import EmptyCartModal from "./components/Cart/EmptyCartModal";
import Order from "./components/Order/Order";
import Order2 from "./components/Order/Order2";
import OrderHistory from "./components/Order/OrderHistory";
import UpdateOrder from "./components/Order/UpdateOrder";
import NavbarComp from "./containers/Navbar/Navbar";
import PrivateRoutes from "./components/util/PrivateRoutes";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

function App() {
  return userId && token ? (
    <div className="App">
      <NavbarComp />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/updateAddress" element={<UpdateAddress />} />
          <Route path="/wishList" element={<Wishlist />} />
          <Route path="/emptyWishList" element={<EmptyWishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="emptyCart" element={<EmptyCartModal />} />
          <Route path="/order" element={<Order2 />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/updateOrder" element={<UpdateOrder />} />
        </Route>
      </Routes>
    </div>
  ) : (
    <div className="App">
      <NavbarComp />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
