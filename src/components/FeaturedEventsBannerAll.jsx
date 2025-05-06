import React, { useState, useEffect, useContext, useMemo } from 'react';
import EventCard from './EventCard.jsx';
import SearchBar from './SearchBar.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import NoEvents from './NoEvents.jsx';
import axios from 'axios';
import { UserContext } from "../context/UserContext.jsx";
import { fetchAllEvents } from '@/api/event.js';

const FeaturedEventsBannerAll = () => {
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [allEvents, setAllEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingEventId, setLoadingEventId] = useState(null); // New: loading riêng từng nút


    const categories = [
        { id: 1, name: "All" },
        { id: 2, name: "workshop" },
        { id: 3, name: "webinar" },
        { id: 4, name: "conference" },
    ];

    // Ham lấy ra danh sách sự kiện đã đăng ký của người dùng
    const fetchRegisteredEvents = async () => {
        if (!user?.access_token) return;

        try {
            const { data } = await axios.get("https://comanbe.onrender.com/api/event-registers/", {
                headers: { Authorization: `Bearer ${user.access_token}` },
            });
            const registered = data.filter(item => item.user === user.id);
            console.log("tài khoản user có id", user.id)
            setRegisteredEvents(registered);
            console.log("Sự kiện đã đăng ký:", registered);
        } catch (error) {
            console.error("Lỗi lấy sự kiện đã đăng ký:", error);
        }
    };
    // lấy ra tất cả danh sách sự kiện
    // const fetchAllEvents = async () => {
    //     try {
    //         const { data } = await axios.get("https://comanbe.onrender.com/api/events/");
    //         setAllEvents(data);
    //     } catch (error) {
    //         console.error("Lỗi lấy sự kiện:", error);
    //     }
    // };
    // gọi hàm lấy ra tất cả sự kiện và sự kiện đã đăng ký khi component được mount
    useEffect(() => {
        fetchAllEvents().then((data) => {
            setAllEvents(data);})
    }, []);
    // gọi hàm lấy ra sự kiện đã đăng ký khi người dùng đăng nhập
    useEffect(() => {
        if (user?.access_token) {
            fetchRegisteredEvents();
        }
    }, [user?.access_token]);


    // ham tim ra su kien khi click

    const handleEventAction = async (eventId, alreadyRegistered) => {
        if (!user?.access_token) {
            alert("Bạn cần đăng nhập.");
            return;
        }

        setLoadingEventId(eventId);


        try {
            if (alreadyRegistered) {

                const event = registeredEvents.find((event) => event.event_id === eventId);
                console.log("Sự kiện bạn muốn hủy", event);
                
                const id = event.id; // Sử dụng eventId đã được truyền vào hàm
                console.log("id của sự kiện hủy:", id);
                axios.get('https://comanbe.onrender.com/api/event-registers', {
                    params: { eventId: id }  // Sử dụng id đã được truyền vào hàm
                })
                    .then(response => {
                        const event = response.data.find(item => item.id === id);  // So sánh với id truyền vào
                        console.log("Sự kiện tìm thấy nênnne:", event);
                    })
                    .catch(error => console.error('Lỗi:', error));

                await axios.delete(`https://comanbe.onrender.com/api/event-registers/${eventId}/`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    }
                });
                console.log("Đã hủy đăng ký sự kiện:", eventId);
                alert("Đã hủy đăng ký sự kiện:", eventId);
            } else {
                await axios.post(
                    "https://comanbe.onrender.com/api/event-registers/",
                    { event_id: eventId },
                    {
                        headers: { Authorization: `Bearer ${user.access_token}` },
                    }
                );
            }
        } catch (error) {
            console.error("Lỗi xử lý sự kiện:", error.response?.data?.detail || error);
        } finally {
            await fetchRegisteredEvents();
            alert(alreadyRegistered ? "Đã hủy đăng ký!" : "Đăng ký thành công!");
            setLoadingEventId(null);
        }
    };
    // Hàm lấy ra từ khóa tìm kiếm
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    // hàm lọc sự kiện theo danh mục
    const handleCategoryChange = (categoryName) => setSelectedCategory(categoryName);
    // hàm reset lại các bộ lọc
    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
    };

    // hàm lọc sự kiện theo từ khóa và danh mục
    const filteredEvents = allEvents.filter((event) => {
        const matchesSearch =
            searchQuery === "" ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" || event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-8xl mx-auto px-4 py-8">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                <h2 className="text-2xl font-bold">Tất cả sự kiện</h2>
            </blockquote>

            <div className="flex justify-between items-center w-full mb-4">
                <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                <CategoryFilter categories={categories} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
            </div>

            {loading ? (
                <div className="text-center py-10">Đang tải sự kiện...</div>
            ) : (
                <>
                    {filteredEvents.length === 0 ? (
                        <NoEvents resetFilters={resetFilters} />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => {
                                const registeredItem = registeredEvents.find(
                                    (item) => item.event_id === event.id
                                );
                                return (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        registeredItem={registeredItem}
                                        handleEventAction={() => handleEventAction(event.id, !!registeredItem)}
                                        loadingEventId={loadingEventId}
                                    />
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeaturedEventsBannerAll;
