import { Route, Routes } from "react-router-dom"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Forgot from "./Components/Forgot"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot/>}/>
      </Routes>
    </>
  )
}

export default App
