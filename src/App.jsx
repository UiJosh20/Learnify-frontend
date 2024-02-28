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
import AdminDashboard from "./Components/Admin/AdminDashboard"
import AdminLayout from "./Components/Admin/AdminLayout"
import InputOTP from "./Components/Layout/InputOTP"
import CreateNewPassword from "./Components/Layout/CreateNewPassword"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home/>} />
        </Route>

        
        
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/forgot" element={<Forgot/>}/>
        <Route path="/user/verifyotp" element={<InputOTP/>}/>
        <Route path='/user/createpassword' element={<CreateNewPassword/>}/>
        <Route path="/user" element={<UserLayout/>}>
        <Route path="/user" element={<Navigate to="/user/dashboard" />} />
          <Route path="/user/dashboard" element={<UserDashboard/>} />
        </Route>
        


        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout/>}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Route>
        
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/verifyotp" element={<InputOTP/>}/>
        <Route path='/createpassword' element={<CreateNewPassword/>}/>
        
      </Routes>
    </>
  )
}

export default App
