import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Schema/userSchema";
import { useState } from "react";
import Alert from '@mui/material/Alert';

const AdminSignup = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:3000/admin/register";
    const [showPassword, setShowPassword] = useState(false);
    const [signingUp, setSigningUp] = useState(false); // State to track signup process

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setSigningUp(true);
            axios.post(URL, values)
                .then((response) => {
                    if (response.data.status == 200) {
                        setTimeout(() => {
                            navigate("/admin/login");
                        }, 3000);
                    } else {
                        navigate("/admin/signup");
                    }
                })
                .catch((error) => {
                    console.error("Signup failed:", error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setSigningUp(false);
                    }, 3000);
                });
        }
    });

    return (
        <section className="flex justify-center bg-gradient-to-r from-slate-800 to-slate-900 h-screen lg:p-10 w-full">
            <main className="shadow-md bg-black text-white lg:rounded-lg px-2 pt-5 w96">
                <h1 className="mt-5 font-bold text-center text-3xl w-full lg:block hidden">Create Admin Account</h1>
                <p className="pt-5 font-bold text-4xl text-center lg:hidden mt-10 mb-7">Create Admin</p>
                <div className="px-5">
                   {(errors.firstName || errors.lastName ||errors.email || errors.password) && (
                        <Alert sx={{width: "100%"}} severity="warning">
                             {errors.firstName || errors.lastName ||errors.email || errors.password}
                        </Alert>
                    )}
                    </div>
                <form onSubmit={handleSubmit} className="lg:p-5 p-5">
                    <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type="text" placeholder='First Name' onChange={handleChange} name="firstName" value={values.firstName} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black">info</span>
                    </div>
            
                    <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type="text" placeholder='Last Name' onChange={handleChange} name="lastName" value={values.lastName} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black">info</span>
                    </div>
                                <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type="email" placeholder='Email address' onChange={handleChange} name="email" value={values.email} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black">mail</span>
                    </div>
                             <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                                <button type="submit" className="w-full p-3 mb-3 font-bold bg-blue-500 text-white rounded-md" disabled={signingUp}>
                        {signingUp ? "Signing up..." : "Signup"} 
                    </button>
                    <p className="text-center">you already have an account? <Link to='/admin/login' className="text-gray-600 font-bold">Login</Link></p>
                </form>
            </main>
        </section>
    );
}

export default AdminSignup;
