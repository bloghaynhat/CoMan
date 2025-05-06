import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getchSectionsWithLessons, createSection, deleteSection, createLesson, deleteLesson } from "../../api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";

const CourseDetailViewer = () => {
    const { courseId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [newSections, setNewSections] = useState([]);
    const [newLessons, setNewLessons] = useState([]);
    const [deletedSectionIds, setDeletedSectionIds] = useState([]);
    const [deletedLessonIds, setDeletedLessonIds] = useState([]);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const data = await getchSectionsWithLessons(courseId, user.access_token);
            setSections(data);
            const allLessons = data.flatMap(section => section.lessons.map(lesson => ({ ...lesson, section_id: section.id })));
            setLessons(allLessons);
        } catch (error) {
            console.error("Failed to fetch sections:", error);
        }
    };

    const handleAddSection = () => {
        setNewSections([...newSections, { id: Date.now(), title: "", course: parseInt(courseId), isNew: true }]);
    };

    const handleAddLesson = (sectionId) => {
        setNewLessons([...newLessons, {
            id: Date.now(),
            title: "",
            section: sectionId,
            video_url: "",
            article_content: "",
            isNew: true,
        }]);
    };

    {/*Logic quan trọng🤞🤞🤞🤞🤞🤞🤞🤞🤞*/ }
    const handleDeleteSection = (sectionId) => {
        if (newSections.some(section => section.id === sectionId)) {
            setNewSections(newSections.filter(section => section.id !== sectionId));
        } else {
            setDeletedSectionIds([...deletedSectionIds, sectionId]);
        }
    };

    const handleDeleteLesson = (lessonId) => {
        if (newLessons.some(lesson => lesson.id === lessonId)) {
            setNewLessons(newLessons.filter(lesson => lesson.id !== lessonId));
        } else {
            setDeletedLessonIds([...deletedLessonIds, lessonId]);
        }
    };
    {/*Logic quan trọng🤞🤞🤞🤞🤞🤞🤞🤞🤞*/ }

    {/*Logic quan trọng không kém ở trên🤞🤞🤞🤞🤞🤞🤞🤞🤞*/ }
    const handleSaveChanges = async () => {
        try {
            const sectionIdMap = {};

            for (const section of newSections) {
                const { title, course } = section;
                const created = await createSection({ title, course, order: 0 }, user.access_token);
                sectionIdMap[section.id] = created.id;
            }

            for (const lesson of newLessons) {
                const { title, video_url, article_content, section } = lesson;
                const realSectionId = sectionIdMap[section] || section;
                await createLesson({ title, video_url, article_content, section: realSectionId, order: 0 }, user.access_token);
            }

            await Promise.all([
                ...deletedSectionIds.map(id => deleteSection(id)),
                ...deletedLessonIds.map(id => deleteLesson(id)),
            ]);

            fetchSections();
            setNewSections([]);
            setNewLessons([]);
            setDeletedSectionIds([]);
            setDeletedLessonIds([]);
            navigate("/admin/courses");
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };
    {/*Logic quan trọng không kém ở trên🤞🤞🤞🤞🤞🤞🤞🤞🤞*/ }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Chi tiết khóa học</h1>

            {[...sections, ...newSections].map((section) => (
                !deletedSectionIds.includes(section.id) && (
                    <div key={section.id} className="mb-4 border rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <Input
                                value={section.title}
                                onChange={(e) => {
                                    section.title = e.target.value;
                                    setSections([...sections]);
                                }}
                                placeholder="Tên chương"
                            />
                            <Button variant="destructive" onClick={() => handleDeleteSection(section.id)}>Xóa chương</Button>
                        </div>

                        {[...section.lessons || [], ...newLessons.filter(l => l.section === section.id)].map((lesson) => (
                            !deletedLessonIds.includes(lesson.id) && (
                                <div key={lesson.id} className="mb-2 border p-2 rounded">
                                    <Input
                                        className="mb-1"
                                        value={lesson.title}
                                        onChange={(e) => {
                                            lesson.title = e.target.value;
                                            setLessons([...lessons]);
                                        }}
                                        placeholder="Tên bài học"
                                    />
                                    <Input
                                        className="mb-1"
                                        value={lesson.video_url}
                                        onChange={(e) => {
                                            lesson.video_url = e.target.value;
                                            setLessons([...lessons]);
                                        }}
                                        placeholder="Video URL"
                                    />
                                    <Input
                                        value={lesson.article_content}
                                        onChange={(e) => {
                                            lesson.article_content = e.target.value;
                                            setLessons([...lessons]);
                                        }}
                                        placeholder="Nội dung bài viết"
                                    />
                                    <Button variant="destructive" onClick={() => handleDeleteLesson(lesson.id)}>Xóa bài học</Button>
                                </div>
                            )
                        ))}
                        <Button className="mt-2" onClick={() => handleAddLesson(section.id)}>Thêm bài học</Button>
                    </div>
                )
            ))}

            <div className="flex gap-4 mt-4">
                <Button onClick={handleAddSection}>Thêm chương</Button>
                <Button onClick={handleSaveChanges}>Lưu thay đổi</Button>
                <Button variant="outline" onClick={() => navigate("/admin/courses")}>Quay lại</Button>
            </div>
        </div>
    );
};

export default CourseDetailViewer;
