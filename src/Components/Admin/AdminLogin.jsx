import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { adminLoginSchema } from "../Schema/loginAdmin"


const AdminLogin = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/admin/login"

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            adminId: "",
            password: "",
        },
        validationSchema: adminLoginSchema,
        onSubmit: (values) => {
            axios.post(URL, values)
                .then((response) => {
                    if (response.data.status == true && response.data.token) {
                        localStorage.setItem("token", response.data.token)
                        navigate("/admin/dashboard")
                    } else {
                        navigate("/admin/login")
                    }
                })

        }

    });
    return (
        <section className="flex justify-center bg-gradient-to-r from-yellow-600 to-yellow-300 h-screen" >
            <main className="lg:m-20 shadow-md bg-black  text-white  lg:rounded-lg px-2 py-10 w-full">
                <h1 className="text-center w-full lg:mt-7 mt-20 lg:mb-1 mb-10 font-bold text-3xl text-white ">Admin Login</h1>
                <form onSubmit={handleSubmit} className="lg:p-10 p-5">
                    <input type="text" placeholder='Admin ID' onChange={handleChange} name="adminId" value={values.adminId} className="w-full mb-3 p-2 rounded-md text-black" /> <span className="text-red-700">{errors.adminId}</span>

                    <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full p-2 mb-3 rounded-md text-black" /> <span className="text-red-700">{errors.password}</span>

                    <button type="submit" className="lg:bg-yellow-500 p-3 text-white rounded w-full mb-3 font-bold bg-yellow-400">login</button>
                    <p className="text-center">Don't have an account? <Link to='/admin/signup' className="text-gray-500 font-bold">Sign up</Link></p>
                </form>

            </main>
        </section>
    )
}



export default AdminLogin