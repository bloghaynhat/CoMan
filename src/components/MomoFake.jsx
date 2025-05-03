import React from 'react';
import axios from 'axios';

const MomoFake = ({ show, onClose, user, course, onSuccess }) => {
    if (!show) return null;

    const handlePayment = () => {
        setTimeout(async () => {
            try {
                await axios.post("https://comanbe.onrender.com/api/enrollments/", {
                    user: user.id,
                    course: course.id,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                    },
                });
                onSuccess();
                onClose();
            } catch (error) {
                alert("Đăng ký thất bại.");
                onClose();
            }
        }, 3000);
    };

    return (
        <div className="fixed inset-0 bg-fuchsia-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold mb-4">Thanh toán Momo</h2>
                <p className="mb-4">Giả lập thanh toán thành công sau 3 giây...</p>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    onClick={handlePayment}
                >
                    Bắt đầu thanh toán
                </button>
            </div>
        </div>
    );
};

export default MomoFake;
