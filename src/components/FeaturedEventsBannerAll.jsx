import React, { useState, useEffect, useContext, useMemo } from 'react';
import EventCard from './EventCard.jsx';
import SearchBar from './SearchBar.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import NoEvents from './NoEvents.jsx';
import axios from 'axios';
import { UserContext } from "../context/UserContext.jsx";

const FeaturedEventsBannerAll = () => {
    const { user } = useContext(UserContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [allEvents, setAllEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const userSlug = useMemo(() => {
        if (user?.first_name && user?.last_name) {
            return (user.first_name + user.last_name)
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
        }
        return '';
    }, [user]);

    const categories = [
        { id: 1, name: "All" },
        { id: 2, name: "workshop" },
        { id: 3, name: "webinar" },
        { id: 4, name: "conference" },
    ];

    const fetchRegisteredEvents = async () => {
        if (!user?.access_token) return;
        setLoading(true);
        try {
            const { data } = await axios.get("https://comanbe.onrender.com/api/event-registers/", {
                headers: { Authorization: `Bearer ${user.access_token}` },
            });
            const registered = data.filter(item => item.user === userSlug);
            setRegisteredEvents(registered);
        } catch (error) {
            console.error("Lỗi lấy sự kiện đã đăng ký:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllEvents = async () => {
        try {
            const { data } = await axios.get("https://comanbe.onrender.com/api/events/");
            setAllEvents(data);
        } catch (error) {
            console.error("Lỗi lấy sự kiện:", error);
        }
    };

    useEffect(() => {
        fetchAllEvents();
    }, []);

    useEffect(() => {
        if (user?.access_token) {
            fetchRegisteredEvents();
        }
    }, [user?.access_token]);

    const handleEventAction = async (eventId, alreadyRegistered) => {
        if (!user?.access_token) {
            alert("Bạn cần đăng nhập.");
            return;
        }

        try {
            if (alreadyRegistered) {
                await axios.delete(
                    `https://comanbe.onrender.com/api/event-registers/${eventId}/`,
                    {
                        headers: { Authorization: `Bearer ${user.access_token}` },
                    }
                );
                await fetchRegisteredEvents();
                alert("Hủy đăng ký sự kiện thành công!");
            } else {
                await axios.post(
                    "https://comanbe.onrender.com/api/event-registers/",
                    { event_id: eventId },
                    {
                        headers: { Authorization: `Bearer ${user.access_token}` },
                    }
                );
                await fetchRegisteredEvents();
                alert("Đăng ký sự kiện thành công!");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.detail;
            // console.error("Lỗi xử lý sự kiện:", errorMessage || error);

            if (errorMessage === "Bạn đã đăng ký sự kiện này rồi.") {
                await fetchRegisteredEvents();
                setTimeout(() => {
                    // alert("Bạn đã đăng ký sự kiện này rồi.");
                }, 100); //  Delay alert 1 nhịp cho React cập nhật UI
            } else if (errorMessage === "Có lỗi xảy ra. Vui lòng thử lại sau.") {
                // alert(errorMessage || "Có lỗi xảy ra. Vui lòng thử lại sau.");
                await fetchRegisteredEvents();
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
    };

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

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div className="max-w-8xl mx-auto px-4 py-8">
            <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-6">
                <h2 className="text-2xl font-bold">Sự kiện</h2>
            </blockquote>

            <div className="flex mb-3">
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
                                    (item) => item.event === event.title
                                );
                                return (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        registeredItem={registeredItem}
                                        handleEventAction={handleEventAction}
                                        categories={categories}
                                        loading={loading}
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
