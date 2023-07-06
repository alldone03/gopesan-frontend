

import { Route, Routes, } from "react-router-dom";

import Login from './pages/login';
import './index.css';
import Layout from './component/layout';
import Register from "./pages/register";

import { AuthContext, AuthProvider } from "./store/auth-context";
import Dashboard from "./pages/dashboard";

function App() {


  return (
    <>
      <AuthProvider value={AuthContext}>

        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
