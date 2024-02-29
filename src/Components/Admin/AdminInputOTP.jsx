import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifySchema } from '../Schema/verifySchema';
import axios from 'axios';

const AdminInputOTP = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:3000/admin/verifyotp";
    const [buttonText, setButtonText] = useState("Verify OTP");

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: verifySchema,
        onSubmit: (values) => {
            setButtonText("Verifying...");
            axios.post(URL, values)
            .then((response)=>{
                if (response.data.status == true){
                    setButtonText("Verified");
                    setTimeout(() => {
                        navigate("/admin/createpassword");
                    }, 3000); 
                }
               
            })
            .finally(() => {
                
                setTimeout(() => {
                    setButtonText("Verify OTP");
                }, 3000);
            });
        }
    });
    
    return (
        <>
        <section className="flex justify-center items-center lg:p-48 bg-slate-900 p-5 h-screen">
            <form onSubmit={handleSubmit} className=" w-96">
                <input type="number" placeholder='Enter OTP' onChange={handleChange} name="otp" value={values.otp} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> <span className="text-red-500">{errors.otp}</span>
                <button type="submit" className="bg-blue-500 p-3 text-white rounded w-full mb-3 font-bold" disabled={buttonText === "Verifying..."}>{buttonText}</button>
            </form>
        </section>
        </>
    );
}

export default AdminInputOTP