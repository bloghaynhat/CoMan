import { useState, useEffect } from "react"
import EventDetailModal from './EventDetailModal';
const EventCard = ({ event, registeredItem, handleEventAction, loadingEventId }) => {
    // Su kien khi click vao xem chi tiet
    const [selectedEvent, setSelectedEvent] = useState(null)
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const isLoading = loadingEventId === (registeredItem ? registeredItem.id : event.id);

    const XemChiTiet = (event) => {
        setSelectedEvent(event)
        console.log(event)
    }
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col"

        >
            <div className="relative">
                <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-clock mr-1"></i>
                    <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    <span className="text-sm">{event.location}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    onClick={(e) => {
                        e.preventDefault()
                        XemChiTiet(event)
                    }}
                >Xem Chi tiết</button>
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t flex justify-between items-center">
                <span className="text-sm font-medium">{event.price}</span>

                <button
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium rounded transition-colors ${registeredItem
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleEventAction(registeredItem ? registeredItem.id : event.id, !!registeredItem)}
                >
                    {isLoading ? "Đang xử lý..." : (registeredItem ? "Hủy đăng ký" : "Đăng ký ngay")}
                </button>
            </div>

            {
                selectedEvent && (
                    <EventDetailModal
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )
            }
        </div>
    );
};

export default EventCard;
