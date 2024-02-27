import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { userLoginSchema} from "../Schema/loginUser"


const UserLogin = () => {
    const navigate = useNavigate()
    const URL = "http://localhost:3000/user/login"


    const { handleChange, handleSubmit, values, errors } = useFormik({
        initialValues: {
            matricNumber: "",
            password: "",
        },
        validationSchema: userLoginSchema, 
        onSubmit: (values) => {
            console.log(values);
            axios.post(URL, values)
            .then((result)=>{
                if(result.data.status == true && result.data.token){
                    localStorage.setItem("token", result.data.token)
                    navigate("/user/dashboard")
                }else{
                    navigate("/user/login")
                }
            })

        }

    });
    return (
        <section className="flex justify-center bg-gradient-to-r from-slate-600 to-slate-900 h-screen" >
            <main className=" lg:m-20 shadow-md bg-black  text-white lg:rounded-lg px-2 py-10">
            <h1 className="text-center w-full mt-10 font-bold text-3xl text-blue-300 lg:block hidden">Student Portal</h1>
            <h1 className="text-center w-full mt-20 mb-10 font-bold text-3xl text-yellow-500 lg:hidden ">Student Portal</h1>
            <form onSubmit={handleSubmit} className="lg:p-10 p-5">
            <input type="text" placeholder='Matric Number' onChange={handleChange} name="matricNumber" value={values.matricNumber} className="w-full mb-3 p-2 rounded-md outline-1 outline-slate-400 text-black" /> <span className="text-red-700">{errors.matricNumber}</span>
                <input type="password" placeholder='Password' onChange={handleChange} name="password" value={values.password}  className="w-full p-2 mb-3 rounded-md outline-1 outline-slate-400 text-black"/> <span className="text-red-700">{errors.password}</span>
                
                <button type="submit" className="bg-yellow-500 p-3 text-white rounded w-full mb-3 font-bold bg-blue-300">login</button>
                <p className="text-center">Don't have an account? <Link to='/user/signup' className="text-gray-500 font-bold">Sign up</Link></p>
            </form>
            
            </main>
        </section>
    )
}



export default UserLogin