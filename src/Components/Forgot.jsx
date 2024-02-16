

import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { loginSchema } from "./userSchema"


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
        <section>
            <h1 className="text-center mt-10 font-bold text-3xl">Log in</h1>
            <form onSubmit={handleSubmit} className="p-10">
                <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3 bg-slate-100" /> <span>{errors.email}</span>
                <button type="submit" className="bg-orange-300 p-3 text-white rounded w-full mb-3 font-bold">Send OTP</button>
                
            </form>
        </section>
    )
}




export default Forgot