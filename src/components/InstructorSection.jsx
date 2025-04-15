import React from 'react';
import InstructorCard from './InstructorCard';

const TeamSection = () => {
    // Dữ liệu mẫu
    const instructors = [
        {
            image: "path/to/image1.jpg",
            name: "Lê Phạm Minh Đức",
            position: "Giảng viên chính"
        },
        {
            image: "path/to/image2.jpg",
            name: "Huỳnh Trọng Nhân",
            position: "Giảng viên chính"
        },
        {
            image: "path/to/image3.jpg",
            name: "Lê Ngọc Dung",
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