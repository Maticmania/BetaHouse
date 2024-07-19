import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import toast, { Toaster } from 'react-hot-toast';
import Profile from "./components/Profile";
import UserProfile from "./components/Profile";



function App() {
  return (
    <>
<Toaster
  position="top-center"
  reverseOrder={false}
/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
