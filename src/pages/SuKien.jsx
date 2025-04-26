import React, { useState } from "react";
import FeaturedEventsBanner from "../components/FeaturedEventsBanner";
import FeaturedEventsBannerAll from "../components/FeaturedEventsBannerAll";
const SuKien = () => {


  return (
    <div className="max-w-9xl mx-auto px-4 py-8">
      <blockquote className="border-l-4 border-blue-500 pl-4 italic">
        <h2 className="text-2xl font-bold mb-6">Sự kiện nổi bật</h2>
      </blockquote>
      <FeaturedEventsBanner />
      <FeaturedEventsBannerAll />
    </div>
  );
};

export default SuKien;