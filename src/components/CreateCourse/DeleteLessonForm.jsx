import axios from 'axios';

const DeleteLessonForm = ({ lessonId, setLessons }) => {
    const [loading, setLoading] = useState(false);

    const handleDeleteLesson = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://comanbe.onrender.com/api/lessons/${lessonId}`);
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== lessonId));
        } catch (error) {
            console.error("Failed to delete lesson:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDeleteLesson} disabled={loading}>
                {loading ? 'Đang xóa...' : 'Xóa bài học'}
            </button>
        </div>
    );
};
