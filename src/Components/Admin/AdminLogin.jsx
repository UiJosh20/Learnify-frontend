import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { loginSchema } from "../Schema/userSchema"


const AdminLogin = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/admin/login"

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        loginSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);
            axios.post(URL, values)

        }

    });
    return (
        <section>
            <h1 className="text-center mt-10 font-bold text-3xl">Log in</h1>
            <form onSubmit={handleSubmit} className="p-10">
                <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3" /> <span>{errors.email}</span>
                <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password}  className="w-full p-3 mb-3"/> <span>{errors.password}</span>
                <div className="flex justify-between mb-3">
                    <div>
                        <input type="checkbox" name="rememberMe" id="" /> <label>Remember me</label>

                    </div>
                    <Link to='/forgot'>Forgot password</Link>
                </div>
                <button type="submit" className="bg-black p-3 text-white rounded w-full mb-3 font-bold">login</button>
                <p className="text-center">Don't have an account? <Link to='/signup' className="text-gray-500 font-bold">Sign up</Link></p>
            </form>
        </section>
    )
}



export default AdminLogin