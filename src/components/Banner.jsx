// Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Học mọi lúc, mọi nơi cùng Coman",
    description:
      "Khám phá hàng trăm khóa học từ cơ bản đến nâng cao, giúp bạn chinh phục mọi mục tiêu học tập.",
  },
  {
    title: "Nâng cao kỹ năng của bạn",
    description:
      "Từ lập trình, thiết kế đến marketing – có khóa học cho tất cả mọi người.",
  },
  {
    title: "Học tập dễ dàng, hiệu quả",
    description:
      "Giao diện thân thiện, bài giảng chất lượng – học chưa bao giờ đơn giản đến thế.",
  },
];

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-16 w-[95%] m-auto my-4 rounded-lg">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          loop
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg">{slide.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
