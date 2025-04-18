import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage/RootPage";
import TrangChu from "./pages/TrangChu";
import LoTrinh from "./pages/LoTrinh";
import BaiViet from "./pages/BaiViet";
import VeChungToi from "./pages/VeChungToi";
import SuKien from "./pages/SuKien";
import Login from "./pages/Loginout/Login";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/Admin/DashboardAdmin";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <Dashboard />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
