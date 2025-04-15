import React from 'react';

const InfoSection = () => {
    const sections = [
        {
            title: "Lịch Sử Hình Thành",
            content: "Công ty chúng tôi được thành lập vào năm 2000, với sứ mệnh cung cấp những sản phẩm và dịch vụ tốt nhất cho khách hàng. Qua 20 năm phát triển, chúng tôi đã xây dựng được uy tín vững chắc trong ngành."
        },
        {
            title: "Giá Trị Cung Cấp",
            content: "Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao, dịch vụ tận tâm và trải nghiệm khách hàng tuyệt vời nhất. Đội ngũ nhân viên chuyên nghiệp và nhiệt huyết luôn sẵn sàng hỗ trợ."
        },
        {
            title: "Khách Hàng và Đánh Giá",
            content: "Chúng tôi tự hào phục vụ hàng ngàn khách hàng và nhận được nhiều phản hồi tích cực. Khách hàng đánh giá cao sự tận tâm và chất lượng sản phẩm của chúng tôi."
        },
        {
            title: "Tầm Nhìn Tương Lai",
            content: "Chúng tôi hướng đến việc mở rộng thị trường và phát triển các sản phẩm đổi mới sáng tạo, nhằm đáp ứng nhu cầu ngày càng cao của khách hàng trong tương lai."
        }
    ];

    return (
        <div>
            {sections.map((section, index) => (
                <section className="mb-8" key={index}>
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    </blockquote>
                    <p>{section.content}</p>
                </section>
            ))}
        </div>
    );
};

export default InfoSection;