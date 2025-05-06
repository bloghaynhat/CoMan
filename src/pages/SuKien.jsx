import React, { useEffect, useState } from "react";
import FeaturedEventsBanner from "../components/FeaturedEventsBanner";
import FeaturedEventsBannerAll from "../components/FeaturedEventsBannerAll";

const SuKien = () => {
  // Thêm title cho trang
  useEffect(() => {
    document.title = "Sự kiện";
    return () => {
      document.title = "Coman"; // Reset title khi unmount
    };
  }, []);
  return (
    <div className="max-w-9xl mx-auto px-4 py-8">
      <FeaturedEventsBanner />
      <FeaturedEventsBannerAll />
    </div>
  );
};

export default SuKien;
