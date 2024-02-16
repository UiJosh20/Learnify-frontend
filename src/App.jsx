import { Route, Routes } from "react-router-dom"
import UserSignup from "./Components/UserSignup"
import Forgot from "./Components/Forgot"
import UserLogin from "./Components/UserLogin"
import AdminSignup from "./Components/AdminSignup"
import AdminLogin from "./Components/AdminLogin"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/forgot" element={<Forgot/>}/>
      </Routes>
    </>
  )
}

export default App
