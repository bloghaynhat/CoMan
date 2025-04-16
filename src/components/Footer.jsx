import React from "react";

const Footer = () => {
  return (
    <div className="h-[300px] bg-black">
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold p-3 flex items-center">
              <i className="fas fa-envelope mr-2"></i> Liên hệ
            </h3>
            <p className="p-3"><i className="fas fa-at mr-2"></i> Email: lengocdung8019@gmail.com</p>
            <p className="p-3"><i className="fas fa-phone-alt mr-2"></i> Điện thoại: 0399455443</p>
            <p className="p-3"><i className="fas fa-map-marker-alt mr-2"></i> Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold p-3 flex items-center">
              <i className="fas fa-book mr-2"></i> Khóa học
            </h3>
            <ul>
              <li className="p-3"><a href="#" className="hover:underline"><i className="fas fa-code mr-2"></i> Khóa học lập trình</a></li>
              <li className="p-3"><a href="#" className="hover:underline"><i className="fas fa-paint-brush mr-2"></i> Khóa học thiết kế</a></li>
              <li className="p-3"><a href="#" className="hover:underline"><i className="fas fa-bullhorn mr-2"></i> Khóa học marketing</a></li>
            </ul>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold p-3 flex items-center">
              <i className="fas fa-share-alt mr-2"></i> Theo dõi chúng tôi
            </h3>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline"><i className="fab fa-facebook-f mr-1"></i> Facebook</a></li>
              <li><a href="#" className="hover:underline"><i className="fab fa-twitter mr-1"></i> Twitter</a></li>
              <li><a href="#" className="hover:underline"><i className="fab fa-instagram mr-1"></i> Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} Công ty ABC. Bảo lưu mọi quyền.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
