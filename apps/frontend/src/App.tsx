import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout_sidebar from "./pages/layout_sidebar";
import Home from "./pages/home";
import Records from "./pages/records";
import Form from "./pages/form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout_sidebar />}>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="records" element={<Records />} />
          </Route>
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
