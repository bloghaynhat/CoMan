import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage/RootPage";
import TrangChu from "./pages/TrangChu";
import LoTrinh from "./pages/LoTrinh";
import BaiViet from "./pages/BaiViet";
import VeChungToi from "./pages/VeChungToi";
import SuKien from "./pages/SuKien";
import Login from "./pages/Loginout/Login";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Admin/DashboardAdmin";
import KhoaHoc from "./pages/Admin/KhoaHoc";
import NguoiDung from "./pages/Admin/NguoiDung";
import ThongKe from "./pages/Admin/ThongKe";
import SetupCourse from "./components/CreateCourse/SetupCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <TrangChu />,
      },
      {
        path: "roadmaps",
        element: <LoTrinh />,
      },
      {
        path: "baiviet",
        element: <BaiViet />,
      },
      {
        path: "events",
        element: <SuKien />,
      },
      {
        path: "about",
        element: <VeChungToi />,
      },
      {
        path: "course/:id",
        element: <CourseDetail />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <RootPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "courses",
        element: <KhoaHoc />,
      },
      {
        path: "courses/:courseId/setup",
        element: <SetupCourse />,
      },
      {
        path: "users",
        element: <NguoiDung />,
      },
      {
        path: "stats",
        element: <ThongKe />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
