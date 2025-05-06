import { useEffect, useRef, useState, useCallback } from "react";

export default function Banner({
  title = "Học mọi lúc, mọi nơi cùng Coman",
  subtitle = "Khám phá hàng trăm khóa học từ cơ bản đến nâng cao, giúp bạn chinh phục mọi mục tiêu học tập.",
}) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const prevDimensionsRef = useRef({ width: 0, height: 0 });
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(0);

  // ✅ Cập nhật kích thước canvas khi thay đổi màn hình
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { clientWidth: width, clientHeight: height } =
          canvas.parentElement || {};
        canvas.width = width;
        canvas.height = height;

        const prev = dimensions;
        setDimensions({ width, height });

        // Nếu đã có hạt, co giãn vị trí theo tỷ lệ mà không tạo hạt mới
        if (particlesRef.current.length > 0 && prev.width && prev.height) {
          const scaleX = width / prev.width;
          const scaleY = height / prev.height;
          // Chỉ thay đổi vị trí mà không thay đổi trạng thái các hạt
          particlesRef.current = particlesRef.current.map((p) => ({
            ...p,
            x: p.x * scaleX,
            y: p.y * scaleY,
            speedX: p.speedX * scaleX, // Tỷ lệ lại tốc độ X
            speedY: p.speedY * scaleY, // Tỷ lệ lại tốc độ Y
          }));
        } else {
          // Nếu không có hạt (lần đầu tiên), khởi tạo hạt mới
          initParticles(width, height);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Chỉ tái tạo lại khi chiều rộng hoặc chiều cao thay đổi

  // ✅ Khởi tạo hạt với số lượng tối ưu
  const initParticles = useCallback((width, height) => {
    const particleCount = Math.min(100, Math.floor((width * height) / 500)); // Giới hạn tối đa 100 hạt
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() * 2 - 1) * 1.5, // Điều chỉnh tốc độ
      speedY: (Math.random() * 2 - 1) * 1.5,
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
    }));
  }, []);

  // ✅ Xử lý di chuyển chuột
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ Hàm vẽ & cập nhật hạt
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particlesRef.current.forEach((p, i) => {
        // Cập nhật vị trí
        p.x += p.speedX;
        p.y += p.speedY;

        // Bật lại nếu chạm biên
        if (p.x <= 0 || p.x >= dimensions.width) {
          p.speedX *= -1;
          p.x = Math.max(0, Math.min(p.x, dimensions.width));
        }
        if (p.y <= 0 || p.y >= dimensions.height) {
          p.speedY *= -1;
          p.y = Math.max(0, Math.min(p.y, dimensions.height));
        }

        // Tính khoảng cách đến chuột
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        // Nếu gần thì đẩy ra
        if (distance < 60) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 400; // Tăng lực
          const fx = Math.cos(angle) * force;
          const fy = Math.sin(angle) * force;

          p.speedX -= fx;
          p.speedY -= fy;
        }

        // Giới hạn tốc độ tối đa
        const maxSpeed = 1.8;
        const speed = Math.sqrt(p.speedX ** 2 + p.speedY ** 2);
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }

        // Ma sát nhẹ nhưng luôn có dao động nhẹ
        p.speedX *= 0.995; // từ 0.98 → 0.995
        p.speedY *= 0.995;

        // Thêm dao động ngẫu nhiên nhỏ để tránh đứng yên
        p.speedX += (Math.random() - 0.5) * 0.05;
        p.speedY += (Math.random() - 0.5) * 0.05;

        // Vẽ hạt
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Vẽ kết nối
        particlesRef.current.forEach((other, j) => {
          if (i !== j) {
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const dist = Math.sqrt(dx ** 2 + dy ** 2);
            if (dist < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${
                0.4 * (1 - dist / 150)
              })`;
              ctx.lineWidth = 1;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions]);

  return (
    <div className="relative w-11/12 h-[300px] m-auto mt-6 rounded-lg overflow-hidden">
      {/* Nền gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-600 to-cyan-500" />

      {/* Canvas cho hiệu ứng hạt */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nội dung banner */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-sm md:text-xl text-white/90 max-w mb-8 drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
