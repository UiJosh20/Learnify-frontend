import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { userLoginSchema } from "../Schema/loginUser"
import { useState } from "react"

const UserLogin = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/user/login"
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            matricNumber: "",
            password: "",
        },
        validationSchema: userLoginSchema,
        onSubmit: (values) => {
            axios.post(URL, values)
                .then((result) => {
                    if (result.data.status == true && result.data.token) {
                        localStorage.setItem("token", result.data.token)
                        navigate("/user/dashboard")
                    } else {
                        navigate("/user/login")
                    }
                })
        }
    });

    return (
        <section className="flex justify-center bg-gradient-to-r from-slate-800 to-slate-900 h-screen" >
            <main className=" lg:m-20 shadow-md bg-black  text-white lg:rounded-lg px-2 py-7 w96">
                <h1 className="text-center w-full font-bold text-xl text-white-300 lg:block hidden py-5">Student Portal</h1>
                <h1 className="text-center w-full mt-20 mb-10 font-bold text-2xl text-white lg:hidden ">Student Portal</h1>
                <form onSubmit={handleSubmit} className="lg:p-5 p-5">
                    <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type="text" placeholder='Matric Number' onChange={handleChange} name="matricNumber" value={values.matricNumber} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black">
                            person
                        </span>
                    </div>
                        <span className="text-red-700">{errors.matricNumber}</span>



                    <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full outline-none   text-black" />
                        <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                        <span className="text-red-700">{errors.password}</span>



                    <button type="submit" className="p-3 text-white rounded w-full mb-3 font-bold bg-blue-500">login</button>

                    
                    <p className="text-center">Don't have an account? <Link to='/user/signup' className="text-gray-500 font-bold">Sign up</Link></p>
                    
                    <div className="w-full flex justify-center lg:py-10 py-5 text-yellow-300 font-bold">
                        <Link to='/user/forgot'>forget password?</Link>
                    </div>
                </form>
            </main>
        </section>
    )
}

export default UserLogin
