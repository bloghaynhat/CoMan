import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Baby,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-[#00c9ff] text-white">
      {/* Main Footer Content - Giảm padding */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description - Giảm space-y và nội dung */}
          <div className="space-y-3">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight inline-block relative group"
            >
              Coman
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <p className="text-white/80 text-sm max-w-xs">
              Nền tảng học tập trực tuyến hàng đầu Việt Nam, cung cấp các khóa
              học chất lượng cao.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="hover:text-white/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="hover:text-white/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="hover:text-white/80 transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links - Giảm space-y và số lượng links */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Liên kết nhanh</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Trang chủ
              </Link>
              <Link
                to="/roadmaps"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Lộ trình
              </Link>
              <Link
                to="/events"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Sự kiện
              </Link>
              <Link
                to="/about"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Về chúng tôi
              </Link>
              <Link
                to="/faq"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Contact Information - Giảm space-y và làm gọn thông tin */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span className="text-white/80">
                  12 Nguyễn Văn Bảo, P.1, Q. Gò Vấp, TP.HCM
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="shrink-0" />
                <span className="text-white/80">(028) 38940390</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="shrink-0" />
                <span className="text-white/80">info@coman.edu.vn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter - Giảm space-y và làm gọn form */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Website xây dựng bởi</h3>
            <div className="flex flex-col space-y-2 ">
              <div className="flex items-center space-x-2">
                <Baby size={18} className="shrink-0"></Baby>{" "}
                <span className="text-white/90">Lê Phạm Minh Đức</span>
              </div>
              <div className="flex items-center space-x-2">
                <Baby size={18} className="shrink-0"></Baby>{" "}
                <span className="text-white/90">Huỳnh Trọng Nhân</span>
              </div>
              <div className="flex items-center space-x-2">
                <Baby size={18} className="shrink-0"></Baby>{" "}
                <span className="text-white/90">Lê Ngọc Dung</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Giảm padding */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-xs">
              © {currentYear} Coman. Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                to="/privacy"
                className="text-white/70 hover:text-white text-xs transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="text-white/70 hover:text-white text-xs transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                to="/cookies"
                className="text-white/70 hover:text-white text-xs transition-colors"
              >
                Chính sách cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
