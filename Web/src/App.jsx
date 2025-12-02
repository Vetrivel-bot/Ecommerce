import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/layout/navbar"; // Ensure this path matches your file structure
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    // 1. Wrap everything in ThemeProvider so the Context and Background styles apply
    <ThemeProvider>
      <Navbar />

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
    </ThemeProvider>
  );
}

export default App;
