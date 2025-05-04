import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { createCourse } from "@/api/admin";
import { UserContext } from "../../context/UserContext";

export default function AddCourseModal({ onAdd, children }) {
    const [open, setOpen] = useState(false);
    const { user } = useContext(UserContext);
    console.log(user.access_token);

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        is_paid: false,
        price: "0.00",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user.access_token;

        try {
            const newCourse = await createCourse(form, token);
            onAdd(newCourse);
            setOpen(false);
        } catch (err) {
            alert("Thêm khóa học thất bại");
        }
    };


    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl space-y-4">
                    <Dialog.Title className="text-lg font-bold">Thêm khóa học</Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Tiêu đề"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Mô tả"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="url"
                            name="image"
                            placeholder="Link ảnh"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_paid"
                                    checked={form.is_paid}
                                    onChange={handleChange}
                                />
                                <span>Trả phí</span>
                            </label>
                            {form.is_paid && (
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-1/2"
                                    placeholder="Giá"
                                />
                            )}
                        </div>
                        <Button type="submit">Lưu khóa học</Button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
