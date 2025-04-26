import React, { useState, useEffect, useContext } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { UserContext } from "../context/UserContext.jsx";

const FeaturedEventsBannerAll = () => {
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All"); // Mặc định là "Tất cả"
    const [allEvents, setAllEvents] = useState([]); // Dữ liệu gốc
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]); // Lưu các sự kiện đã đăng ký
    const [isRegistered, setIsRegistered] = useState(false);

    // Fetch sự kiện đã đăng ký của user
    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            const accessToken = user.access_token;

            if (!accessToken) return;

            try {
                const response = await axios.get("https://comanbe.onrender.com/api/event-registers/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                let registeredIds = response.data.map((item) => item);

                setRegisteredEvents(registeredIds); // Cập nhật lại danh sách sự kiện đã đăng ký

            } catch (error) {
                console.error("Lỗi khi lấy sự kiện đã đăng ký:", error);
            }
        };

        fetchRegisteredEvents();
    }, [user.access_token]);

    useEffect(() => {
        console.log("Các sự kiện đã đăng ký:", registeredEvents);
    }, [registeredEvents]); // Theo dõi sự thay đổi của registeredEvents


    // Chạy lại khi `user.access_token` thay đổi
    const categories = [
        { id: 1, name: "All" },
        { id: 2, name: "workshop" },
        { id: 3, name: "webinar" },
        { id: 4, name: "conference" },
    ];

    const handleEventAction = async (eventId, isRegistered) => {
        const accessToken = user.access_token;
        if (!accessToken) {
            alert("Bạn cần đăng nhập.");
            return;
        }

        try {
            if (isRegistered) {
                // TODO: Hủy đăng ký nếu bạn muốn làm phần này
                await axios.delete(
                    `https://comanbe.onrender.com/api/event-registers/${eventId}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                )
                alert("Xoa su kiện thành công!")

            } else {
                await axios.post(
                    "https://comanbe.onrender.com/api/event-registers/",
                    { event_id: eventId },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                    
                );
                alert("Đăng ký sự kiện thành công!");

                // GỌI LẠI API để lấy danh sách mới
                const response = await axios.get("https://comanbe.onrender.com/api/event-registers/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setRegisteredEvents(response.data); // Cập nhật danh sách mới
            }
        } catch (error) {
            console.error("Lỗi xử lý sự kiện:", error.response?.data || error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };


    // Lấy dữ liệu sự kiện từ API
    useEffect(() => {
        axios.get("https://comanbe.onrender.com/api/events/")
            .then((response) => {
                const allEvents = response.data;
                setAllEvents(allEvents); // Lưu dữ liệu gốc
                setFilteredEvents(allEvents); // Lưu dữ liệu để hiển thị
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    // Lọc sự kiện khi searchQuery, selectedCategory, hoặc allEvents thay đổi
    useEffect(() => {
        const filtered = allEvents.filter((event) => {
            const matchesSearch =
                searchQuery === "" ||
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" || event.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        setFilteredEvents(filtered);
    }, [searchQuery, selectedCategory, allEvents]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("vi-VN", options);
    };

    return (
        <div className="max-w-8xl mx-auto px-4 py-8">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                <h2 className="text-2xl font-bold mb-6">Sự kiện</h2>
            </blockquote>

            {/* Phần tìm kiếm và lọc */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="relative md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sự kiện..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === category.name
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hiển thị sự kiện */}
            {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <p className="text-gray-500 text-lg">Không tìm thấy sự kiện nào phù hợp với tìm kiếm của bạn.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory(1);
                        }}
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => {
                        const registeredItem = registeredEvents.find(
                            (eventRegistered) => eventRegistered.event === event.title
                        );
                        return (
                            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                                <div className="relative">
                                    <img
                                        src={event.image_url || "/placeholder.svg"}
                                        alt={event.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-0 right-0 mt-2 mr-2">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                            {categories.find((cat) => cat.id === event.categoryId)?.name || event.category}
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
                    })}

                </div>
            )}
        </div>
    );
};

export default FeaturedEventsBannerAll;