import React from 'react';
import InstructorCard from './InstructorCard';

const TeamSection = () => {
    // Dữ liệu mẫu
    const instructors = [
        {
            image: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901791.jpg?ga=GA1.1.7443125.1727764720&semt=ais_hybrid&w=740",
            name: "Lê Ngọc Dung",
            position: "Giảng viên chính"
        },
        {
            image: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010130.jpg?ga=GA1.1.7443125.1727764720&semt=ais_hybrid&w=740",
            name: "Huỳnh Trọng Nhân",
            position: "Giảng viên chính"
        },
        {
            image: "https://img.freepik.com/premium-photo/composition-with-html-system-websites_23-2150866277.jpg?ga=GA1.1.7443125.1727764720&semt=ais_hybrid&w=740",
            name: "Lê Phạm Minh Đức",
            position: "Giảng viên chính"
        }
    ];

    return (
        <section className="mb-8">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                <h2 className="text-2xl font-semibold mb-4">Đội Ngũ Chuyên Gia</h2>
            </blockquote>

            <div className="flex justify-around space-x-6"> {/* Thêm space-x-6 để tạo khoảng cách */}
                {instructors.map((instructor, index) => (
                    <InstructorCard
                        key={index}
                        image={instructor.image}
                        name={instructor.name}
                        position={instructor.position}
                    />
                ))}
            </div>
        </section>
    );
};

export default TeamSection;