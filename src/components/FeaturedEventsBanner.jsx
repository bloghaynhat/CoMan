
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Tag, Info } from "lucide-react"
import EventDetailModal from "./EventDetailModal.jsx"
import axios from "axios";

const FeaturedEventsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const eventsPerPage = 3
  const [events, setEvents] = useState([])

  // Su kien khi click vao xem chi tiet
  const [selectedEvent, setSelectedEvent] = useState(null)
  // Ham xem chi tiet su kien
  const XemChiTiet = (id) => {
    const event = events.find((e) => e.id === id)
    setSelectedEvent(event)
    console.log(event)
  }


  useEffect(() => {
    axios.get("https://comanbe.onrender.com/api/events/")
      .then((response) => {
        const allEvents = response.data;
        // Cập nhật state với dữ liệu từ API
        setEvents(allEvents);  
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  

  const categories = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hội thảo" },
    { id: 3, name: "Webinar" },
    { id: 4, name: "Khóa học" },
    { id: 5, name: "Khác" },
  ]

  const handleNext = () => {
    if (currentIndex + eventsPerPage < events.length) {
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
        {events.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative h-48">
              <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
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
                onClick={(e) => {
                  e.preventDefault()
                  XemChiTiet(event.id)
                }}
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
