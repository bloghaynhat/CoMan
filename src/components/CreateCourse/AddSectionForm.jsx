import { useState } from 'react';
import axios from 'axios';

const AddSectionForm = ({ courseId, setSections }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddSection = async () => {
        if (!title) return;
        setLoading(true);
        try {
            const response = await axios.post(`https://comanbe.onrender.com/api/sections/`, {
                title,
                course: courseId,
            });
            const newSection = response.data;
            setSections((prevSections) => [...prevSections, newSection]);
            setTitle('');
        } catch (error) {
            console.error("Failed to add section:", error);
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
                placeholder="Nhập tên chương"
            />
            <button onClick={handleAddSection} disabled={loading}>
                {loading ? 'Đang thêm...' : 'Thêm chương'}
            </button>
        </div>
    );
};
