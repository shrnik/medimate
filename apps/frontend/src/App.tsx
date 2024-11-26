import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutSidebar from "./pages/layout_sidebar";
import Home from "./pages/home";
import Records from "./pages/records";
import Form from "./pages/form";
import Chat from "./pages/chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutSidebar />}>
            <Route index element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="form" element={<Form />} />
            <Route path="chat" element={<Chat />} /> {/* New chat route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
