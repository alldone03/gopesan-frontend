

import { Navigate, Route, Routes, useNavigate, } from "react-router-dom";

import Login from './pages/login';
import './index.css';
import Layout from './component/layout';
import Register from "./pages/register";

import { AuthContext, AuthProvider } from "./store/auth-context";
import Dashboard from "./pages/dashboard/dashboard";
import MyRedirect from "./pages/myredirect";
import { CookiesProvider } from "react-cookie";
import AddToko from "./pages/data/toko";
import Setting from "./pages/setting";


function App() {


  return (
    <>
      <CookiesProvider>
        <AuthProvider value={AuthContext}>
          <Layout>
            <Routes>
              <Route path="/" element={<MyRedirect />} exact />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/toko" element={<AddToko />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </CookiesProvider>

    </>
  )
}

export default App
