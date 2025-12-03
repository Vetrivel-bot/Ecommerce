import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/navbar"; // Ensure this path matches your file structure
import { ThemeContext } from "./context/ThemeContext";
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
      <div
        style={{
          paddingTop: "90px",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
