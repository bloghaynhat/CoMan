import React from 'react';
import InfoSectionCard from './InfoSectionCard';

const InfoSection = () => {
    const sections = [
        {
            title: "Lịch Sử Hình Thành",
            content: "Công ty chúng tôi được thành lập vào năm 2024, với sứ mệnh cung cấp những sản phẩm và dịch vụ tốt nhất cho khách hàng. Ngay từ những ngày đầu, chúng tôi đã xác định mục tiêu trở thành một đối tác tin cậy trong việc đáp ứng nhu cầu ngày càng đa dạng của thị trường.Dù mới ra mắt, chúng tôi đã nhanh chóng xây dựng được uy tín và niềm tin trong ngành thông qua việc cung cấp những giải pháp chất lượng cao và dịch vụ khách hàng tận tâm. \n\Chúng tôi không ngừng cải tiến và đổi mới, đảm bảo rằng mọi sản phẩm và dịch vụ đều đạt tiêu chuẩn cao nhất.Với đội ngũ nhân viên chuyên nghiệp và đầy nhiệt huyết, chúng tôi cam kết mang lại giá trị và sự hài lòng tối đa cho tất cả khách hàng. Trong tương lai, chúng tôi sẽ tiếp tục mở rộng quy mô hoạt động và phát triển các sản phẩm mới, nhằm phục vụ tốt hơn nữa cho cộng đồng và thị trường."
        },
        {
            title: "Giá Trị Cung Cấp",
            content: "Chúng tôi cam kết mang đến cho học viên những khóa học chất lượng cao, với nội dung được cập nhật thường xuyên và phù hợp với xu hướng thị trường. Đội ngũ giảng viên là những chuyên gia hàng đầu trong lĩnh vực của họ, sẵn sàng chia sẻ kiến thức và kinh nghiệm thực tiễn."
        }
    ];

    return (
        <div>
            {sections.map((section, index) => (
                <InfoSectionCard
                    key={index}
                    title={section.title}
                    content={section.content}
                />
            ))}
        </div>
    );
};

export default InfoSection;