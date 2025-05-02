"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const CourseDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [sections, setSections] = useState([])
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState(null)

    // Fetch course details
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true)
                const res = await fetch(`https://comanbe.onrender.com/api/courses/${id}`)
                const data = await res.json()
                setCourse(data)
            } catch (error) {
                console.error("Failed to fetch course:", error)
            }
        }

        fetchCourse()
    }, [id])

    // Fetch sections by course id
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const res = await fetch(`https://comanbe.onrender.com/api/sections?course=${course.id}`);
                const data = await res.json();
                setSections(data);
            } catch (error) {
                console.error("Failed to fetch sections:", error);
            }
        };

        if (course && course.id) {
            fetchSections();
        }
    }, [course]); // Chỉ chạy khi course đã có dữ liệu


    // Fetch lessons by section id
    const [hasFetchedLessons, setHasFetchedLessons] = useState(false)

    useEffect(() => {
        const fetchLessons = async () => {
            if (hasFetchedLessons || sections.length === 0) return

            try {
                const sectionIds = sections.map(section => section.id)
                console.log("Fetching lessons for section IDs:", sectionIds.join(", "))

                const allLessons = []

                for (const sectionId of sectionIds) {
                    const res = await fetch(`https://comanbe.onrender.com/api/lessons?section=${sectionId}`)
                    const data = await res.json()
                    allLessons.push(...data)
                }

                setLessons(allLessons)
                setHasFetchedLessons(true)
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch lessons:", error)
                setLoading(false)
            }
        }

        fetchLessons()
    }, [sections, hasFetchedLessons])


    const sectionIds = sections.map(section => section.id)
    console.log("Fetching lessons for section IDs:", sectionIds.join(", "));




    const handleClose = () => {
        navigate(-1)
    }

    // Get lessons for a specific section
    const getLessonsForSection = (sectionId) => {
        return lessons.filter((lesson) => lesson.section_id === sectionId)
    }

    // Toggle section visibility
    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId)
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
                {/*Skeleton loading*/}
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

                    {/* Section skeleton */}
                    <div className="h-6 bg-gray-200 w-40 mb-4 rounded-md"></div>

                    {/* Course content skeleton - sections */}
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
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
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

    // Determine if course is paid
    const isPaid = course.price && course.price > 0

    // Define theme colors based on course type
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

    // Calculate total lessons
    const totalLessons = lessons.length

    return (
        <div
            className={`container mx-auto p-4 md:p-6 max-w-5xl bg-gradient-to-br from-${themeColors.light}-50 to-white rounded-xl shadow-lg relative`}
        >
            <button
                onClick={handleClose}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-${themeColors.primary}-50 transition-colors duration-300 text-${themeColors.primary}-500 hover:text-${themeColors.primary}-600 z-10 shadow-md`}
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
                <h1
                    className={`text-3xl font-bold text-${themeColors.primary}-800 mb-4 pb-2 border-b-2 border-${themeColors.primary}-200`}
                >
                    {course.title}
                </h1>

                <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
                    <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-${themeColors.primary}-900/70 to-transparent`}></div>

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

                <div
                    className={`flex flex-wrap gap-6 mb-6 text-${themeColors.primary}-700 bg-${themeColors.light}-50 p-4 rounded-lg shadow-inner`}
                >
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-${themeColors.primary}-500`}
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
                        <span className="font-medium">{course.instructor || "Instructor"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-${themeColors.primary}-500`}
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
                        <span>{totalLessons} lessons</span>
                    </div>

                    {course.rating && (
                        <div className="flex items-center gap-1">
                            <div className="flex">{renderRating(course.rating)}</div>
                            <span className="ml-1">({course.rating})</span>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={`bg-gradient-to-r from-${themeColors.primary}-50 to-${themeColors.light}-50 p-6 rounded-lg mb-8 shadow-md border border-${themeColors.primary}-100`}
            >
                <h2 className={`text-xl font-semibold text-${themeColors.primary}-800 mb-3`}>About This Course</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {course.requirements && course.requirements.length > 0 && (
                    <div
                        className={`bg-white border border-${themeColors.primary}-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}
                    >
                        <div className="absolute -mt-10 ml-4 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
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
                        </div>
                        <h3
                            className={`text-lg font-semibold text-${themeColors.primary}-800 mb-4 mt-2 pl-2 border-l-4 border-${themeColors.primary}-500`}
                        >
                            Requirements
                        </h3>
                        <ul className="space-y-2">
                            {course.requirements.map((req, index) => (
                                <li
                                    key={index}
                                    className={`flex items-start p-2 rounded-md hover:bg-${themeColors.primary}-50 transition-colors duration-200`}
                                >
                                    <span className={`text-${themeColors.primary}-500 mr-2 font-bold`}>•</span>
                                    <span className="text-gray-700">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {course.goals && course.goals.length > 0 && (
                    <div
                        className={`bg-white border border-${themeColors.secondary}-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}
                    >
                        <div className="absolute -mt-10 ml-4 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3
                            className={`text-lg font-semibold text-${themeColors.secondary}-800 mb-4 mt-2 pl-2 border-l-4 border-${themeColors.secondary}-500`}
                        >
                            What You'll Learn
                        </h3>
                        <ul className="space-y-2">
                            {course.goals.map((goal, index) => (
                                <li
                                    key={index}
                                    className={`flex items-start p-2 rounded-md hover:bg-${themeColors.secondary}-50 transition-colors duration-200`}
                                >
                                    <span className={`text-${themeColors.secondary}-500 mr-2 font-bold`}>•</span>
                                    <span className="text-gray-700">{goal}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Course Content - Sections and Lessons */}
            <div className="mb-8">
                <div
                    className={`flex items-center mb-4 bg-${themeColors.accent}-50 p-3 rounded-t-lg border-b-2 border-${themeColors.accent}-200`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 mr-2 text-${themeColors.accent}-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h3 className={`text-xl font-semibold text-${themeColors.accent}-800`}>Course Content</h3>
                    <span className="ml-auto text-sm text-gray-500">
                        {sections.length} sections • {totalLessons} lessons
                    </span>
                </div>

                {sections.length > 0 ? (
                    <div className="bg-white rounded-b-lg overflow-hidden shadow-md">
                        {sections.map((section) => {
                            const sectionLessons = getLessonsForSection(section.id)
                            return (
                                <div key={section.id} className="border-b border-gray-100 last:border-b-0">
                                    <div
                                        className={`p-4 flex justify-between items-center cursor-pointer hover:bg-${themeColors.light}-50 transition-colors duration-200`}
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-center">
                                            <span
                                                className={`w-8 h-8 flex items-center justify-center bg-${themeColors.primary}-100 text-${themeColors.primary}-700 rounded-full mr-3 font-medium`}
                                            >
                                                {section.order || "•"}
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
                                                sectionLessons.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        className={`flex items-start p-3 rounded-md hover:bg-${themeColors.light}-100 transition-colors duration-200`}
                                                    >
                                                        <div className="flex-shrink-0 mr-3">
                                                            {lesson.type === "video" ? (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`h-5 w-5 text-${themeColors.accent}-500`}
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
                                                            ) : lesson.type === "quiz" ? (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`h-5 w-5 text-${themeColors.secondary}-500`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`h-5 w-5 text-${themeColors.primary}-500`}
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
                                                            <h5 className="text-gray-800">{lesson.title}</h5>
                                                            {lesson.duration && <span className="text-xs text-gray-500">{lesson.duration} min</span>}
                                                        </div>
                                                        {lesson.is_preview && (
                                                            <span
                                                                className={`text-xs px-2 py-1 rounded-full bg-${themeColors.accent}-100 text-${themeColors.accent}-700`}
                                                            >
                                                                Preview
                                                            </span>
                                                        )}
                                                        {isPaid && !lesson.is_preview && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-4 text-gray-500">No lessons available in this section</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div
                        className={`bg-${themeColors.accent}-50 p-6 rounded-lg text-center border border-${themeColors.accent}-100`}
                    >
                        <p className="text-gray-500">No sections available for this course yet.</p>
                    </div>
                )}
            </div>

            {isPaid && (
                <div
                    className={`bg-gradient-to-r from-${themeColors.primary}-500 to-${themeColors.secondary}-500 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center text-white shadow-lg`}
                >
                    <div>
                        <p className="text-white/80 mb-1">Course Price:</p>
                        <p className="text-3xl font-bold">{course.price} VNĐ</p>
                    </div>
                    <button
                        className={`mt-4 md:mt-0 px-8 py-3 bg-white text-${themeColors.primary}-600 rounded-lg hover:bg-${themeColors.primary}-50 transition-colors duration-300 font-medium shadow-md`}
                    >
                        Enroll Now
                    </button>
                </div>
            )}
        </div>
    )
}

export default CourseDetail

