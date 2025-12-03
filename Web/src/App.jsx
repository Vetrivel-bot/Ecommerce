import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar"; // Ensure this path matches your file structure
import { ThemeContext } from "./context/ThemeContext";
import ProductDisplay from "./components/ProductDisplay";
import ScrollToTop from "./components/ScrollToTop";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
function App() {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.style.backgroundColor = theme.bg;
    document.body.style.backgroundColor = theme.bg;
    document.documentElement.style.color = theme.text;
  }, [theme]);
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <ScrollToTopButton />

      <div
        style={{
          paddingTop: "90px",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDisplay />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
