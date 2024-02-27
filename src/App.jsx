import { Navigate, Route, Routes } from "react-router-dom"
import UserSignup from "./Components/Users/UserSignup"
import Forgot from "./Components/Layout/Forgot"
import UserLogin from "./Components/Users/UserLogin"
import AdminSignup from "./Components/Admin/AdminSignup"
import AdminLogin from "./Components/Admin/AdminLogin"
import Home from "./Components/Layout/Home"
import Layout from "./Components/Layout/Layout"
import NotFound from "./Components/Layout/NotFound"
import UserDashboard from "./Components/Users/UserDashboard"
import UserLayout from "./Components/Users/UserLayout"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home/>} />
          
        <Route path="*" element={<NotFound/>}/>

        </Route>

        <Route path="/user" element={<UserLayout/>}>
        <Route path="/user" element={<Navigate to="/user/dashboard" />} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
        </Route>
        
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/forgot" element={<Forgot/>}/>
        
      </Routes>
    </>
  )
}

export default App
