import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { createSection, createLesson } from "@/api/admin";
import { UserContext } from "@/context/UserContext";

export default function SetupCourse() {
    const { courseId } = useParams();
    const { user } = useContext(UserContext);
    const [sections, setSections] = useState([]);
    const [sectionTitle, setSectionTitle] = useState("");
    const [lessonInputs, setLessonInputs] = useState({});
    const navigate = useNavigate();

    const handleAddSection = () => {
        const newId = Date.now();
        const newSection = {
            id: newId,
            title: sectionTitle,
            course: parseInt(courseId),
            lessons: [],
        };
        setSections([...sections, newSection]);
        setLessonInputs({ ...lessonInputs, [newId]: { title: "", video_url: "", article_content: "" } });
        setSectionTitle("");
    };

    const handleLessonInputChange = (sectionId, field, value) => {
        setLessonInputs((prev) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [field]: value,
            },
        }));
    };

    const handleAddLesson = (sectionId) => {
        const input = lessonInputs[sectionId];
        if (!input?.title) return;

        const newLesson = {
            id: Date.now(),
            title: input.title,
            video_url: input.video_url,
            article_content: input.article_content,
            section: sectionId,
        };

        const updatedSections = sections.map((section) =>
            section.id === sectionId
                ? {
                    ...section,
                    lessons: [...section.lessons, newLesson],
                }
                : section
        );
        setSections(updatedSections);

        setLessonInputs((prev) => ({
            ...prev,
            [sectionId]: { title: "", video_url: "", article_content: "" },
        }));
    };

    const handleSubmitAll = async () => {
        const token = user?.access_token;
        if (!token) return toast.warn("Bạn Chưa đăng nhập", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        try {
            for (const section of sections) {
                const newSection = await createSection({
                    title: section.title,
                    order: 0,
                    course: Number(section.course),
                }, token);

                for (const ls of section.lessons) {
                    await createLesson({
                        title: ls.title,
                        video_url: ls.video_url,
                        article_content: ls.article_content,
                        order: 0,
                        section: newSection.id,
                    }, token);
                }
            }
            toast.success("Tạo thành công và đang quay lại!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/admin/courses");
        } catch (err) {
            console.error("Lỗi khi gửi dữ liệu:", err);
            toast.error("Tạo thất bại!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Thiết lập khóa học #{courseId}</h1>

            <div className="space-y-2">
                <input
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    placeholder="Tên chương (Section)"
                    className="w-full border p-2 rounded"
                />
                <Button onClick={handleAddSection}>Thêm chương</Button>
            </div>

            {sections.map((section) => {
                const input = lessonInputs[section.id] || {};
                return (
                    <div key={section.id} className="border p-4 rounded space-y-3 bg-gray-50 mt-4">
                        <h2 className="text-lg font-semibold">📘 {section.title}</h2>

                        <div className="space-y-2">
                            <input
                                value={input.title || ""}
                                onChange={(e) =>
                                    handleLessonInputChange(section.id, "title", e.target.value)
                                }
                                placeholder="Tên bài học"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                value={input.video_url || ""}
                                onChange={(e) =>
                                    handleLessonInputChange(section.id, "video_url", e.target.value)
                                }
                                placeholder="URL video"
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                value={input.article_content || ""}
                                onChange={(e) =>
                                    handleLessonInputChange(section.id, "article_content", e.target.value)
                                }
                                placeholder="Nội dung bài viết"
                                className="w-full border p-2 rounded"
                            />
                            <Button onClick={() => handleAddLesson(section.id)}>Thêm bài học</Button>
                        </div>

                        {section.lessons.length > 0 && (
                            <ul className="pl-4 list-disc">
                                {section.lessons.map((l) => (
                                    <li key={l.id}>{l.title}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}

            <Button onClick={handleSubmitAll} className="bg-green-600 hover:bg-green-700">
                Lưu và trở về 🤫
            </Button>
        </div>
    );
}
