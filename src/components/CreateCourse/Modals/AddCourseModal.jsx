import * as Dialog from "@radix-ui/react-dialog"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { createCourse } from "@/api/admin"
import { UserContext } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BookOpen, DollarSign, FileImage, Info, Save, X } from "lucide-react"

export default function AddCourseModal({ onAdd, children }) {
    const [open, setOpen] = useState(false)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        is_paid: false,
        price: "0.00",
    })

    const [fileName, setFileName] = useState("")

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setForm((prev) => ({
                ...prev,
                image: e.target.files[0],
            }))
            setFileName(e.target.files[0].name)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = user.access_token

        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("description", form.description)
        formData.append("image", form.image)
        formData.append("is_paid", form.is_paid)
        formData.append("price", form.price)

        try {
            const newCourse = await createCourse(formData, token)
            try {
                onAdd(newCourse)
                setOpen(false)
                toast.success("Tạo thành công và đang chuyển tới trang tiếp...!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate(`/admin/courses/${newCourse.id}/setup`)
            } catch (error) {
                console.error("Lỗi sau khi tạo khóa học:", error)
                toast.error("Tạo thành công nhưng không chuyển trang!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        } catch (err) {
            console.error("Lỗi khi gọi createCourse:", err)
            toast.error("Tạo Thất Bại", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-200" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-0 rounded-xl shadow-2xl overflow-hidden transition-all duration-200">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white relative">
                        <Dialog.Title className="text-xl font-bold flex items-center">
                            <BookOpen className="mr-2 h-5 w-5" />
                            Thêm khóa học mới
                        </Dialog.Title>
                        <Dialog.Close className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                            <X className="h-5 w-5" />
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-800 flex items-center">
                                <BookOpen className="mr-2 h-4 w-4 text-purple-600" />
                                Tiêu đề khóa học
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Nhập tiêu đề khóa học"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 placeholder-purple-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-800 flex items-center">
                                <Info className="mr-2 h-4 w-4 text-purple-600" />
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                placeholder="Mô tả chi tiết về khóa học"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full min-h-[100px] px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50 placeholder-purple-300"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-800 flex items-center">
                                <FileImage className="mr-2 h-4 w-4 text-purple-600" />
                                Hình ảnh khóa học
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="course-image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                />
                                <label
                                    htmlFor="course-image"
                                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-purple-300 rounded-md bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors"
                                >
                                    <FileImage className="h-5 w-5 text-purple-500 mr-2" />
                                    <span className="text-purple-700">{fileName ? fileName : "Chọn hình ảnh"}</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className="relative inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_paid"
                                            checked={form.is_paid}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-10 h-5 rounded-full transition-colors ${form.is_paid ? "bg-purple-600" : "bg-gray-300"}`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${form.is_paid ? "translate-x-5" : "translate-x-1"} shadow-md`}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="font-medium text-purple-800 flex items-center">
                                        <DollarSign className={`h-4 w-4 mr-1 ${form.is_paid ? "text-purple-600" : "text-gray-400"}`} />
                                        Khóa học trả phí
                                    </span>
                                </label>
                            </div>

                            {form.is_paid && (
                                <div className="pl-10">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            className="w-full pl-8 px-4 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                                            placeholder="Giá"
                                            min="0"
                                            step="0.01"
                                        />
                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-purple-500" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg transition-all duration-300 hover:shadow-purple-200 hover:shadow-md"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Lưu khóa học
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
