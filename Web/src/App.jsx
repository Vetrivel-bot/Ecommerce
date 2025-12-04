import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom"; // Added Outlet

// --- CONTEXT ---
import { ThemeContext } from "./context/ThemeContext";

// --- COMPONENTS ---
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import ProductDisplay from "./components/ProductDisplay";
import AuthLayout from "./components/layout/AuthLayout"; // Import the AuthLayout created previously

// --- PAGES ---
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Import the new Signup page

// --- LAYOUT WRAPPERS ---

// 1. Main Layout: Includes Navbar, Footer, and Padding
// Used for standard pages (Home, Shop, About, etc.)
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      <div
        style={{
          paddingTop: "90px",
          width: "100%",
          minHeight: "100vh", // Ensures footer pushes down
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Outlet renders the child route (Home, Shop, etc.) */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.style.backgroundColor = theme.bg;
    document.body.style.backgroundColor = theme.bg;
    document.documentElement.style.color = theme.text;
  }, [theme]);

  return (
    <>
    
      <ScrollToTop /> {/* Global scroll reset on route change */}
      <Routes>
        {/* GROUP 1: Authentication Routes (Full Screen, No Navbar/Footer) */}
        {/* The AuthLayout holds the background slider state so it doesn't reset */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* GROUP 2: Main Application Routes (With Navbar & Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDisplay />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
