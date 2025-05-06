"use client";

import { ArrowLeft, Clock, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoTrinh() {
  // Thêm title cho trang
  useEffect(() => {
    document.title = "Tính năng sắp ra mắt | Coman";
    return () => {
      document.title = "Coman"; // Reset title khi unmount
    };
  }, []);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <Construction className="h-24 w-24 text-black" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute -top-2 -right-2"
            >
              <Clock className="h-8 w-8 text-black" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-black mb-6"
        >
          Tính năng sẽ được cập nhật trong thời gian tới
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-black/80 mb-12 max-w-2xl mx-auto"
        >
          Chúng tôi đang nỗ lực phát triển tính năng mới để mang đến trải nghiệm
          tốt nhất cho bạn. Vui lòng quay lại sau để khám phá những cập nhật hấp
          dẫn.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            <Link to="/">Quay lại trang chủ</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
