import { X } from "lucide-react";

const EventDetailModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white max-w-4xl w-full p-8 rounded-lg relative overflow-y-auto max-h-[90vh] shadow-xl transition-transform transform duration-300">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-700 transition-colors p-2 rounded-full bg-red-500 hover:bg-red-600"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">{event.title}</h2>

                {/* Image */}
                <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
                />

                {/* Description */}
                <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Mô tả</h2>
                </blockquote>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">{event.description}</p>

                {/* Event Details */}
                <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Thông tin</h2>
                </blockquote>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                    <p className="text-xl"><span className="font-semibold">🗓️ Thời gian:</span> {event.date} | {event.time}</p>
                    <p className="text-xl"><span className="font-semibold">📍 Địa điểm:</span> {event.location}</p>
                    <p className="text-xl"><span className="font-semibold">👤 Hướng dẫn:</span> {event.instructor}</p>
                    <p className="text-xl"><span className="font-semibold">💰 Giá:</span> {event.price}</p>
                </div>

                {/* Target Audience */}
                <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                    <h2 className="text-2xl font-bold text-gray-700 mt-5 mb-5">Đối tượng tham gia</h2>
                </blockquote>
                <p className="text-gray-l700 leading-relaxed mb-6 text-lg">{event.target_audience
                }</p>

                {/* Additional Description */}
                <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Tin tức</h2>
                </blockquote>
                {event.additional_description && (
                    <p className="text-xl text-gray-500 font-normal mb-6 text-justify">{event.additional_description}</p>
                )}

                {/* Buttons */}
                <div className="text-center mt-8">
                    <button
                        onClick={onClose}
                        className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-3 rounded-md text-white font-semibold shadow-md transform hover:scale-105 duration-200"
                    >
                        Trở về trang sự kiện
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
