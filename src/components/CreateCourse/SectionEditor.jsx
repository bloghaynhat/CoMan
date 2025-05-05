import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/button";

export default function SectionEditor({
    sections = [],  // Cung cấp mặc định là mảng rỗng nếu không có dữ liệu
    setSections,
    onDeleteSection,
    onDeleteLesson,
    onAddLesson,
}) {
    const [newSectionTitle, setNewSectionTitle] = useState(""); // Dùng để thêm section mới

    const handleSectionTitleChange = (id, value) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id ? { ...section, title: value } : section
            )
        );
    };

    const handleLessonChange = (sectionId, lessonId, field, value) => {
        setSections((prev) =>
            prev.map((section) => {
                if (section.id !== sectionId) return section;
                const updatedLessons = section.lessons.map((lesson) =>
                    lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
                );
                return { ...section, lessons: updatedLessons };
            })
        );
    };

    const handleAddLesson = (sectionId) => {
        const newLesson = {
            id: Date.now(),
            title: "Tên bài học mới",
            video_url: "",
            article_content: "",
            order: 0,
            section: sectionId,
        };

        onAddLesson(sectionId, newLesson); // Gọi hàm từ EditCourse để thêm bài học mới vào section
    };

    const handleAddSection = () => {
        if (!newSectionTitle.trim()) return;

        const newSection = {
            id: Date.now(),
            title: newSectionTitle,
            course: 1, // Giả sử courseId là 1 ở đây
            lessons: [],
        };

        setSections((prev) => [...prev, newSection]);
        setNewSectionTitle(""); // Reset input section title
    };

    return (
        <div className="space-y-6">
            {/* Input để thêm section mới */}
            <div className="flex space-x-2 mb-4">
                <Input
                    label="Tên chương mới"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                />
                <Button onClick={handleAddSection} className="self-end">Thêm chương mới</Button>
            </div>

            {sections.length > 0 ? (
                sections.map((section) => (
                    <div key={section.id} className="border p-4 rounded-md shadow">
                        <div className="flex items-center justify-between mb-2">
                            <Input
                                label="Tiêu đề chương"
                                value={section.title}
                                onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                            />
                            <Button
                                variant="destructive"
                                onClick={() => onDeleteSection(section.id)}
                                className="ml-4"
                            >
                                Xóa chương
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {section.lessons.map((lesson) => (
                                <div key={lesson.id} className="border p-3 rounded bg-gray-50 space-y-2">
                                    <Input
                                        label="Tên bài học"
                                        value={lesson.title}
                                        onChange={(e) =>
                                            handleLessonChange(section.id, lesson.id, "title", e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Link video YouTube"
                                        value={lesson.video_url}
                                        onChange={(e) =>
                                            handleLessonChange(section.id, lesson.id, "video_url", e.target.value)
                                        }
                                    />
                                    <Textarea
                                        label="Nội dung bài viết"
                                        value={lesson.article_content}
                                        onChange={(e) =>
                                            handleLessonChange(section.id, lesson.id, "article_content", e.target.value)
                                        }
                                    />
                                    <Button
                                        variant="destructive"
                                        onClick={() => onDeleteLesson(section.id, lesson.id)}
                                    >
                                        Xóa bài học
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3">
                            <Button onClick={() => handleAddLesson(section.id)}>Thêm bài học</Button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Không có section nào.</p>
            )}
        </div>
    );
}
