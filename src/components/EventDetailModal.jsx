import { X } from "lucide-react"

const EventDetailModal = ({ event, onClose }) => {
    if (!event) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white max-w-lg w-full p-6 rounded-lg relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                    <X className="w-5 h-5" />
                </button>
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded mb-4" />
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-sm text-gray-600"><strong>Thời gian:</strong> {event.date} | {event.time}</p>
                <p className="text-sm text-gray-600"><strong>Địa điểm:</strong> {event.location}</p>
                <p className="text-sm text-gray-600"><strong>Người hướng dẫn:</strong> {event.instructor}</p>
                <p className="text-sm text-gray-600"><strong>Giá:</strong> {event.price}</p>
            </div>
        </div>
    )
}

export default EventDetailModal
