import React from "react";
import Hero from "../components/Hero";
import Properties from "./Properties";
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
  const notify = () => toast.success('Here is your toast.');

  return (
    <div>
      <Hero />
      <Properties/>
      <h1 className="h-screen place-content-center text-2xl text-center">
        Hi Matic, This is Home page
      </h1>
      <div>
      <button onClick={notify}>Make me a toast</button>
    </div>
    </div>
  );
};

export default Home;
