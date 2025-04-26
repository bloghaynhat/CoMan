import React from 'react';

const EventCard = ({ event, registeredItem, handleEventAction, categories }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    }
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
            <div className="relative">
                <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 mt-2 mr-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {categories.find((c) => c.id === event.categoryId)?.name || event.category}
                    </span>
                </div>
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
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t flex justify-between items-center">
                <span className="text-sm font-medium">{event.price}</span>
                {registeredItem ? (
                    <button
                        className="px-4 py-2 text-sm font-medium rounded transition-colors bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleEventAction(registeredItem.id, true)}
                    >
                        Hủy đăng ký
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 text-sm font-medium rounded transition-colors bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => handleEventAction(event.id, false)}
                    >
                        Đăng ký ngay
                    </button>
                )}
            </div>
        </div>
    );
};
export default EventCard;