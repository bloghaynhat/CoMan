import React from "react";
import InstructorSection from "../components/InstructorSection";
import InfoSection from "../components/InfoSection";

const VeChungToi = () => {

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-8 bg-gradient-to-r from-indigo-500 to-[#00c9ff] rounded flex">
        <div className="w-3/4 p-4"> {/* Phần nội dung chiếm 3/4 chiều rộng */}
          <p className="text-lg text-white text-justify">
           Noi dung nam day
          </p>
        </div>
        <div className="w-1/4"> {/* Phần hình ảnh chiếm 1/4 chiều rộng */}
          <img src="path/to/your/image.jpg" alt="Hình ảnh minh họa" className="w-full h-full object-cover rounded-r" />
        </div>
      </section>
      {/* Hiển thị nội dung thông tin của từng giảng viên */}
      <InstructorSection />
      {/* Hiển thị nôi dung thong tin liên quan đến lịch sử*/}
      <InfoSection />
    </div>

  )
};

export default VeChungToi;
