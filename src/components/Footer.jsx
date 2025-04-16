import React from "react";
import logo from "../assets/logoComan.svg";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-400 to-blue-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Coman</h2>
          <p className="text-sm text-gray-300">
            Nền tảng học tập trực tuyến giúp bạn nâng cao kỹ năng và phát triển sự nghiệp.
          </p>
          <img src={logo} alt="logoComan" className="mt-4 w-32" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Liên kết</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Trang chủ</a></li>
            <li><a href="#" className="hover:text-white">Khóa học</a></li>
            <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
            <li><a href="#" className="hover:text-white">Liên hệ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Hỗ trợ</h3>
          <p className="text-sm text-gray-300">Email: nhantnpt2609@gmail.com</p>
          <p className="text-sm text-gray-300">Hotline: 0914462297</p>
          <p className="text-sm text-gray-300 mt-2">© 2025 Coman. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
