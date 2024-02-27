import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Schema/userSchema";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const UserSignup = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:3000/user/register";

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      axios.post(URL, values)
        .then((response) => {
          console.log(response.data);
          if (response.data.status == 200){
                navigate("/user/login");
          }else{
            navigate("/user/signup")
          }
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          // Handle registration failure (e.g., display error message)
        });
    },
  });

  return (
    <section className="flex justify-center bg-gradient-to-r from-slate-600 to-slate-900 h-screen lg:p-10 w-full">
      <main className="shadow-md bg-black  text-white  lg:rounded-lg px-2 py-10">
      <h1 className="lg:pt-5 font-bold lg:text-3xl text-center lg:block hidden w-full text-blue-300">Create Student Account</h1>
      <p className="pt-5 font-bold text-2xl text-center lg:hidden mt-10 mb-7 text-blue-300">Create Student Account</p>
      <form onSubmit={handleSubmit} className="lg:p-10 p-5">
        <input
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={values.firstName}
          className="w-full p-3 mb-3 text-black rounded-md"
        />
        <span className="text-red-500 font-bold">{errors.firstName}</span>
        <input
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={values.lastName}
          className="w-full p-3 mb-3 text-black rounded-md"
        />
        <span className="text-red-500 font-bold">{errors.lastName}</span>
        <input
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          name="email"
          value={values.email}
          className="w-full p-3 mb-3 text-black rounded-md"
        />
        <span className="text-red-500 font-bold">{errors.email}</span>
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={values.password}
          className="w-full p-3 mb-3 text-black rounded-md"
        />
        <span className="text-red-500 font-bold">{errors.password}</span>
        <button
          type="submit"
          className="w-full p-3 mb-3 font-bold bg-blue-300 text-white rounded-md"
        >
          Signup
        </button>
        <p className="text-center">
          you already have an account?{" "}
          <Link to="/user/login" className="text-gray-600 font-bold rounded-md" rounded-md outline-slate-300>
            Login
          </Link>
        </p>
      </form>
      </main>
      
    </section>
  );
};

export default UserSignup;
