import React from "react";
import { Hero } from "../../components/Hero/Hero";
import { HomeNews } from "../../components/HomeNews";

const Homepage = () => {
  return (
    <div className="py-24 px-20">
      <div className="flex justify-center">
        <Hero />
      </div>
      <HomeNews />
    </div>
  );
};

export default Homepage;
