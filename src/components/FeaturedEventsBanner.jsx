import React, { useState } from 'react';

const FeaturedEventsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const eventsPerPage = 3;

  const eventsData = [
    {
      id: 1,
      title: "Hội thảo Lập trình Web Frontend 2024",
      date: "2024-05-15",
      time: "09:00 - 12:00",
      location: "Hà Nội",
      category: "workshop",
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

  const handleNext = () => {
    if (currentIndex + eventsPerPage < eventsData.length) {
      setCurrentIndex(currentIndex + eventsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - eventsPerPage >= 0) {
      setCurrentIndex(currentIndex - eventsPerPage);
    }
  };

  return (
    <div>
      {/* Phần hiển thị sự kiện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 flex-grow">
        {eventsData.slice(currentIndex, currentIndex + eventsPerPage).map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden flex m-3 h-80">
            <img src={event.image} alt={event.title} className="w-45 h-78 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">
                  <i className="fas fa-calendar-alt"></i> {event.date} - {event.time}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-map-marker-alt"></i> {event.location}
                </p>
                <p className="text-gray-600">
                  <i className="fas fa-tag"></i> Giá: {event.price}
                </p>
                <p className="mt-2">
                  <i className="fas fa-info-circle"></i> {event.description}
                </p>
              </div>
              <div className="mt-auto text-right">
                <a href={`/events/${event.id}`} className="text-blue-500 font-bold">
                  Xem Chi tiết <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phần điều hướng */}
      <div className="flex items-center justify-between mb-4">
        <p
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`bg-blue-300 text-white rounded w-14 h-8 flex items-center justify-center cursor-pointer ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <i className="fas fa-chevron-left"></i>
        </p>

        <p
          onClick={handleNext}
          disabled={currentIndex + eventsPerPage >= eventsData.length}
          className={`bg-blue-300 text-white rounded w-14 h-8 flex items-center justify-center cursor-pointer ${currentIndex + eventsPerPage >= eventsData.length ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <i className="fas fa-chevron-right"></i>
        </p>
      </div>
    </div>
  );
};

export default FeaturedEventsBanner;