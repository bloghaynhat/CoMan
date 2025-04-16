// Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFlip } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-flip";

const slides = [
  {
    title: "Học mọi lúc, mọi nơi cùng Coman",
    description:
      "Khám phá hàng trăm khóa học từ cơ bản đến nâng cao, giúp bạn chinh phục mọi mục tiêu học tập.",
    image: "https://res.cloudinary.com/dbv9csgia/image/upload/v1744821319/Nhung-cach-giup-ban-hoc-online-hieu-qua-1_pr02cu.jpg",
  },
  {
    title: "Nâng cao kỹ năng của bạn",
    description:
      "Từ lập trình, thiết kế đến marketing – có khóa học cho tất cả mọi người.",
    image: "https://res.cloudinary.com/dbv9csgia/image/upload/v1744821318/lap-trinh-vien-thumb_lrbhfn.jpg",
  },
  {
    title: "Nắm bắt được HTML CSS và JavaScript",
    description:
      "Khóa học giúp bạn nắm vững kiến thức về HTML, CSS và JavaScript, từ cơ bản đến nâng cao.",
    image: "https://res.cloudinary.com/dbv9csgia/image/upload/v1744821572/1697274440798_vuxu5d.png",
  },
  {
    title: "Dậm lên ReactJS",
    description:
      "Khóa học giúp bạn nắm vững kiến thức về ReactJS, từ cơ bản đến nâng cao.",
    image: "https://res.cloudinary.com/dbv9csgia/image/upload/v1744821571/maxresdefault_hnilyc.jpg",
  },
  {
    title: "làm chủ cấu trúc dữ liệu và giải thuật",
    description:
      "Khóa học giúp bạn nắm vững kiến thức về cấu trúc dữ liệu và giải thuật, từ cơ bản đến nâng cao.",
    image: "https://res.cloudinary.com/dbv9csgia/image/upload/v1744821437/cau-truc-du-lieu-va-giai-thuat_ef33392c074c4cd29a9892f11abbc2bc_mejlfk.png",
  },
];

const Banner = () => {
  return (
    <section className="w-[95%] m-auto my-4 rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFlip]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="flip"
        loop
        flipEffect={{
          slideShadows: true,
          limitRotation: true,
        }}
        className="h-[300px] md:h-[350px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center text-white max-w-3xl">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
