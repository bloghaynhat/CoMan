import React from "react";

const NotFound = () => {
  return (
    <section className="py-10 bg-white font-serif">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-8xl">Oops!!! 404</h1>
            <div
              className="h-[500px] bg-center bg-no-repeat bg-cover flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              }}
            ></div>

            <div className="mt-[-50px]">
              <h2 className="text-2xl font-bold mb-4">Có vẻ bạn bị lạc</h2>
              <p className="mb-6">Đây không phải nơi ai cũng có thể tới </p>
              <a
                href="/"
                className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-500 to-[#00c9ff] text-white rounded hover:bg-green-700 transition"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
