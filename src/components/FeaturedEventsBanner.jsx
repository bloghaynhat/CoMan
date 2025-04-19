"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Tag, Info } from "lucide-react"

const FeaturedEventsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const eventsPerPage = 3

  const eventsData = [
    {
      id: 1,
      title: "Hội thảo Lập trình Web Frontend 2024",
      date: "2024-05-15",
      time: "09:00 - 12:00",
      location: "Hà Nội",
      category: "workshop",
      image: "https://www.gosell.vn/blog/wp-content/uploads/2023/08/frontend-01-1.jpg",
      instructor: "Nguyễn Văn A",
      attendees: 45,
      description:
        "Hội thảo chuyên sâu về các công nghệ mới nhất trong lập trình Frontend như React, Next.js và các xu hướng thiết kế UI/UX hiện đại.",
      isFeatured: true,
      price: "Miễn phí",
    },
    {
      id: 2,
      title: "HHHHHHHHHHH",
      date: "2024-05-20",
      time: "19:30 - 21:00",
      location: "Online",
      category: "webinar",
      image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
      instructor: "Trần Thị B",
      attendees: 120,
      description:
        "Tìm hiểu về cách AI và Machine Learning đang thay đổi ngành công nghệ và cách bạn có thể bắt đầu sự nghiệp trong lĩnh vực này.",
      isFeatured: false,
      price: "Miễn phí",
    },
    {
      id: 3,
      title: "Ra mắt khóa học: Full-stack JavaScript",
      date: "2024-05-25",
      time: "14:00 - 16:00",
      location: "Hồ Chí Minh",
      category: "launch",
      image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
      instructor: "Lê Văn C",
      attendees: 75,
      description:
        "Sự kiện ra mắt khóa học mới về Full-stack JavaScript với Node.js, Express và React. Đặc biệt giảm giá 30% cho người tham dự sự kiện.",
      isFeatured: true,
      price: "100.000đ",
    },
    {
      id: 4,
      title: "Workshop: UX/UI Design cho người mới bắt đầu",
      date: "2024-06-05",
      time: "09:00 - 16:00",
      location: "Đà Nẵng",
      category: "workshop",
      image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
      instructor: "Phạm Thị D",
      attendees: 30,
      description: "Workshop thực hành về thiết kế UX/UI cho người mới bắt đầu.",
      isFeatured: false,
      price: "200.000đ",
    },
    {
      id: 5,
      title: "Hội thảo: Blockchain và Web3",
      date: "2024-06-10",
      time: "13:30 - 17:00",
      location: "Hà Nội",
      category: "workshop",
      image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
      instructor: "Hoàng Văn E",
      attendees: 60,
      description:
        "Khám phá công nghệ Blockchain và Web3, cách chúng đang thay đổi internet và cơ hội nghề nghiệp trong lĩnh vực này.",
      isFeatured: false,
      price: "150.000đ",
    },
    {
      id: 6,
      title: "Webinar: DevOps cho doanh nghiệp",
      date: "2024-06-15",
      time: "19:00 - 20:30",
      location: "Online",
      category: "webinar",
      image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
      instructor: "Trương Văn F",
      attendees: 90,
      description:
        "Tìm hiểu về cách triển khai DevOps trong doanh nghiệp, các công cụ và quy trình giúp tối ưu hóa quá trình phát triển phần mềm.",
      isFeatured: false,
      price: "Miễn phí",
    },
  ]

  const categories = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hội thảo" },
    { id: 3, name: "Webinar" },
    { id: 4, name: "Khóa học" },
    { id: 5, name: "Khác" },
  ]

  const handleNext = () => {
    if (currentIndex + eventsPerPage < eventsData.length) {
      setCurrentIndex(currentIndex + eventsPerPage)
    }
  }

  const handlePrev = () => {
    if (currentIndex - eventsPerPage >= 0) {
      setCurrentIndex(currentIndex - eventsPerPage)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative h-48">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 right-0 m-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                  {event.category}
                </span>
              </div>
              {event.price === "Miễn phí" && (
                <div className="absolute bottom-0 left-0 m-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    {event.price}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 flex-grow">
              <h3 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2">{event.title}</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    {formatDate(event.date)} | {event.time}
                  </span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{event.location}</span>
                </div>

                {event.price !== "Miễn phí" && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{event.price}</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  <Info className="h-4 w-4 inline mr-2 text-blue-500" />
                  {event.description}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t">
              <a
                href={`/events/${event.id}`}
                className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Xem chi tiết
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls - Bottom */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          }`}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Trước</span>
        </button>

        <div className="flex items-center px-4">
          <span className="text-gray-600">
            {Math.floor(currentIndex / eventsPerPage) + 1}/{Math.ceil(eventsData.length / eventsPerPage)}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex + eventsPerPage >= eventsData.length}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentIndex + eventsPerPage >= eventsData.length
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          }`}
        >
          <span>Tiếp theo</span>
          <ChevronRight className="h-5 w-5 ml-1" />
        </button>
      </div>
    </div>
  )
}

export default FeaturedEventsBanner
