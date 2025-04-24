import { X } from "lucide-react"


// Con phan API roi su kien dang ki 
const EventDetailModal = ({ event, onClose }) => {
    if (!event) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div
                className="bg-white max-w-5xl w-full p-8 rounded-lg relative overflow-y-auto max-h-[90vh]">
                {/* overflow-y-auto */}
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 text-white hover:text-gray-700 transition-colors p-1 bg-red-500 rounded"
                >
                    <X className="w-6 h-6" />
                </button>
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center ">{event.title}</h2>

                {/* Image */}
                <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-56 object-cover rounded-lg mb-6"
                />


                
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                    <h2 className="text-2xl font-bold mb-6">Mô tả</h2>
                </blockquote>
                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-4 text-xl">{event.description}</p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                    <h2 className="text-2xl font-bold mb-6">Thông tin</h2>
                </blockquote>
                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">

                    <p className=" text-xl font-normal" ><span className=" text-xl font-semibold">🗓️ Thời gian:</span> {event.date} | {event.time}</p>
                    <p className=" text-xl font-normal" ><span className=" text-xl font-semibold">📍 Địa điểm:</span> {event.location}</p>
                    <p className=" text-xl font-normal" ><span className=" text-xl font-semibold">👤 Hướng dẫn:</span> {event.instructor}</p>
                    <p className=" text-xl font-normal" ><span className="text-xl font-semibold">💰 Giá:</span> {event.price}</p>
                

                </div>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                    <h2 className="text-2xl font-bold mb-6">Đối tượng tham gia</h2>
                </blockquote>
                <p className="text-gray-700 leading-relaxed mb-4 text-xl" >{event.targetAudience}</p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                    <h2 className="text-2xl font-bold mb-6">Tin tức</h2>
                </blockquote>

                {/* Additional Description if any */}
                {event.additional_description && (


                    <p className="text-xl text-gray-500 font-normal mb-6 text-justify">{event.additional_description}</p>
                )}

                {/* Button */}
                <div className=" text-center">
                    <button

                        className="inline-block bg-green-600 hover:bg-blue-700 transition-colors px-6 py-3 mr-10 rounded-md text-white font-medium"
                    >
                        Đăng ký tham gia
                    </button>

                    <button
                        onClick={onClose}
                        className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md text-white font-medium"
                    >
                        Trở về trang sự kiện
                    </button>
                </div>
            </div>

        </div>
    )
}

export default EventDetailModal
