import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import MyCart from "./pages/MyCart";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
