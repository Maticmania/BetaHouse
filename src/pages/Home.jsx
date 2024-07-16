import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1 className="h-screen place-content-center text-2xl text-center">
        Hi Matic, This is Home page
      </h1>
    </div>
  );
};

export default Home;
