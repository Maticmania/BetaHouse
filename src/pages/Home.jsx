import React from "react";
import Hero from "../components/Hero";
import Properties from "./Properties";
import toast, { Toaster } from "react-hot-toast";
import { popularDb } from "../db/data";
import PropertyCarousel from "../components/PorpularCaro";
import Popular from "../components/Popular";
import Footer from "./Footer";

const Home = () => {
  const notify = () => toast.success("Here is your toast.");

  return (
    <div className="container mx-auto">
      <Hero />
      <Properties />
      <Popular />
      <Footer />
    </div>
  );
};

export default Home;
