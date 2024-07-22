import React from "react";
import Hero from "../components/Hero";
import Properties from "./Properties";
import Popular from "../components/Popular";
import Footer from "./Footer";
import CreateProduct from "../components/Tools/Product";

const Home = () => {

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
