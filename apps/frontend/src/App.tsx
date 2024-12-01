import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./components/ChatPage";
import Page from "./pages/page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Page />} />
          <Route path="/chat/:patientId" element={<ChatPage />} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<LayoutSidebar />}>
            <Route index element={<Home />} />
            <Route path="records" element={<Records />} />
            <Route path="form" element={<Form />} />
            <Route path="chat" element={<Chat />} /> {/* New chat route */}
        {/* </Route> */}
        {/* </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
