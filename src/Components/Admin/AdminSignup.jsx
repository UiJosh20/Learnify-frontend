import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import {loginSchema} from "../Schema/userSchema"


const AdminSignup = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/admin/register"
    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues:{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) =>{
            axios.post(URL, values)
            .then((response)=>{
                if(response.data.status == 200){
                    navigate("/admin/login")
                }else{
                    navigate("/admin/signup")
                }
            })
           
        }

    });
    return (
        <section className="flex justify-center bg-gradient-to-r from-slate-800 to-slate-900  h-screen lg:p-10">
            <main className="shadow-md bg-black  text-white  lg:rounded-lg px-2 pt-5 w96"> 
            <h1 className="mt-5 font-bold text-center text-3xl w-full lg:block hidden">Create Admin Account</h1>
            <p className="pt-5 font-bold text-4xl text-center lg:hidden mt-10 mb-7 ">Create Admin</p>
            <form onSubmit={handleSubmit} className="lg:p-5 p-5">
                <input type="text" placeholder='First Name' onChange={handleChange} name="firstName" value={values.firstName} className="w-full p-2 mb-3 text-black rounded-md"/> <span>{errors.firstName}</span>
                <input type="text" placeholder='Last Name' onChange={handleChange} name="lastName" value={values.lastName} className="w-full p-2 mb-3 text-black rounded-md"/> <span>{errors.lastName}</span>
                <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full p-2 mb-3 text-black rounded-md"/> <span>{errors.email}</span>
                <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full p-2 mb-3 text-black rounded-md"/> <span>{errors.password}</span>
                <button type="submit" className="w-full p-3 mb-3 font-bold bg-blue-500 text-white rounded-lg">Signup</button>
                <p className="text-center">you already have an account? <Link to='/admin/login' className="text-gray-600 font-bold">Login</Link></p>
            </form>
            </main>
        </section>
    )
}



export default AdminSignup