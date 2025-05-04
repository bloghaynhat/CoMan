import { useState, useEffect } from "react"
import { Calendar, MapPin, Tag, Info, ChevronRight } from "lucide-react"

const EventCardBanner = ({ event, onViewDetail }) => {
    // Format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString("vi-VN", options)
    }

    return (
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
                        onViewDetail(event);
                    }}
                >
                    Xem chi tiết
                    <ChevronRight className="h-4 w-4 ml-1" />
                </a>
            </div>
        </div>
    );
};

export default EventCardBanner;