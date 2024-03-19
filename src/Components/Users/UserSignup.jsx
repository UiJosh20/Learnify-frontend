import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Schema/userSchema";
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux'; 
import { setName } from "../../Redux/MatricSlice";



const UserSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL = "http://localhost:3000/user/register";
  const [showPassword, setShowPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false); 
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setSigningUp(true); 
      axios.post(URL, values)
        .then((response) => {
          if (response.data.status == 200) {
            setTimeout(() => {
              navigate("/user/login");
            }, 3000);
          } else {
            navigate("/user/signup");
          }
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        })
        .finally(() => {
          setTimeout(() => {
            setSigningUp(false);
          }, 3000);
        });
    },
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const fullName = { ...values, [name]: value };
    dispatch(setName(fullName));
    handleChange(e); 
};



  return (
    <section className="flex justify-center bg-gradient-to-r from-slate-800 to-slate-900  h-screen lg:p-10 w-full">
      <main className=" shadow-md bg-black  text-white lg:rounded-lg w96 lg:py-3">
        <h1 className="lg:py-5 font-bold lg:text-3xl text-center lg:block hidden w-full text-white">Create Student Account</h1>
        <p className="pt-5 font-bold text-2xl text-center lg:hidden mt-10 mb-7 text-white">Create Student Account</p>
        <div className="px-5">
                   {(errors.firstName || errors.lastName ||errors.email || errors.password) && (
                        <Alert sx={{width: "100%"}} severity="warning">
                             {errors.firstName || errors.lastName ||errors.email || errors.password}
                        </Alert>
                    )}
                    </div>
        <form onSubmit={handleSubmit} className="lg:p-5 p-5">
          <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
            <input
              type="text"
              placeholder="First Name"
              onChange={handleNameChange}
              name="firstName"
              value={values.firstName}
              className="w-full outline-none text-black"
            />
            <span class="material-symbols-outlined text-black">
              info
            </span>
          </div>
        
          <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
            <input
              type="text"
              placeholder="Last Name"
              onChange={handleNameChange}
              name="lastName"
              value={values.lastName}
              className="w-full outline-none text-black"
            />
            <span class="material-symbols-outlined text-black">
              info
            </span>
          </div>
    
          <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
            <input
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              name="email"
              value={values.email}
              className="w-full  text-black outline-none"
            />
            <span class="material-symbols-outlined text-black">
              mail
            </span>
          </div>
          <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={values.password}
              className="w-full outline-none text-black"
            />
            <span className="material-symbols-outlined text-black cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-3 font-bold bg-blue-500 text-white rounded-md"
            disabled={signingUp} 
          >
            {signingUp ? "Signing up..." : "Signup"} 
          </button>
          <p className="text-center">
            you already have an account?{" "}
            <Link to="/user/login" className="text-gray-600 font-bold rounded-md">
              Login
            </Link>
          </p>
        </form>
      </main>

    </section>
  );
};

export default UserSignup;
