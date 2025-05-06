import React from 'react';

const PreviewPlayer = ({ videoId }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="relative w-full aspect-video">
            <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-300 opacity-50">
                <p className="text-red-600 font-bold">Mua ngay khóa học để xem!</p>
            </div>
        </div>
    );
};

export default PreviewPlayer;
