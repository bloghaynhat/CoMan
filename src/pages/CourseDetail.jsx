import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"

const CourseDetail = () => {
    const { id } = useParams()
    const location = useLocation();
    const { type } = location.state || {};
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log("Course ID:", id)
    console.log("Course Type:", type);


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                let url = "";

                if (type === "free") {
                    url = `https://67d0f74e825945773eb276c8.mockapi.io/CourseDetails/${id}`;
                } else if (type === "paid") {
                    url = `https://67d0f74e825945773eb276c8.mockapi.io/PaidCourse/${id}`;
                } else {
                    throw new Error("Type không hợp lệ hoặc không có!");
                }

                const response = await fetch(url);
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error("Lỗi khi fetch course:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id && type) {
            fetchCourse();
        }
    }, [id, type]);

    const handleClose = () => {
        navigate(-1)
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

                    <div className="h-6 bg-gray-200 w-40 mb-4 rounded-md"></div>

                    <div className="space-y-2 mb-8 pl-5">
                        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
                    </div>

                    <div className="h-8 bg-gray-200 w-48 rounded-md mt-6"></div>
                </div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="container mx-auto p-8 max-w-5xl text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-red-400 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    const renderRating = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>,
            )
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half-star" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#half-gradient)"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>,
            )
        }

        for (let i = stars.length; i < 5; i++) {
            stars.push(
                <svg key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>,
            )
        }

        return stars
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-5xl bg-white rounded-xl shadow-lg relative">
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

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>

                <div className="relative rounded-xl overflow-hidden mb-6">
                    <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${course.type === "paid" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                                }`}
                        >
                            {course.type === "paid" ? "Premium" : "Free"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
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
                        <span className="font-medium">{course.instructor}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
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
                        <span>{course.lessons} lessons</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="flex">{renderRating(course.rating)}</div>
                        <span className="ml-1">({course.rating})</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">About This Course</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {course.requirements && course.requirements.length > 0 && (
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-emerald-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Requirements
                        </h3>
                        <ul className="space-y-2">
                            {course.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-emerald-500 mr-2">•</span>
                                    <span className="text-gray-700">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {course.goals && course.goals.length > 0 && (
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            What You'll Learn
                        </h3>
                        <ul className="space-y-2">
                            {course.goals.map((goal, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    <span className="text-gray-700">{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Course Content
                </h3>

                {course.content && course.content.length > 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {course.content.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 flex items-center ${index !== course.content.length - 1 ? "border-b border-gray-100" : ""}`}
                            >
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-gray-700 font-medium">
                                    {index + 1}
                                </span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="text-gray-500">No content available for this course yet.</p>
                    </div>
                )}
            </div>

            {course.type === "paid" && (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <p className="text-gray-600 mb-1">Course Price:</p>
                        <p className="text-3xl font-bold text-emerald-600">{course.price.toLocaleString()} VNĐ</p>
                    </div>
                    <button className="mt-4 md:mt-0 px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300 font-medium">
                        Múc Ngay 👈🏿
                    </button>
                </div>
            )}
        </div>
    )
}

export default CourseDetail
