import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "@/context/UserContext"
import { getCourseById, getRevenueCourses, getchSectionsWithLessons } from "../../api/admin"

const CourseDetailViewer = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [sections, setSections] = useState([])
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState({})
    const [course, setCourse] = useState({})
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [courseStats, setCourseStats] = useState({
        totalRevenue: 0,
        totalEnrollments: 0,
    })

    function getVideoId(url) {
        const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const match = url.match(regExp)
        return match ? match[1] : null
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseData = await getCourseById(id)
                setCourse(courseData)
                try {
                    const revenueData = await getRevenueCourses()
                    const courseStats = revenueData.find((item) => item.course_id === Number.parseInt(id))

                    if (courseStats) {
                        setCourseStats({
                            totalRevenue: courseStats.total_revenue || 0,
                            totalEnrollments: courseStats.total_enrollments || 0,
                        })
                    } else {
                        setCourseStats({
                            totalRevenue: 0,
                            totalEnrollments: 0,
                        })
                    }
                } catch (error) {
                    console.error("Failed to fetch course stats:", error)
                    setCourseStats({
                        totalRevenue: 0,
                        totalEnrollments: 0,
                    })
                }
            } catch (error) {
                console.error("Failed to fetch course info:", error)
            }
        }
        if (id) {
            fetchCourse()
        }
    }, [id])

    const fetchSections = async () => {
        try {
            setLoading(true)
            const data = await getchSectionsWithLessons(id, user.access_token)

            setSections(data)
            let allLessons = []
            data.forEach((section) => {
                if (section.lessons && Array.isArray(section.lessons)) {
                    const sectionLessons = section.lessons.map((lesson) => ({
                        ...lesson,
                        section_id: section.id,
                    }))
                    allLessons = [...allLessons, ...sectionLessons]
                }
            })
            setLessons(allLessons)

            if (data.length > 0) {
                setActiveSection(data[0].id)
            }

            if (allLessons.length > 0) {
                setSelectedLesson(allLessons[0])
            }

            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch sections:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchSections()
        }
    }, [id])

    const handleClose = () => {
        navigate("/admin/courses")
    }

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId)
    }

    const getTotalLessons = () => {
        return lessons.length
    }

    const getLessonsForSection = (sectionId) => {
        return lessons.filter((lesson) => lesson.section_id === sectionId)
    }

    const formatArticleContent = (content) => {
        if (!content) return []
        return content.split("\r\n\r\n").filter((item) => item.trim() !== "")
    }

    const formatPrice = (price) => {
        if (!price || price === "0.00") return "Free"
        return `${Number.parseFloat(price).toLocaleString()} VNĐ`
    }

    const formatRevenue = (revenue) => {
        return `${Number.parseFloat(revenue).toLocaleString()} VNĐ`
    }

    const handleLessonSelect = (lesson) => {
        setSelectedLesson(lesson)
    }

    const isPaid = course?.is_paid
    const themeColors = isPaid
        ? {
            primary: "indigo",
            secondary: "purple",
            accent: "pink",
            light: "violet",
        }
        : {
            primary: "emerald",
            secondary: "teal",
            accent: "cyan",
            light: "sky",
        }

    if (loading) {
        return (
            <div className="container mx-auto p-4 md:p-6 max-w-7xl relative bg-white rounded-xl shadow-lg">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 text-gray-700 hover:text-gray-900 z-10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/*Skeleton loading 💀💀💀*/}
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 w-2/3 mb-6 rounded-md"></div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/3">
                            <div className="h-72 md:h-96 bg-gray-200 mb-8 rounded-lg w-full"></div>
                            <div className="space-y-2 mb-8">
                                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="h-6 bg-gray-200 w-40 mb-4 rounded-md"></div>
                            <div className="space-y-4 mb-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="h-12 bg-gray-200 p-4 flex justify-between items-center">
                                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                            <div className="h-4 bg-gray-300 rounded w-8"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })
    }

    // Render the lesson content
    const renderLessonContent = () => {
        if (!selectedLesson) return null

        const articlePoints = formatArticleContent(selectedLesson.article_content)
        const isYoutubeVideo = selectedLesson.video_url && selectedLesson.video_url.includes("youtube.com")

        return (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">{selectedLesson.title}</h2>

                {isYoutubeVideo && (
                    <div className="aspect-video mb-6 w-full h-auto min-h-[480px]">
                        <iframe
                            className="w-full h-full rounded-lg shadow"
                            src={`https://www.youtube.com/embed/${getVideoId(selectedLesson.video_url)}`}
                            title={selectedLesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Article content */}
                {articlePoints.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Lesson Content:</h3>
                        <div className="space-y-3 pl-2">
                            {articlePoints.map((point, idx) => (
                                <p key={idx} className="text-gray-600 flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span>{point}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div
            className={`container mx-auto p-4 md:p-6 max-w-7xl bg-gradient-to-br from-${themeColors.light}-50 to-white rounded-xl shadow-lg relative`}
        >
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-emerald-50 transition-colors duration-300 text-emerald-500 hover:text-emerald-600 z-10 shadow-md"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Main content area */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Lesson content*/}
                <div className="lg:w-3/4 order-2 lg:order-1">
                    {selectedLesson ? (
                        renderLessonContent()
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a lesson to start learning</h3>
                                <p className="text-gray-500">Choose a lesson from the course content on the right to begin.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side - Course content and image */}
                <div className="lg:w-1/4 order-1 lg:order-2">
                    <div className="space-y-4">
                        {/* Course title and image */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                            <div className="relative">
                                <img
                                    src={course.image || "/placeholder.svg?height=200&width=400"}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 left-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${isPaid
                                            ? "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800"
                                            : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800"
                                            }`}
                                    >
                                        {isPaid ? "Premium" : "Free"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h1 className="text-xl font-bold text-emerald-800 mb-2">{course.title}</h1>

                                <div className="flex flex-wrap gap-2 text-sm text-emerald-700">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-emerald-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            />
                                        </svg>
                                        <span>{getTotalLessons()} lessons</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-emerald-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>{formatDate(course.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About This Course section */}
                        <div className="bg-gradient-to-r from-emerald-50 to-sky-50 p-4 rounded-lg mb-4 shadow-md border border-emerald-100">
                            <h2 className="text-lg font-semibold text-emerald-800 mb-2">About This Course</h2>
                            <p className="text-gray-700 text-sm leading-relaxed">{course.description}</p>
                        </div>

                        {/* Course Stats section (replacing enrollment section) */}
                        <div
                            className={`bg-gradient-to-r ${isPaid ? "from-indigo-500 to-purple-500" : "from-green-500 to-teal-500"} 
                            rounded-lg p-4 shadow-lg mb-4`}
                        >
                            <h2 className="text-lg font-semibold text-white mb-3">Course Statistics</h2>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
                                    <div className="text-white/80 text-xs mb-1">Doanh thu:</div>
                                    <div className="text-xl font-bold">{formatRevenue(courseStats.totalRevenue)}</div>
                                </div>

                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-white">
                                    <div className="text-white/80 text-xs mb-1">Học viên:</div>
                                    <div className="text-xl font-bold">{courseStats.totalEnrollments}</div>
                                </div>
                            </div>

                            <div className="mt-3 text-center">
                                <p className="text-white/80 text-sm">Giá khóa học: {formatPrice(course.price)}</p>
                            </div>
                        </div>

                        {/* Course content section */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-cyan-50 p-3 border-b-2 border-cyan-200 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-cyan-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                                <h3 className="text-lg font-semibold text-cyan-800">Course Content</h3>
                                <span className="ml-auto text-sm text-gray-500">
                                    {sections.length} sections • {getTotalLessons()} lessons
                                </span>
                            </div>

                            <div className="max-h-[calc(100vh-600px)] overflow-y-auto">
                                {sections.length > 0 ? (
                                    <div>
                                        {sections.map((section) => {
                                            const sectionLessons = getLessonsForSection(section.id)
                                            return (
                                                <div key={section.id} className="border-b border-gray-100 last:border-b-0">
                                                    <div
                                                        className="p-3 flex justify-between items-center cursor-pointer hover:bg-sky-50 transition-colors duration-200"
                                                        onClick={() => toggleSection(section.id)}
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="w-7 h-7 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full mr-2 text-sm font-medium">
                                                                {section.id > 2 ? section.id - 2 : section.id}
                                                            </span>
                                                            <h4 className="font-medium text-gray-800 text-sm">{section.title}</h4>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-gray-500">{sectionLessons.length}</span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className={`h-4 w-4 transition-transform duration-200 ${activeSection === section.id ? "transform rotate-180" : ""
                                                                    }`}
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Lessons for this section */}
                                                    {activeSection === section.id && (
                                                        <div className="bg-gray-50 p-2 space-y-1">
                                                            {sectionLessons.length > 0 ? (
                                                                sectionLessons.map((lesson) => {
                                                                    const isYoutubeVideo = lesson.video_url && lesson.video_url.includes("youtube.com")
                                                                    const isActive = selectedLesson && selectedLesson.id === lesson.id

                                                                    return (
                                                                        <div
                                                                            key={lesson.id}
                                                                            className={`rounded-md border ${isActive ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-white"} overflow-hidden cursor-pointer`}
                                                                            onClick={() => handleLessonSelect(lesson)}
                                                                        >
                                                                            <div className="flex items-start p-2 hover:bg-sky-50 transition-colors duration-200">
                                                                                <div className="flex-shrink-0 mr-2">
                                                                                    {isYoutubeVideo ? (
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            className="h-4 w-4 text-cyan-500"
                                                                                            fill="none"
                                                                                            viewBox="0 0 24 24"
                                                                                            stroke="currentColor"
                                                                                        >
                                                                                            <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                strokeWidth={2}
                                                                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                                            />
                                                                                            <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                strokeWidth={2}
                                                                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                            />
                                                                                        </svg>
                                                                                    ) : (
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            className="h-4 w-4 text-emerald-500"
                                                                                            fill="none"
                                                                                            viewBox="0 0 24 24"
                                                                                            stroke="currentColor"
                                                                                        >
                                                                                            <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                strokeWidth={2}
                                                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                                            />
                                                                                        </svg>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex-grow">
                                                                                    <h5 className="text-gray-800 text-sm">{lesson.title}</h5>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            ) : (
                                                                <div className="text-center py-3 text-gray-500 text-sm">
                                                                    No lessons available in this section
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-cyan-50 p-4 text-center border border-cyan-100">
                                        <p className="text-gray-500 text-sm">No sections available for this course yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailViewer
