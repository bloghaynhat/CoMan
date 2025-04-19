import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const FeaturedEventsBannerAll = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(1); // Mặc định là "Tất cả"
    const [filteredEvents, setFilteredEvents] = useState([]);

    const eventsData = [
        {
            id: 1,
            title: "Hội thảo Lập trình Web Frontend 2024",
            date: "2024-05-15",
            time: "09:00 - 12:00",
            location: "Hà Nội",
            category: "workshop",
            categoryId: 2, // Hội thảo
            image: "https://www.gosell.vn/blog/wp-content/uploads/2023/08/frontend-01-1.jpg",
            instructor: "Nguyễn Văn A",
            attendees: 45,
            description:
                "Hội thảo chuyên sâu về các công nghệ mới nhất trong lập trình Frontend như React, Next.js và các xu hướng thiết kế UI/UX hiện đại.",
            isFeatured: true,
            price: "Miễn phí",
        },
        {
            id: 2,
            title: "HHHHHHHHHHH",
            date: "2024-05-20",
            time: "19:30 - 21:00",
            location: "Online",
            category: "webinar",
            categoryId: 3, // Webinar
            image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
            instructor: "Trần Thị B",
            attendees: 120,
            description:
                "Tìm hiểu về cách AI và Machine Learning đang thay đổi ngành công nghệ và cách bạn có thể bắt đầu sự nghiệp trong lĩnh vực này.",
            isFeatured: false,
            price: "Miễn phí",
        },
        {
            id: 3,
            title: "Ra mắt khóa học: Full-stack JavaScript",
            date: "2024-05-25",
            time: "14:00 - 16:00",
            location: "Hồ Chí Minh",
            category: "launch",
            categoryId: 4, // Khóa học
            image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
            instructor: "Lê Văn C",
            attendees: 75,
            description:
                "Sự kiện ra mắt khóa học mới về Full-stack JavaScript với Node.js, Express và React. Đặc biệt giảm giá 30% cho người tham dự sự kiện.",
            isFeatured: true,
            price: "100.000đ",
        },
        {
            id: 4,
            title: "Workshop: UX/UI Design cho người mới bắt đầu",
            date: "2024-06-05",
            time: "09:00 - 16:00",
            location: "Đà Nẵng",
            category: "workshop",
            categoryId: 2, // Hội thảo
            image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
            instructor: "Phạm Thị D",
            attendees: 30,
            description:
                "Workshop thực hành về thiết kế UX/UI cho người mới bắt đầu.",
            isFeatured: false,
            price: "200.000đ",
        },
        {
            id: 5,
            title: "Hội thảo: Blockchain và Web3",
            date: "2024-06-10",
            time: "13:30 - 17:00",
            location: "Hà Nội",
            category: "workshop",
            categoryId: 2, // Hội thảo
            image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
            instructor: "Hoàng Văn E",
            attendees: 60,
            description:
                "Khám phá công nghệ Blockchain và Web3, cách chúng đang thay đổi internet và cơ hội nghề nghiệp trong lĩnh vực này.",
            isFeatured: false,
            price: "150.000đ",
        },
        {
            id: 6,
            title: "Webinar: DevOps cho doanh nghiệp",
            date: "2024-06-15",
            time: "19:00 - 20:30",
            location: "Online",
            category: "webinar",
            categoryId: 3, // Webinar
            image: "https://www.smone.vn/wp-content/uploads/2022/03/Social-share-image-1.png",
            instructor: "Trương Văn F",
            attendees: 90,
            description:
                "Tìm hiểu về cách triển khai DevOps trong doanh nghiệp, các công cụ và quy trình giúp tối ưu hóa quá trình phát triển phần mềm.",
            isFeatured: false,
            price: "Miễn phí",
        },
    ]

    const categories = [
        { id: 1, name: "Tất cả" },
        { id: 2, name: "Hội thảo" },
        { id: 3, name: "Webinar" },
        { id: 4, name: "Khóa học" },
        { id: 5, name: "Khác" },
    ]

    // Lọc sự kiện dựa trên từ khóa tìm kiếm và danh mục
    useEffect(() => {
        const filtered = eventsData.filter((event) => {
            // Kiểm tra từ khóa tìm kiếm (trong tiêu đề, mô tả, địa điểm)
            const matchesSearch =
                searchQuery === "" ||
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase());

            // Kiểm tra danh mục
            const matchesCategory =
                selectedCategory === 1 || // Tất cả
                event.categoryId === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        setFilteredEvents(filtered);
    }, [searchQuery, selectedCategory]);

    // Xử lý khi thay đổi từ khóa tìm kiếm
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Xử lý khi chọn danh mục
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Format date
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
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === category.id
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
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                            <div className="relative">
                                <img
                                    src={event.image || "/placeholder.svg"}
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
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                                    Đăng ký ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeaturedEventsBannerAll;
