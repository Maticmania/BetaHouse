import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import toast, { Toaster } from 'react-hot-toast';
import UserProfile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";



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
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
