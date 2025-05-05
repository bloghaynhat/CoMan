import React, { useState, useEffect } from "react";
import { FileImage } from "lucide-react";

export function ImageUploadField({ fileName, onFileChange, previewUrl }) {
    const [preview, setPreview] = useState(previewUrl || "");

    useEffect(() => {
        if (fileName instanceof File) {
            const url = URL.createObjectURL(fileName);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof previewUrl === "string") {
            setPreview(previewUrl);
        }
    }, [fileName, previewUrl]);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-purple-600 flex items-center">
                <FileImage className="mr-2 h-4 w-4 text-purple-400" />
                Hình ảnh khóa học
            </label>
            <div className="relative">
                <input
                    type="file"
                    id="course-image"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                />
                <label
                    htmlFor="course-image"
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-purple-300 rounded-md bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors"
                >
                    <FileImage className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-purple-500">
                        {fileName?.name || "Chọn hình ảnh"}
                    </span>
                </label>
            </div>

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 max-h-60 rounded-md shadow"
                />
            )}
        </div>
    );
}
