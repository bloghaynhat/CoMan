import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import PreviewPlayer from "../components/PreviewPlayer";
import axios from "axios"
import ConfirmPayment from "../components/ConfirmPayment";

const CourseDetail = () => {
    const { user, setUser } = useContext(UserContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()
    const [sections, setSections] = useState([])
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState({})
    const [course, setCourse] = useState({})
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);
    const userHasAccess = async (user, courseId) => {
        if (!user || !user.access_token) {
            return false;
        }

        try {
            const enrollResponse = await axios.get("https://comanbe.onrender.com/api/enrollments/", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            });

            const enrollments = enrollResponse.data;
            const hasAccess = enrollments.some(
                (enroll) => enroll.user === user.id && enroll.course.id === courseId
            );

            return hasAccess;
        } catch (error) {
            console.error("Lỗi khi kiểm tra quyền truy cập:", error);
            return false;
        }
    };


    function getVideoId(url) {
        const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    useEffect(() => {
        const checkAccess = async () => {
            if (user && course?.id) {
                const result = await userHasAccess(user, course.id);
                setHasAccess(result);
            }
        };
        if (user !== null && course?.id) {
            checkAccess();
        }
    }, [user, course, hasAccess]);


    const handleEnroll = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowConfirm(true);
    };

    const handlePaymentSuccess = () => {
        setHasAccess(true);
        setShowConfirm(false);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`https://comanbe.onrender.com/api/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error("Failed to fetch course info:", error);
            }
        };
        if (id) {
            fetchCourse();
        }
    }, [id]);

    const fetchSections = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://comanbe.onrender.com/api/courses/${id}/sections-with-lessons/`);
            const data = res.data;

            setSections(data);
            let allLessons = [];
            data.forEach((section) => {
                if (section.lessons && Array.isArray(section.lessons)) {
                    const sectionLessons = section.lessons.map((lesson) => ({
                        ...lesson,
                        section_id: section.id,
                    }));
                    allLessons = [...allLessons, ...sectionLessons];
                }
            });
            setLessons(allLessons);

            if (data.length > 0) {
                setActiveSection(data[0].id);
            }
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch sections:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (id) {
            fetchSections();
        }
    }, [id]);

    const handleClose = () => {
        navigate(-1)
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
            <div className="container mx-auto p-4 md:p-6 max-w-5xl relative bg-white rounded-xl shadow-lg">
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
                    <div className="h-72 md:h-96 bg-gray-200 mb-8 rounded-lg w-full"></div>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="h-6 bg-gray-200 w-32 rounded-md"></div>
                        <div className="h-6 bg-gray-200 w-32 rounded-md"></div>
                        <div className="h-6 bg-gray-200 w-32 rounded-md"></div>
                    </div>
                    <div className="space-y-2 mb-8">
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                    </div>

                    {/* Section skeleton 💀💀💀*/}
                    <div className="h-6 bg-gray-200 w-40 mb-4 rounded-md"></div>

                    {/* Course content skeleton - sections 💀💀💀*/}
                    <div className="space-y-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="h-12 bg-gray-200 p-4 flex justify-between items-center">
                                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-8"></div>
                                </div>
                                <div className="p-4 space-y-3">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-8 bg-gray-200 w-48 rounded-md mt-6"></div>
                </div>
            </div>
        )
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })
    }

    return (
        <div
            className={`container mx-auto p-4 md:p-6 max-w-5xl bg-gradient-to-br from-${themeColors.light}-50 to-white rounded-xl shadow-lg relative`}
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

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-emerald-800 mb-4 pb-2 border-b-2 border-emerald-200">
                    {course.title}
                </h1>

                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
                    <img
                        src={course.image || "/placeholder.svg?height=400&width=600"}
                        alt={course.title}
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0"></div>

                    <div className="absolute top-4 left-4">
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

                <div className="flex flex-wrap gap-6 mb-6 text-emerald-700 bg-sky-50 p-4 rounded-lg shadow-inner">
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-emerald-500"
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

                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-emerald-500"
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

            <div className="bg-gradient-to-r from-emerald-50 to-sky-50 p-6 rounded-lg mb-8 shadow-md border border-emerald-100">
                <h2 className="text-xl font-semibold text-emerald-800 mb-3">About This Course</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Content - Sections and Lessons */}
            <div className="mb-8">
                <div className="flex items-center mb-4 bg-cyan-50 p-3 rounded-t-lg border-b-2 border-cyan-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className="text-xl font-semibold text-cyan-800">Course Content</h3>
                    <span className="ml-auto text-sm text-gray-500">
                        {sections.length} sections • {getTotalLessons()} lessons
                    </span>
                </div>

                {sections.length > 0 ? (
                    <div className="bg-white rounded-b-lg overflow-hidden shadow-md">
                        {sections.map((section) => {
                            const sectionLessons = getLessonsForSection(section.id)
                            return (
                                <div key={section.id} className="border-b border-gray-100 last:border-b-0">
                                    <div
                                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-sky-50 transition-colors duration-200"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full mr-3 font-medium">
                                                {section.id > 2 ? section.id - 2 : section.id}
                                            </span>
                                            <h4 className="font-medium text-gray-800">{section.title}</h4>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500">{sectionLessons.length} lessons</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 transition-transform duration-200 ${activeSection === section.id ? "transform rotate-180" : ""
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
                                        <div className="bg-gray-50 p-4 space-y-2">
                                            {sectionLessons.length > 0 ? (
                                                sectionLessons.map((lesson) => {
                                                    const articlePoints = formatArticleContent(lesson.article_content)
                                                    const isYoutubeVideo = lesson.video_url && lesson.video_url.includes("youtube.com")
                                                    return (
                                                        <div key={lesson.id} className="rounded-md border border-gray-100 overflow-hidden">
                                                            <div className="flex items-start p-3 bg-white hover:bg-sky-50 transition-colors duration-200">
                                                                <div className="flex-shrink-0 mr-3">
                                                                    {isYoutubeVideo ? (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5 text-cyan-500"
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
                                                                            className="h-5 w-5 text-emerald-500"
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
                                                                    <h5 className="text-gray-800 font-medium">{lesson.title}</h5>

                                                                    {/* Kiểm tra khóa học trả phí và người dùng đã đăng nhập chưa */}
                                                                    {(!user) ? (
                                                                        <div>
                                                                            <p className="text-sm text-red-500 mb-2">
                                                                                Chưa đăng nhập gì đó.
                                                                            </p>
                                                                            <PreviewPlayer videoId={getVideoId(lesson.video_url)} />
                                                                        </div>
                                                                    ) : (
                                                                        isYoutubeVideo && (
                                                                            <>
                                                                                {/* Kiểm tra trả phí và mua hay chưa*/}
                                                                                {!hasAccess ? (
                                                                                    <div>
                                                                                        <p className="text-sm text-red-500 mb-2">
                                                                                            Đây là bản xem trước. Vui lòng mua khóa học để xem toàn bộ nội dung.
                                                                                        </p>
                                                                                        <PreviewPlayer videoId={getVideoId(lesson.video_url)} />
                                                                                    </div>
                                                                                ) : (
                                                                                    <iframe
                                                                                        className="w-full aspect-video rounded-lg shadow"
                                                                                        src={lesson.video_url}
                                                                                        title={lesson.title}
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                        allowFullScreen
                                                                                    />

                                                                                )}
                                                                            </>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700">
                                                                    Preview
                                                                </span>
                                                            </div>

                                                            {/* Article content */}
                                                            {articlePoints.length > 0 && (
                                                                <div className="bg-gray-50 p-4 border-t border-gray-100">
                                                                    <h6 className="text-sm font-medium text-gray-700 mb-2">Lesson Content:</h6>
                                                                    <ul className="space-y-1 pl-2">
                                                                        {articlePoints.map((point, idx) => (
                                                                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                                                <span className="text-emerald-500 mr-2">•</span>
                                                                                <span>{point}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div className="text-center py-4 text-gray-500">No lessons available in this section</div>
                                            )}
                                        </div>
                                    )
                                    }
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-cyan-50 p-6 rounded-lg text-center border border-cyan-100">
                        <p className="text-gray-500">No sections available for this course yet.</p>
                    </div>
                )}
            </div>

            {isPaid ? (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white shadow-lg">
                    <div>
                        <p className="text-white/80 mb-1">Giá:</p>
                        <p className="text-3xl font-bold">{formatPrice(course.price)}</p>
                    </div>
                    {hasAccess ? (
                        <span className="mt-4 md:mt-0 px-8 py-3 bg-green-100 text-green-700 rounded-lg font-medium shadow-md inline-block">
                            Đã mua
                        </span>
                    ) : (
                        <>
                            <button
                                onClick={handleEnroll}
                                className="mt-4 md:mt-0 px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 font-medium shadow-md"
                            >
                                Đăng ký ngay
                            </button>

                            <ConfirmPayment
                                show={showConfirm}
                                onClose={() => setShowConfirm(false)}
                                user={user}
                                course={course}
                                onSuccess={handlePaymentSuccess}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white shadow-lg">
                    <div>
                        <p className="text-white/80 mb-1">Khóa học miễn phí:</p>
                        <p className="text-3xl font-bold">Miễn phí</p>
                    </div>
                    {hasAccess ? (
                        <span className="mt-4 md:mt-0 px-8 py-3 bg-green-100 text-green-700 rounded-lg font-medium shadow-md inline-block">
                            Đã đăng ký
                        </span>
                    ) : (
                        <>
                            <button
                                onClick={handleEnroll}
                                className="mt-4 md:mt-0 px-8 py-3 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors duration-300 font-medium shadow-md"
                            >
                                Đăng ký ngay
                            </button>
                            <ConfirmPayment
                                show={showConfirm}
                                onClose={() => setShowConfirm(false)}
                                user={user}
                                course={course}
                                onSuccess={handlePaymentSuccess}
                            />
                        </>


                    )}
                </div>
            )}

        </div>
    )
}

export default CourseDetail
