import axios from 'axios';

const DeleteSectionForm = ({ sectionId, setSections }) => {
    const [loading, setLoading] = useState(false);

    const handleDeleteSection = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://comanbe.onrender.com/api/sections/${sectionId}`);
            setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
        } catch (error) {
            console.error("Failed to delete section:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDeleteSection} disabled={loading}>
                {loading ? 'Đang xóa...' : 'Xóa chương'}
            </button>
        </div>
    );
};
