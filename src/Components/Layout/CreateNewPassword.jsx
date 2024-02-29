import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createNewPassword } from '../Schema/createNewPasswordSchema';
import axios from 'axios';

const CreateNewPassword = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:3000/user/createnewpassword";
    const [buttonText, setButtonText] = useState("Create new password");

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: createNewPassword,
        onSubmit: (values) => {
            setButtonText("changing old password...");
            axios.post(URL, values)
            .then((response)=>{
                if (response.data.status == true){
                    setButtonText("Changed");
                    setTimeout(() => {
                        navigate("/user/login");
                    }, 3000); 
                }
               
            })
            .finally(() => {
                
                setTimeout(() => {
                    setButtonText("Create new password");
                }, 3000);
            });
        }
    });
    
    return (
        <>
        <section className="flex justify-center items-center lg:p-48 bg-slate-900 p-5 h-screen">
            <form onSubmit={handleSubmit} className=" w-96">
                <input type="email" placeholder='Enter email address' onChange={handleChange} name="email" value={values.email} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> <span className="text-red-500">{errors.email}</span>
                <input type="text" placeholder='Enter a new password' onChange={handleChange} name="password" value={values.password} className="w-full mb-3 p-3 bg-slate-100 rounded-md" /> <span className="text-red-500">{errors.password}</span>
                <button type="submit" className="bg-blue-500 p-3 text-white rounded w-full mb-3 font-bold" disabled={buttonText === "Changing old password..."}>{buttonText}</button>
            </form>
        </section>
        </>
    );
}

export default CreateNewPassword