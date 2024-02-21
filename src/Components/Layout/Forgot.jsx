

import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { loginSchema } from "../Schema/userSchema"


const Forgot = () => {
    const navigate = useNavigate()
    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            email: "",
        },
        loginSchema: loginSchema,
        onSubmit: (values) => {
            console.log(values);
            axios.post(URL, values)

        }

    });
    return (
        <>
        <section className="flex justify-center items-center lg:p-48 bg-slate-900 p-5 h-screen">
            <form onSubmit={handleSubmit} className=" w-96">
                {/* <h1 className="mb-5">Forget password</h1> */}
                <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> <span>{errors.email}</span>
                <button type="submit" className="bg-blue-500 p-3 text-white rounded w-full mb-3 font-bold">Send OTP</button>
                
            </form>
        </section>
        </>
    )
}




export default Forgot