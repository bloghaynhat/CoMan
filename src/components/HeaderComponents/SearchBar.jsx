import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export function SearchBar({ isMobile = false, onClose, className, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch?.(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative group", className)}>
      <Search
        className={cn(
          "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5",
          isMobile
            ? "text-indigo-300"
            : "text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600"
        )}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm khóa học, sự kiện..."
        className={cn(
          "w-full pl-10 py-2 rounded-full",
          isMobile
            ? "pr-10 border border-indigo-400/30 bg-indigo-700/50 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30"
            : "pr-4 border-2 border-transparent bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-200"
        )}
        autoFocus={isMobile}
      />
      {isMobile && onClose && (
        <button
          type="button" // Thêm type="button" để tránh submit form
          onClick={onClose}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-indigo-500"
          aria-label="Đóng tìm kiếm"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
    </form>
  );
}
