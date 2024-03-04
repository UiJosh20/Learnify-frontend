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
            <section className="px-10 lg:text-gray-200 w-full h-screen  text-black">
                <main className='w-full text-center lg:py-10 lg:px-5 mt-14 flex justify-between space-x-20'>
                    <div className="rounded-md p-4 w-full bg-slate-900">
                        
                    </div>
                    <div className="rounded-md p-4 w-full bg-slate-900">department</div>
                    <div className="rounded-md p-4 w-full bg-slate-900">Level</div>
                </main>

            </section>

        </>
    );
}

export default AdminDashboard