import React from "react";
import PropertyCarousel from "./PorpularCaro";
import { popularDb } from "../db/data";

const Popular = () => {
  return (
    <div>
      <PropertyCarousel properties={popularDb} />
    </div>
  )
}

export default Popular
