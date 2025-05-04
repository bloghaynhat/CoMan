import React, { useState } from "react";
import FeaturedEventsBanner from "../components/FeaturedEventsBanner";
import FeaturedEventsBannerAll from "../components/FeaturedEventsBannerAll";
const SuKien = () => {


  return (
    <div className="max-w-9xl mx-auto px-4 py-8">
      
      <FeaturedEventsBanner />
      <FeaturedEventsBannerAll />
    </div>
  );
};

export default SuKien;