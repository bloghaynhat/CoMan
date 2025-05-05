import { useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { createSection, createLesson, getSections, getLessons, deleteSection, deleteLesson } from "@/api/admin"
import { UserContext } from "@/context/UserContext"
import { BookOpen, Plus, Save, FileText, Video, ChevronRight, Trash2, AlertCircle, Loader2 } from "lucide-react"

export default function EditCourse() {
    const { courseId } = useParams()
    const { user } = useContext(UserContext)
    const [sections, setSections] = useState([])
    const [sectionTitle, setSectionTitle] = useState("")
    const [lessonInputs, setLessonInputs] = useState({})
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState({ type: null, id: null })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!user?.access_token) {
                setLoading(false)
                return
            }

            try {
                const sectionsData = await getSections(courseId, user.access_token)

                const sectionsWithLessons = await Promise.all(
                    sectionsData.map(async (section) => {
                        const lessonsData = await getLessons(section.id, user.access_token)
                        return {
                            ...section,
                            lessons: lessonsData || [],
                        }
                    }),
                )

                setSections(sectionsWithLessons)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching course data:", error)
                toast.error("Không thể tải dữ liệu khóa học")
                setLoading(false)
            }
        }

        fetchCourseData()
    }, [courseId, user])

    function getVideoId(url) {
        if (!url) return null
        const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
        const match = url.match(regExp)
        return match ? match[1] : null
    }

    function formatYouTubeEmbedUrl(url) {
        if (!url) return null
        const videoId = getVideoId(url)
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url
    }

    const handleAddSection = () => {
        if (!sectionTitle.trim()) return

        const newId = Date.now()
        const newSection = {
            id: newId,
            title: sectionTitle,
            course: Number.parseInt(courseId),
            lessons: [],
            isNew: true,
        }
        setSections([...sections, newSection])
        setLessonInputs({ ...lessonInputs, [newId]: { title: "", video_url: "", article_content: "" } })
        setSectionTitle("")
    }

    const handleDeleteSection = async (sectionId) => {
        const sectionToDelete = sections.find((s) => s.id === sectionId)

        if (sectionToDelete.isNew) {
            setSections(sections.filter((section) => section.id !== sectionId))
            return
        }

        setDeleting({ type: "section", id: sectionId })

        try {
            await deleteSection(sectionId, user.access_token)
            setSections(sections.filter((section) => section.id !== sectionId))
            toast.success("Đã xóa chương thành công")
        } catch (error) {
            console.error("Error deleting section:", error)
            toast.error("Không thể xóa chương")
        } finally {
            setDeleting({ type: null, id: null })
        }
    }

    const handleDeleteLesson = async (sectionId, lessonId) => {
        const section = sections.find((s) => s.id === sectionId)
        const lessonToDelete = section.lessons.find((l) => l.id === lessonId)

        if (section.isNew || lessonToDelete.isNew) {
            const updatedSections = sections.map((section) =>
                section.id === sectionId
                    ? { ...section, lessons: section.lessons.filter((lesson) => lesson.id !== lessonId) }
                    : section,
            )
            setSections(updatedSections)
            return
        }

        setDeleting({ type: "lesson", id: lessonId })

        try {
            await deleteLesson(lessonId, user.access_token)

            const updatedSections = sections.map((section) =>
                section.id === sectionId
                    ? { ...section, lessons: section.lessons.filter((lesson) => lesson.id !== lessonId) }
                    : section,
            )
            setSections(updatedSections)
            toast.success("Đã xóa bài học thành công")
        } catch (error) {
            console.error("Error deleting lesson:", error)
            toast.error("Không thể xóa bài học")
        } finally {
            setDeleting({ type: null, id: null })
        }
    }

    const handleLessonInputChange = (sectionId, field, value) => {
        setLessonInputs((prev) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [field]: value,
            },
        }))
    }

    const handleAddLesson = (sectionId) => {
        const input = lessonInputs[sectionId]
        if (!input?.title) return
        const formattedVideoUrl = formatYouTubeEmbedUrl(input.video_url)

        const newLesson = {
            id: Date.now(),
            title: input.title,
            video_url: formattedVideoUrl,
            article_content: input.article_content,
            section: sectionId,
            isNew: true,
        }

        const updatedSections = sections.map((section) =>
            section.id === sectionId
                ? {
                    ...section,
                    lessons: [...section.lessons, newLesson],
                }
                : section,
        )
        setSections(updatedSections)

        setLessonInputs((prev) => ({
            ...prev,
            [sectionId]: { title: "", video_url: "", article_content: "" },
        }))
    }

    const handleSubmitAll = async () => {
        const token = user?.access_token
        if (!token)
            return toast.warn("Bạn Chưa đăng nhập", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        try {
            for (const section of sections) {
                let sectionId = section.id

                if (section.isNew) {
                    const newSection = await createSection(
                        {
                            title: section.title,
                            order: 0,
                            course: Number(section.course),
                        },
                        token,
                    )
                    sectionId = newSection.id
                }

                for (const lesson of section.lessons) {
                    if (lesson.isNew) {
                        await createLesson(
                            {
                                title: lesson.title,
                                video_url: lesson.video_url,
                                article_content: lesson.article_content,
                                order: 0,
                                section: sectionId,
                            },
                            token,
                        )
                    }
                }
            }

            toast.success("Lưu thành công và đang quay lại!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            navigate("/admin/courses")
        } catch (err) {
            console.error("Lỗi khi gửi dữ liệu:", err)
            toast.error("Lưu thất bại!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 text-purple-500 animate-spin mx-auto mb-4" />
                    <p className="text-purple-700 text-lg">Đang tải dữ liệu khóa học...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl bg-gradient-to-b from-purple-50 to-white min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-purple-500 flex items-center">
                    <span className="bg-purple-100 p-2 rounded-lg mr-3">
                        <BookOpen className="h-6 w-6 text-purple-400" />
                    </span>
                    Thiết lập khóa học #{courseId}
                </h1>
                <Button
                    onClick={handleSubmitAll}
                    className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg transition-all duration-300 hover:shadow-purple-200 hover:shadow-md"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Lưu và trở về
                </Button>
            </div>

            <Card className="mb-8 border-none shadow-lg shadow-purple-100">
                <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500">
                    <CardTitle className="text-xl text-white flex items-center">
                        <Plus className="mr-2 h-5 w-5" />
                        Thêm chương mới
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            value={sectionTitle}
                            onChange={(e) => setSectionTitle(e.target.value)}
                            placeholder="Tên chương (Section)"
                            className="flex-1 px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 placeholder-purple-300"
                        />
                        <Button
                            onClick={handleAddSection}
                            disabled={!sectionTitle.trim()}
                            className="bg-purple-400 hover:bg-purple-500 text-white"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm chương
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {sections.length > 0 ? (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center text-purple-700 border-b-2 border-purple-200 pb-2">
                        <BookOpen className="mr-2 h-5 w-5 text-purple-500" />
                        Danh sách chương
                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                            {sections.length}
                        </span>
                    </h2>

                    {sections.map((section, index) => {
                        const input = lessonInputs[section.id] || {}
                        return (
                            <Card
                                key={section.id}
                                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <CardHeader
                                    className={`bg-gradient-to-r ${index % 3 === 0
                                        ? "from-purple-500 to-purple-600"
                                        : index % 3 === 1
                                            ? "from-blue-600 to-blue-700"
                                            : "from-teal-600 to-teal-700"
                                        } pb-3 relative`}
                                >
                                    <CardTitle className="text-lg font-semibold flex items-center text-white pr-10">
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        {section.title}
                                        {section.isNew && (
                                            <span className="ml-2 text-xs bg-white text-purple-700 px-2 py-0.5 rounded-full">Mới</span>
                                        )}
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-2 top-2 text-white hover:bg-white/20 p-1 h-8 w-8"
                                        onClick={() => handleDeleteSection(section.id)}
                                        disabled={deleting.type === "section" && deleting.id === section.id}
                                    >
                                        {deleting.type === "section" && deleting.id === section.id ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-5 w-5" />
                                        )}
                                    </Button>
                                </CardHeader>

                                <CardContent className="pt-6 space-y-4 bg-white">
                                    <div className="space-y-3">
                                        <div className="grid gap-3">
                                            <div className="relative">
                                                <input
                                                    value={input.title || ""}
                                                    onChange={(e) => handleLessonInputChange(section.id, "title", e.target.value)}
                                                    placeholder="Tên bài học"
                                                    className={`w-full pl-9 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent bg-opacity-50 ${index % 3 === 0
                                                        ? "border-purple-200 focus:ring-purple-500 bg-purple-50"
                                                        : index % 3 === 1
                                                            ? "border-blue-200 focus:ring-blue-500 bg-blue-50"
                                                            : "border-teal-200 focus:ring-teal-500 bg-teal-50"
                                                        }`}
                                                />
                                                <FileText
                                                    className={`absolute left-3 top-2.5 h-4 w-4 ${index % 3 === 0 ? "text-purple-400" : index % 3 === 1 ? "text-blue-400" : "text-teal-400"
                                                        }`}
                                                />
                                            </div>

                                            <div className="relative">
                                                <input
                                                    value={input.video_url || ""}
                                                    onChange={(e) => handleLessonInputChange(section.id, "video_url", e.target.value)}
                                                    placeholder="URL video YouTube"
                                                    className={`w-full pl-9 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent bg-opacity-50 ${index % 3 === 0
                                                        ? "border-purple-200 focus:ring-purple-500 bg-purple-50"
                                                        : index % 3 === 1
                                                            ? "border-blue-200 focus:ring-blue-500 bg-blue-50"
                                                            : "border-teal-200 focus:ring-teal-500 bg-teal-50"
                                                        }`}
                                                />
                                                <Video
                                                    className={`absolute left-3 top-2.5 h-4 w-4 ${index % 3 === 0 ? "text-purple-400" : index % 3 === 1 ? "text-blue-400" : "text-teal-400"
                                                        }`}
                                                />
                                            </div>

                                            <textarea
                                                value={input.article_content || ""}
                                                onChange={(e) => handleLessonInputChange(section.id, "article_content", e.target.value)}
                                                placeholder="Nội dung bài viết"
                                                className={`w-full min-h-[100px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent bg-opacity-50 ${index % 3 === 0
                                                    ? "border-purple-200 focus:ring-purple-500 bg-purple-50"
                                                    : index % 3 === 1
                                                        ? "border-blue-200 focus:ring-blue-500 bg-blue-50"
                                                        : "border-teal-200 focus:ring-teal-500 bg-teal-50"
                                                    }`}
                                            />
                                        </div>

                                        <Button
                                            onClick={() => handleAddLesson(section.id)}
                                            variant="outline"
                                            disabled={!input.title?.trim()}
                                            className={`w-full sm:w-auto border-2 ${index % 3 === 0
                                                ? "border-purple-500 text-purple-700 hover:bg-purple-50"
                                                : index % 3 === 1
                                                    ? "border-blue-500 text-blue-700 hover:bg-blue-50"
                                                    : "border-teal-500 text-teal-700 hover:bg-teal-50"
                                                }`}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Thêm bài học
                                        </Button>
                                    </div>

                                    {section.lessons.length > 0 && (
                                        <>
                                            <div
                                                className={`h-px w-full ${index % 3 === 0 ? "bg-purple-200" : index % 3 === 1 ? "bg-blue-200" : "bg-teal-200"
                                                    } my-4`}
                                            ></div>
                                            <div>
                                                <h3
                                                    className={`font-medium mb-2 flex items-center ${index % 3 === 0 ? "text-purple-700" : index % 3 === 1 ? "text-blue-700" : "text-teal-700"
                                                        }`}
                                                >
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    Bài học đã thêm
                                                    <span
                                                        className={`ml-2 text-xs px-2 py-1 rounded-full font-bold ${index % 3 === 0
                                                            ? "bg-purple-100 text-purple-800"
                                                            : index % 3 === 1
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-teal-100 text-teal-800"
                                                            }`}
                                                    >
                                                        {section.lessons.length}
                                                    </span>
                                                </h3>
                                                <ul className="space-y-2">
                                                    {section.lessons.map((lesson) => (
                                                        <li
                                                            key={lesson.id}
                                                            className={`flex items-center justify-between p-3 rounded-md ${index % 3 === 0
                                                                ? "bg-purple-50 hover:bg-purple-100"
                                                                : index % 3 === 1
                                                                    ? "bg-blue-50 hover:bg-blue-100"
                                                                    : "bg-teal-50 hover:bg-teal-100"
                                                                } transition-colors duration-200 group`}
                                                        >
                                                            <div className="flex items-center flex-1 min-w-0">
                                                                <ChevronRight
                                                                    className={`h-4 w-4 mr-2 flex-shrink-0 ${index % 3 === 0
                                                                        ? "text-purple-500"
                                                                        : index % 3 === 1
                                                                            ? "text-blue-500"
                                                                            : "text-teal-500"
                                                                        }`}
                                                                />
                                                                <span className="font-medium truncate">{lesson.title}</span>
                                                                {lesson.isNew && (
                                                                    <span
                                                                        className={`ml-2 text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${index % 3 === 0
                                                                            ? "bg-purple-200 text-purple-800"
                                                                            : index % 3 === 1
                                                                                ? "bg-blue-200 text-blue-800"
                                                                                : "bg-teal-200 text-teal-800"
                                                                            }`}
                                                                    >
                                                                        Mới
                                                                    </span>
                                                                )}
                                                                {lesson.video_url && (
                                                                    <span
                                                                        className={`ml-2 text-xs px-2 py-0.5 rounded-full flex items-center flex-shrink-0 ${index % 3 === 0
                                                                            ? "bg-purple-200 text-purple-800"
                                                                            : index % 3 === 1
                                                                                ? "bg-blue-200 text-blue-800"
                                                                                : "bg-teal-200 text-teal-800"
                                                                            }`}
                                                                    >
                                                                        <Video className="h-3 w-3 mr-1" />
                                                                        Video
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className={`p-1 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity ${index % 3 === 0
                                                                    ? "text-purple-700 hover:bg-purple-200"
                                                                    : index % 3 === 1
                                                                        ? "text-blue-700 hover:bg-blue-200"
                                                                        : "text-teal-700 hover:bg-teal-200"
                                                                    }`}
                                                                onClick={() => handleDeleteLesson(section.id, lesson.id)}
                                                                disabled={deleting.type === "lesson" && deleting.id === lesson.id}
                                                            >
                                                                {deleting.type === "lesson" && deleting.id === lesson.id ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <Trash2 className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            ) : (
                <Card className="border-none shadow-lg shadow-purple-100 bg-white">
                    <CardContent className="p-8 text-center">
                        <AlertCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-purple-700 mb-2">Chưa có chương nào</h3>
                        <p className="text-gray-500 mb-4">
                            Hãy thêm chương đầu tiên cho khóa học của bạn bằng cách sử dụng form phía trên.
                        </p>
                    </CardContent>
                </Card>
            )}

            {sections.length > 0 && (
                <div className="mt-8 flex justify-end">
                    <Button
                        onClick={handleSubmitAll}
                        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg transition-all duration-300 hover:shadow-purple-200 hover:shadow-md px-6 py-6"
                        size="lg"
                    >
                        <Save className="mr-2 h-5 w-5" />
                        Lưu và trở về
                    </Button>
                </div>
            )}
        </div>
    )
}
