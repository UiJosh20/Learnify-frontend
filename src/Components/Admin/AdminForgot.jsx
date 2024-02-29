import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotSchema } from '../Schema/forgotSchema'
import axios from 'axios'

const AdminForgot = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/admin/forgot"
    const [buttonText, setButtonText] = useState("Send OTP")

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotSchema,
        onSubmit: (values) => {
            setButtonText("Sending OTP...")
            axios.post(URL, values)
            .then((response)=>{
                if(response.data.otp){
                    setTimeout(() => {
                        navigate("/admin/verifyotp")
                    }, 3000);
                } else {
                    setButtonText("Send OTP")
                    navigate("/admin/forgot")
                }
            })
            .finally(() => {
                
                setTimeout(() => {
                    setButtonText("Send OTP")
                }, 3000);
            })
        }
    });

    return (
        <>
        <section className="flex justify-center items-center lg:p-48 bg-yellow-600 p-5 h-screen">
            <form onSubmit={handleSubmit} className=" w-96">
                <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> <span className="text-red-500">{errors.email}</span>
                <button type="submit" className="bg-yellow-400 p-3 text-white rounded w-full mb-3 font-bold" disabled={buttonText === "Sending OTP..."}>{buttonText}</button>
            </form>
        </section>
        </>
    )
}

export default AdminForgot