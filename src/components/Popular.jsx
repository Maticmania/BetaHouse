import React from "react";
import { popularDb } from "../db/data";
import PropertyCarousel from "./PorpularCaro";

const Popular = () => {
  return (
    <div>
      <PropertyCarousel properties={popularDb} />
    </div>
  )
}

export default Popular
