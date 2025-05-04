
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Tag, Info } from "lucide-react"
import EventCardBanner from "./EventCardBanner.jsx"
import EventDetailModal from "./EventDetailModal.jsx"
import axios from "axios";
import { startOfWeek, endOfWeek, isAfter, isBefore } from "date-fns"; // Các hàm cần thiết

const FeaturedEventsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const eventsPerPage = 3
  const [events, setEvents] = useState([])

  // Su kien khi click vao xem chi tiet
  const [selectedEvent, setSelectedEvent] = useState(null)
  // Ham xem chi tiet su kien
  const XemChiTiet = (event) => {
    setSelectedEvent(event)
    console.log(event)
  }

  const [noEvents, setNoEvents] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://comanbe.onrender.com/api/events/")
      .then((response) => {
        const allEvents = response.data;

        // Lấy ngày hiện tại và tính toán ngày bắt đầu và kết thúc tuần
        const today = new Date();
        const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Bắt đầu tuần từ thứ 2
        const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });   // Kết thúc tuần vào chủ nhật

        // Lọc các sự kiện có ngày nằm trong tuần này
        const eventsThisWeek = allEvents.filter((event) => {
          const eventDate = new Date(event.date); // Ngày của sự kiện

          // Kiểm tra nếu sự kiện có ngày nằm trong tuần này
          return isAfter(eventDate, startOfWeekDate) && isBefore(eventDate, endOfWeekDate);
        });

        // Nếu không có sự kiện nào, set trạng thái là không có sự kiện
        if (eventsThisWeek.length === 0) {
          setNoEvents(true);
        } else {
          setNoEvents(false);
        }

        // Cập nhật danh sách sự kiện
        setEvents(eventsThisWeek);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        setLoading(false);
      });
  }, []);


  const categories = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hội thảo" },
    { id: 3, name: "Webinar" },
    { id: 4, name: "Khóa học" },
    { id: 5, name: "Khác" },
  ]

  // hàm lấy danh sách tiếp theo
  const handleNext = () => {
    if (currentIndex + eventsPerPage < events.length) {
      setCurrentIndex(currentIndex + eventsPerPage)
    }
  }

  // hàm lấy danh sách trước đó
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
      <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6 -ml-20">
        <h2 className="text-2xl font-bold">Sự kiện trong tuần</h2>
      </blockquote>

      {
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
              <EventCardBanner
                key={event.id}
                event={event}
                onViewDetail={XemChiTiet}
              />
            ))}
          </div>
        ) : noEvents ? (
          <div className="text-center">
            <p>Không có sự kiện cho tuần này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
              <EventCardBanner
                key={event.id}
                event={event}
                onViewDetail={XemChiTiet}
              />
            ))}
          </div>
        )
      }


      {/* Events grid */}


      {/* Navigation controls - Bottom */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center px-4 py-2 rounded-md ${currentIndex === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            }`}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Trước</span>
        </button>

        <div className="flex items-center px-4">
          <span className="text-gray-600">
            {Math.floor(currentIndex / eventsPerPage) + 1}/{Math.ceil(events.length / eventsPerPage)}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex + eventsPerPage >= events.length}
          className={`flex items-center px-4 py-2 rounded-md ${currentIndex + eventsPerPage >= events.length
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            }`}
        >
          <span>Tiếp theo</span>
          <ChevronRight className="h-5 w-5 ml-1" />
        </button>
      </div>

      {/* Modal for event details */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}

export default FeaturedEventsBanner
