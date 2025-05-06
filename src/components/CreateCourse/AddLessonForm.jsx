import { useState } from 'react';
import axios from 'axios';

const AddLessonForm = ({ sectionId, setLessons }) => {
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddLesson = async () => {
        if (!title || !videoUrl || !articleContent) return;
        setLoading(true);
        try {
            const response = await axios.post(`https://comanbe.onrender.com/api/lessons/`, {
                title,
                video_url: videoUrl,
                article_content: articleContent,
                section: sectionId,
            });
            const newLesson = response.data;
            setLessons((prevLessons) => [...prevLessons, newLesson]);
            setTitle('');
            setVideoUrl('');
            setArticleContent('');
        } catch (error) {
            console.error("Failed to add lesson:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên bài học"
            />
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Nhập URL video"
            />
            <textarea
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Nhập nội dung bài viết"
            />
            <button onClick={handleAddLesson} disabled={loading}>
                {loading ? 'Đang thêm...' : 'Thêm bài học'}
            </button>
        </div>
    );
};
