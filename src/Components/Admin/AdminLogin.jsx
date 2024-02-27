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
            <main className=" lg:m-20 shadow-md bg-black text-white rounded-lg">
                <h1 className="text-center w-full mt-10 font-bold text-3xl text-white ">Admin Portal</h1>
                <form onSubmit={handleSubmit} className="p-10 ">
                    <input type="text" placeholder='Admin ID' onChange={handleChange} name="adminId" value={values.adminId} className="w-full mb-3 p-3" /> <span>{errors.adminId}</span>

                    <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full p-2 mb-3 rounded-md outline-1 outline-slate-400 text-black" /> <span className="text-red-700">{errors.password}</span>

                    <button type="submit" className="bg-yellow-500 p-3 text-white rounded w-full mb-3 font-bold">login</button>
                    <p className="text-center">Don't have an account? <Link to='/admin/signup' className="text-gray-500 font-bold">Sign up</Link></p>
                </form>

            </main>
        </section>
    )
}



export default AdminLogin