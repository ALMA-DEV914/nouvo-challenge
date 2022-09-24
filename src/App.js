//import dependencies and related components
import React from "react";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";

function App() {
  //content sections
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

//export the App default
export default App;
