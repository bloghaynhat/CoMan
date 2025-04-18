import React from "react";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-16 w-[95%] m-auto my-4 rounded-lg">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Học mọi lúc, mọi nơi cùng Coman
          </h1>
          <p className="text-lg mb-6">
            Khám phá hàng trăm khóa học từ cơ bản đến nâng cao, giúp bạn chinh
            phục mọi mục tiêu học tập.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
