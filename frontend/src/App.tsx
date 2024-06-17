import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import MyCart from "./pages/MyCart";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";

function App() {
  const storage = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {storage ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </>
      ) : (
        <SignUp />
      )}
    </BrowserRouter>
  );
}

export default App;
