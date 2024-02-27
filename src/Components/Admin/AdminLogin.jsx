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
            .then((response)=>{
                if(response.data.status == true && response.data.token){
                    localStorage.setItem("token", response.data.token)
                    navigate("/admin/dashboard")
                }else{
                    navigate("/admin/login")
                }
            })

        }

    });
    return (
        <section>
            <h1 className="text-center mt-10 font-bold text-3xl">Log in</h1>
            <form onSubmit={handleSubmit} className="p-10">
                <input type="text" placeholder='Admin ID' onChange={handleChange} name="adminId" value={values.adminId} className="w-full mb-3 p-3" /> <span>{errors.adminId}</span>
                <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password}  className="w-full p-3 mb-3"/> <span>{errors.password}</span>
                <button type="submit" className="bg-black p-3 text-white rounded w-full mb-3 font-bold">login</button>
                <p className="text-center">Don't have an account? <Link to='/admin/signup' className="text-gray-500 font-bold">Sign up</Link></p>
            </form>
        </section>
    )
}



export default AdminLogin