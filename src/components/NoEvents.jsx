const NoEvents = ({ resetFilters }) => {
    return (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500 text-lg">Không tìm thấy sự kiện nào phù hợp với tìm kiếm của bạn.</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={resetFilters}
            >
                Xóa bộ lọc
            </button>
        </div>
    );
};

export default NoEvents;