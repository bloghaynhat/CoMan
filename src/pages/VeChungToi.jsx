import React from "react";
import InstructorSection from "../components/InstructorSection";
import InfoSection from "../components/InfoSection";
import "../stylecss/VeChungToi.css"; // Import CSS cho hiệu ứng marquee

const VeChungToi = () => {
  const data = [
    "Phát triển các chương trình đào tạo chứng chỉ để nâng cao giá trị cho học viên.",
    "Tích hợp công nghệ học tập tiên tiến, như AI và VR, để cải thiện trải nghiệm học tập.",
    "Tăng cường các hoạt động tương tác và kết nối giữa giảng viên và học viên.",
    "Cung cấp các tài liệu học tập đa dạng, bao gồm video, sách điện tử và bài kiểm tra thực hành."
  ]

  return (

    <div className="max-w-7xl mx-auto px-4 py-8">

      <section className="mb-8 bg-gradient-to-r from-indigo-500 to-[#00c9ff] rounded flex">
        <div className="marquee overflow-auto m-6">  {/* Thêm overflow-auto */}
          <p className="text-lg text-white text-justify ">
            Chúng tôi cung cấp các khóa học trực tuyến chất lượng cao, giúp bạn phát triển kỹ năng
            và kiến thức một cách toàn diện. Với sứ mệnh mang lại trải <br/> nghiệm học tập tốt nhất,
            chúng tôi cam kết sử dụng các phương pháp giảng dạy hiện đại và hiệu quả. Đội ngũ giảng viên
            của chúng tôi là những <br/> chuyên gia hàng  đầu trong lĩnh vực, luôn sẵn sàng hỗ trợ và hướng
            dẫn bạn trong suốt quá trình học. Mỗi khóa học được thiết kế tỉ mỉ, không chỉ<br/> cung cấp kiến
            thức lý thuyết mà còn chú trọng đến việc áp dụng thực tiễn.
            <br />
            Chúng tôi tin rằng học tập không chỉ là việc tiếp thu thông tin,
            mà còn là quá trình khám phá và thực hành. Bạn sẽ có cơ hội tham gia vào
            các dự án <br/> thực tế thảo luận nhóm và các hoạt động tương tác, giúp bạn nâng
            cao kỹ năng một cách hiệu quả.
            <br />
          </p>
        </div>
      </section>
      {/* Hiển thị nội dung thông tin của từng giảng viên */}
      <InstructorSection />
      {/* Hiển thị nôi dung thong tin liên quan đến lịch sử*/}
      <InfoSection />

      <div>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          <h2 className="text-2xl font-semibold mb-4">Các Giá Trị Cung Cấp</h2>
        </blockquote>

        <ul className="list-disc pl-6">
          {data.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>

      </div>
    </div>

  )
};

export default VeChungToi;
