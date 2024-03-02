import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tokenMatch, setTokenMatch] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                navigate('/admin/login');
            }

            axios.post('http://localhost:3000/admin/verifyToken', { token })
                .then(response => {

                    if (token === response.data.token) {
                        setLoading(false);
                        setTokenMatch(true);
                    } else {
                        console.log("Token doesn't match");
                        navigate('/admin/login');

                        setLoading(true);
                        setTokenMatch(false);
                    }

                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                    setLoading(false);
                    setTokenMatch(false);
                    navigate('/admin/login');
                });
        };


        const timeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                navigate('/admin/login');
            }
        }, 3000);

        checkToken()
        return () => {
            clearTimeout(timeout);
        };

    }, [navigate, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tokenMatch) {
        navigate('/');
        return null;
    }

    return (
        <>
       <div className="px-10 lg:text-gray-200 flex  justify-center items-center w-full h-screen  text-black">
          <div className='w-full text-center'>
          <p className="text-2xl">Welcome to ADMIN Dashboard</p>
          </div>
         
        </div>
            
        </>
    );
}

export default AdminDashboard