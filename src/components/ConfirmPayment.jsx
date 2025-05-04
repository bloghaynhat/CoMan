import React from 'react';
import axios from 'axios';

const ConfirmPayment = ({ show, onClose, user, course, onSuccess }) => {
    if (!show) return null;
    const handleConfirm = async () => {
        try {
            const res = await axios.post(
                "https://comanbe.onrender.com/api/enrollments/",
                {
                    course_id: course.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    },
                }
            );
            console.log("Enrollment created:", res.data);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Lỗi đăng ký:", error.response?.data || error.message);
            alert("Đăng ký thất bại.");
            onClose();
        }
    };


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 p-6 rounded-lg shadow-lg text-center max-w-sm w-full border border-white">
                <h2 className="text-3xl font-semibold text-white mb-4">Xác nhận thanh toán ⚠️</h2>
                <p className="mb-4 text-xl text-white">Bạn có chắc muốn đăng ký khóa học này?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Hủy 😭
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Đăng Ký 😍
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPayment;
