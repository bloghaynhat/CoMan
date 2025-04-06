import Header from "./components/Header"
import Footer from "./components/Footer"
import SideMenu from "./components/SideMenu"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import RootPage from "./pages/RootPage"
import TrangChu from "./pages/TrangChu"
import LoTrinh from "./pages/LoTrinh"
import BaiViet from "./pages/BaiViet"
const router = createBrowserRouter([
  {
    path: "/", 
    element: <RootPage/>,  
    children: [
      {
        path: "trangchu", element: <TrangChu/>
      },
      {
        path: "lotrinh", element: <LoTrinh/>
      },
      {
        path: "baiviet", element: <BaiViet/>
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router}></RouterProvider>
  
}

export default App
