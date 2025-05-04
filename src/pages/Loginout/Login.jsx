import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getUserInfo } from "../../api/auth";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login(username, password); // Gọi API login
      const userInfo = await getUserInfo(data.access);

      loginUser({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        role: data.role,
        id: userInfo.id,
        access_token: data.access,
        refresh_token: data.refresh,
      });

      console.log("Login successful!");
      if (data.role === "admin") {
        console.log("Admin tới");
        navigate("/admin");
      } else {
        console.log("User tới");
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Tắt chế độ loading khi xong
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Gọi handleLogin khi nhấn Enter
    }
  };
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-slate-900 text-center text-3xl font-semibold">
              Đăng nhập
            </h2>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-slate-800 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    for="remember-me"
                    className="ml-3 block text-sm text-slate-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="button"
                  className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white ${
                    isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none`}
                  onClick={handleLogin}
                  disabled={isLoading} // Disable button khi đang loading
                >
                  {isLoading ? (
                    <svg
                      className="w-6 h-6 mx-auto animate-spin"
                      width="30"
                      height="30"
                      viewBox="0 0 44 44"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="6"
                        fill="none"
                        stroke="#fb60b3"
                        strokeWidth="2"
                      >
                        <animate
                          attributeName="r"
                          from="6"
                          to="20"
                          dur="1.5s"
                          begin="0s"
                          repeatCount="indefinite"
                        ></animate>
                        <animate
                          attributeName="opacity"
                          from="1"
                          to="0"
                          dur="1.5s"
                          begin="0s"
                          repeatCount="indefinite"
                        ></animate>
                      </circle>
                      <circle
                        cx="22"
                        cy="22"
                        r="6"
                        fill="none"
                        stroke="#fb60b3"
                        strokeWidth="2"
                      >
                        <animate
                          attributeName="r"
                          from="6"
                          to="20"
                          dur="1.5s"
                          begin="0.5s"
                          repeatCount="indefinite"
                        ></animate>
                        <animate
                          attributeName="opacity"
                          from="1"
                          to="0"
                          dur="1.5s"
                          begin="0.5s"
                          repeatCount="indefinite"
                        ></animate>
                      </circle>
                    </svg>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </div>
              <p className="text-slate-800 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </a>
                <div className="underline font-semibold text-gray-800/50 mt-1">
                  <Link to="/">Quay về trang chủ</Link>
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
