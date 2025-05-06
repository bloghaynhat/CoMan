import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getchSectionsWithLessons, createSection, deleteSection, createLesson, deleteLesson } from "../../api/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserContext } from "@/context/UserContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Plus, Save, ArrowLeft, Trash2, Video, FileText, BookOpen } from "lucide-react"
const CourseEditor = () => {
    const { courseId } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [sections, setSections] = useState([])
    const [lessons, setLessons] = useState([])
    const [newSections, setNewSections] = useState([])
    const [newLessons, setNewLessons] = useState([])
    const [deletedSectionIds, setDeletedSectionIds] = useState([])
    const [deletedLessonIds, setDeletedLessonIds] = useState([])
    const [expandedSections, setExpandedSections] = useState({})


    useEffect(() => {
        fetchSections()
    }, [])

    const fetchSections = async () => {
        try {
            const data = await getchSectionsWithLessons(courseId, user.access_token)
            setSections(data)
            const allLessons = data.flatMap((section) =>
                section.lessons.map((lesson) => ({ ...lesson, section_id: section.id })),
            )
            setLessons(allLessons)

            const expanded = {}
            data.forEach((section) => {
                expanded[section.id] = true
            })
            setExpandedSections(expanded)
        } catch (error) {
            console.error("Failed to fetch sections:", error)
        }
    }

    const handleAddSection = () => {
        setNewSections([...newSections, { id: Date.now(), title: "", course: Number.parseInt(courseId), isNew: true }])
    }

    const handleAddLesson = (sectionId) => {
        setNewLessons([
            ...newLessons,
            {
                id: Date.now(),
                title: "",
                section: sectionId,
                video_url: "",
                article_content: "",
                isNew: true,
            },
        ])
    }
    const handleDeleteSection = (sectionId) => {
        if (newSections.some((section) => section.id === sectionId)) {
            setNewSections(newSections.filter((section) => section.id !== sectionId))
        } else {
            setDeletedSectionIds([...deletedSectionIds, sectionId])
        }
    }

    const handleDeleteLesson = (lessonId) => {
        if (newLessons.some((lesson) => lesson.id === lessonId)) {
            setNewLessons(newLessons.filter((lesson) => lesson.id !== lessonId))
        } else {
            setDeletedLessonIds([...deletedLessonIds, lessonId])
        }
    }
    const handleSaveChanges = async () => {
        try {
            const sectionIdMap = {}

            for (const section of newSections) {
                const { title, course } = section
                const created = await createSection({ title, course, order: 0 }, user.access_token)
                sectionIdMap[section.id] = created.id
            }

            for (const lesson of newLessons) {
                const { title, video_url, article_content, section } = lesson
                const realSectionId = sectionIdMap[section] || section
                await createLesson({ title, video_url, article_content, section: realSectionId, order: 0 }, user.access_token)
            }

            await Promise.all([
                ...deletedSectionIds.map((id) => deleteSection(id, user.access_token)),
                ...deletedLessonIds.map((id) => deleteLesson(id, user.access_token)),
            ])

            fetchSections()
            setNewSections([])
            setNewLessons([])
            setDeletedSectionIds([])
            setDeletedLessonIds([])
            navigate("/admin/courses")
        } catch (error) {
            console.error("Error saving changes:", error)
        }
    }

    const toggleSection = (sectionId) => {
        setExpandedSections({
            ...expandedSections,
            [sectionId]: !expandedSections[sectionId],
        })
    }

    return (
        <div className="p-6 max-w-6xl mx-auto bg-slate-50 min-h-screen">
            <Card className="mb-6 border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Chi tiết khóa học</CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                className="bg-white text-emerald-700 hover:bg-slate-100"
                                onClick={handleSaveChanges}
                            >
                                <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white text-slate-700 hover:bg-slate-100 border-0"
                                onClick={() => navigate("/admin/courses")}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="mb-6 flex justify-end">
                <Button onClick={handleAddSection} className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Thêm chương mới
                </Button>
            </div>

            <div className="space-y-4">
                {[...sections, ...newSections].map(
                    (section) =>
                        !deletedSectionIds.includes(section.id) && (
                            <Card key={section.id} className="overflow-hidden border border-slate-200 shadow-sm">
                                <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1 mr-4">
                                            <Input
                                                value={section.title}
                                                onChange={(e) => {
                                                    section.title = e.target.value
                                                    setSections([...sections])
                                                }}
                                                placeholder="Tên chương"
                                                className="border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-lg font-medium"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-slate-300 hover:bg-slate-100"
                                                onClick={() => toggleSection(section.id)}
                                            >
                                                {expandedSections[section.id] ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-slate-300 hover:bg-slate-100 text-teal-600"
                                                onClick={() => handleAddLesson(section.id)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="bg-red-500 hover:bg-red-600"
                                                onClick={() => handleDeleteSection(section.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {expandedSections[section.id] && (
                                    <CardContent className="p-4 bg-white">
                                        <div className="space-y-3">
                                            {[...(section.lessons || []), ...newLessons.filter((l) => l.section === section.id)].map(
                                                (lesson) =>
                                                    !deletedLessonIds.includes(lesson.id) && (
                                                        <Card key={lesson.id} className="border border-slate-200 overflow-hidden">
                                                            <CardContent className="p-4">
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <BookOpen className="h-4 w-4 text-teal-600" />
                                                                        <Input
                                                                            value={lesson.title}
                                                                            onChange={(e) => {
                                                                                lesson.title = e.target.value
                                                                                setLessons([...lessons])
                                                                            }}
                                                                            placeholder="Tên bài học"
                                                                            className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                                                                        />
                                                                    </div>

                                                                    <div className="flex items-center gap-2">
                                                                        <Video className="h-4 w-4 text-teal-600" />
                                                                        <Input
                                                                            value={lesson.video_url}
                                                                            onChange={(e) => {
                                                                                lesson.video_url = e.target.value
                                                                                setLessons([...lessons])
                                                                            }}
                                                                            placeholder="Video URL"
                                                                            className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                                                                        />
                                                                    </div>

                                                                    <div className="flex items-start gap-2">
                                                                        <FileText className="h-4 w-4 text-teal-600 mt-2" />
                                                                        <textarea
                                                                            value={lesson.article_content}
                                                                            onChange={(e) => {
                                                                                lesson.article_content = e.target.value
                                                                                setLessons([...lessons])
                                                                            }}
                                                                            placeholder="Nội dung bài viết"
                                                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:ring-teal-500 min-h-[100px]"
                                                                        />
                                                                    </div>

                                                                    <div className="flex justify-end">
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            className="bg-red-500 hover:bg-red-600"
                                                                            onClick={() => handleDeleteLesson(lesson.id)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4 mr-1" /> Xóa bài học
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ),
                                            )}

                                            <Button
                                                variant="outline"
                                                className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                                                onClick={() => handleAddLesson(section.id)}
                                            >
                                                <Plus className="mr-2 h-4 w-4" /> Thêm bài học mới
                                            </Button>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        ),
                )}
            </div>

            <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700"
                    onClick={() => navigate("/admin/courses")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
                </Button>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="border-teal-500 text-teal-600 hover:bg-teal-50"
                        onClick={handleAddSection}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Thêm chương
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleSaveChanges}>
                        <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseEditor
