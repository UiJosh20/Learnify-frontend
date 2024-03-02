import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { adminLoginSchema } from "../Schema/loginAdmin";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const AdminLogin = () => {
    const navigate = useNavigate();
    const URL = "http://localhost:3000/admin/login";
    const [showPassword, setShowPassword] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false); 
    const [loginSuccess, setLoginSuccess] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            adminId: "",
            password: "",
        },
        validationSchema: adminLoginSchema,
        onSubmit: (values) => {
            setLoggingIn(true); 
            axios.post(URL, values)
                .then((response) => {
                    if (response.data.status == true && response.data.token) {
                        localStorage.setItem("token", response.data.token);
                        setLoginSuccess(true);
                        setTimeout(() => {
                            navigate("/admin/dashboard");
                          }, 3000);
                    } else {
                        navigate("/admin/login");
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoggingIn(false);
                    }, 3000);
                });
        }
    });

    return (
        <section className="flex justify-center bg-gradient-to-r from-slate-900 to-slate-800 h-screen">
            <main className="lg:m-20 shadow-md bg-black  text-white  lg:rounded-lg px-4 py-2 w96">
                <Link to='/' class="material-symbols-outlined text-yellow-500 text-4xl cursor-pointer">
                    home
                </Link>
                <h1 className="text-center w-full lg:mt-1 mt-20 lg:mb-1 mb-5 font-bold text-3xl text-white">Admin Login</h1>
                <div className="px-5">
                    {loginSuccess && (
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Logged in successfully
                        </Alert>
                    )}
                    </div>
                    <div className="px-5">
                   {(errors.adminId || errors.password) && (
                        <Alert sx={{width: "100%"}} severity="warning">
                             {errors.adminId || errors.password}
                        </Alert>
                    )}
                    </div>
                <form onSubmit={handleSubmit} className="lg:p-5 p-5">
                    <div className="border flex items-center bg-white p-2 mb-2 rounded-md outline-1 outline-slate-400">
                        <input type="text" placeholder='Admin ID' onChange={handleChange} name="adminId" value={values.adminId} className="w-full outline-none text-black" />
                        <span className="material-symbols-outlined text-black">
                            person
                        </span>
                    </div>
                 
                    <div className="border flex items-center bg-white p-2 mb-2 rounded-md outline-1 outline-slate-400">
                        <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={handleChange} name="password" value={values.password} className="w-full outline-none   text-black" />
                        <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                   
                    <button type="submit" className="lg:bg-blue-500 p-3 text-white rounded w-full mb-3 font-bold bg-blue-500">
                        {loggingIn ? "Logging in..." : "Login"} 
                    </button>
                    <p className="text-center">Don't have an account? <Link to='/admin/signup' className="text-gray-500 font-bold">Sign up</Link></p>
                    <div className="w-full flex justify-center lg:py-2 py-5 text-yellow-300 font-bold">
                        <Link to='/admin/forgot'>forget password?</Link>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default AdminLogin;
