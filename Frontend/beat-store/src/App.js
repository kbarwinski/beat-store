import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import MusicPlayer from "./components/music-player/music-player.component";
import HomePage from "./pages/home/homepage.component";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import CheckoutPage from "./pages/checkout/checkout-page.component";
import LoginPage from "./pages/login/loginpage.component";
import RegistrationPage from "./pages/registration/registrationpage.component";
import CartModal from "./components/cart-modal/cart-modal.component";
import AudioCrudPage from "./pages/audiocrud/audiocrud-page.component";
import CrudModal from "./components/crud-modal/crud-modal.component";
import StripeModal from "./components/stripe-modal/stripe-modal.component";
import OrderPage from "./pages/order/orderpage.component";
import FulfilledOrderPage from "./pages/fulfilledorder/fulfilledorder-page.component";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/store"
          element={<HomePage onlyBookmarked={false} />}
        />
        <Route
          exact
          path="/bookmarked"
          element={<HomePage onlyBookmarked={true} />}
        />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/audiocrud" element={<AudioCrudPage />} />
        <Route exact path="/order" element={<OrderPage />} />
        <Route exact path="/fulfilledorder" element={<FulfilledOrderPage />} />
        <Route path="/*" element={<Navigate to="store" />} />
      </Routes>
      <MusicPlayer />

      <CartModal />
      <CrudModal />
      <StripeModal />
    </BrowserRouter>
  );
}

export default App;
