"use client"

import { useState, useEffect } from "react"

const SuKien = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const eventsPerPage = 3 // Số lượng sự kiện hiển thị mỗi trang

  // Su kien cho phan tim kiem
  const [searchQuery, setSearchQuery] = useState("") // State cho từ khóa tìm kiếm
  const [selectedCategory, setSelectedCategory] = useState(1) // State cho danh mục đã chọn (1 = Tất cả)
  const [filteredEvents, setFilteredEvents] = useState([]) // State cho danh sách sự kiện đã lọc
  const [featuredEvents, setFeaturedEvents] = useState([]) // State cho sự kiện nổi bật

  // Định nghĩa dữ liệu sự kiện TRƯỚC khi sử dụng trong useEffect
  const eventsData = [
    {
      id: 1,
      title: "Hội thảo Lập trình Web Frontend 2024",
      date: "2024-05-15",
      time: "09:00 - 12:00",
      location: "Hà Nội",
      category: "workshop",
      categoryId: 2, // Thêm categoryId tương ứng với id trong mảng categories
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
      title: "Webinar: Trí tuệ nhân tạo và Machine Learning",
      date: "2024-05-20",
      time: "19:30 - 21:00",
      location: "Online",
      category: "webinar",
      categoryId: 3, // Webinar
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
      categoryId: 4, // Khóa học
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
      categoryId: 2, // Hội thảo
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
      categoryId: 2, // Hội thảo
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
      categoryId: 3, // Webinar
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

  // Khởi tạo featuredEvents khi component mount
  useEffect(() => {
    // Lấy tất cả sự kiện nổi bật từ dữ liệu gốc
    const featured = eventsData.filter((event) => event.isFeatured)
    setFeaturedEvents(featured)

    // Khởi tạo filteredEvents
    setFilteredEvents(eventsData)
  }, [])

  // Hàm lọc sự kiện dựa trên từ khóa tìm kiếm và danh mục (chỉ cho phần "Tất cả sự kiện")
  const filterEvents = () => {
    // Lọc theo từ khóa tìm kiếm và danh mục
    const filtered = eventsData.filter((event) => {
      // Kiểm tra từ khóa tìm kiếm (trong tiêu đề, mô tả, địa điểm)
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Kiểm tra danh mục
      const matchesCategory =
        selectedCategory === 1 || // Tất cả
        event.categoryId === selectedCategory

      return matchesSearch && matchesCategory
    })

    setFilteredEvents(filtered)
  }

  // Gọi hàm lọc khi thay đổi từ khóa tìm kiếm hoặc danh mục
  useEffect(() => {
    filterEvents()
  }, [searchQuery, selectedCategory])

  // Xử lý khi thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Xử lý khi chọn danh mục
  const handleCategoryChange = (categoryId) => {
    console.log("Category selected:", categoryId)
    setSelectedCategory(categoryId)
  }

  // Xử lý khi nhấn nút Next - SỬA LẠI để sử dụng eventsData
  const handleNext = () => {
    console.log("Next clicked", currentIndex, eventsPerPage, eventsData.length)
    if (currentIndex + eventsPerPage < eventsData.length) {
      setCurrentIndex(currentIndex + eventsPerPage)
    }
  }

  // Xử lý khi nhấn nút Prev - SỬA LẠI để sử dụng eventsData
  const handlePrev = () => {
    console.log("Prev clicked", currentIndex, eventsPerPage)
    if (currentIndex - eventsPerPage >= 0) {
      setCurrentIndex(currentIndex - eventsPerPage)
    }
  }

  return (
    <div className="max-w-9xl mx-auto px-4 py-8">
      <blockquote className="border-l-4 border-blue-500 pl-4 italic">
        <h2 className="text-2xl font-semibold mb-4">Sự kiện nổi bật</h2>
      </blockquote>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-blue-300 text-white rounded w-14 h-8 flex items-center justify-center cursor-pointer ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
          {eventsData.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden flex m-3 h-80">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-60 h-78 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-600">
                    <i className="fas fa-calendar-alt"></i> {event.date} - {event.time}
                  </p>
                  <p className="text-gray-600">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </p>
                  <p className="text-gray-600">
                    <i className="fas fa-tag"></i> Giá: {event.price}
                  </p>
                  <p className="mt-2">
                    <i className="fas fa-info-circle"></i> {event.description}
                  </p>
                </div>
                <div className="mt-auto text-right">
                  <a href={`/events/${event.id}`} className="text-blue-500 font-bold">
                    Xem Chi tiết <i className="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex + eventsPerPage >= eventsData.length}
          className={`bg-blue-300 text-white rounded w-14 h-8 flex items-center justify-center cursor-pointer ${
            currentIndex + eventsPerPage >= eventsData.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Phần tìm kiếm và lọc - ĐÃ DI CHUYỂN XUỐNG DƯỚI PHẦN SỰ KIỆN NỔI BẬT */}
      <div className="flex flex-col md:flex-row items-center justify-between my-8 gap-4 py-6 border-t border-b">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm.."
          className="border w-full md:w-80 h-10 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`${
                  selectedCategory === category.id ? "bg-blue-500" : "bg-blue-300"
                } text-white rounded px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Phần tất cả sự kiện */}
      <blockquote className="border-l-4 border-blue-500 pl-4 italic mt-8">
        <h2 className="text-2xl font-semibold mb-4">Tất cả sự kiện</h2>
      </blockquote>

      {filteredEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <div className="relative">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    {categories.find((cat) => cat.id === event.categoryId)?.name || event.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">
                    <i className="fas fa-calendar-alt"></i> {event.date} {event.time}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <span className="text-sm">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t flex justify-between items-center">
                <span className="text-sm font-medium">{event.price}</span>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                  Đăng ký ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-500 text-lg">Không tìm thấy sự kiện nào phù hợp với tìm kiếm của bạn.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory(1)
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  )
}

export default SuKien
