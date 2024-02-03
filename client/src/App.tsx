import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Code from "./pages/Code";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/session" element={<Code />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/:userId" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;