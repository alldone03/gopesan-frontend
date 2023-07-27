import { createBrowserRouter } from "react-router-dom";
import Login from './pages/login';
import Register from "./pages/register";
import MyRedirect from "./pages/myredirect";
import AddToko from "./pages/data/toko";
import Setting from "./pages/setting";
import Menu from "./pages/data/menu";
import Dashboard from "./pages/dashboard/dashboard";
import Varian from "./pages/data/varian/varian";
import Harga from "./pages/data/harga/harga";


const router = createBrowserRouter(
    [
        { path: '/', element: <MyRedirect /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/toko', element: <AddToko /> },
        { path: '/menu', element: <Menu /> },
        { path: '/settings', element: <Setting /> },
        { path: '/varian', element: <Varian /> },
        { path: '/harga', element: <Harga /> },
    ]
);

export default router;