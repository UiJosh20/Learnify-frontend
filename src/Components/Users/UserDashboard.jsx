
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tokenMatch, setTokenMatch] = useState(false);
    const matricNumber = useSelector(state => state.matric.matricNumber);
    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          navigate('/user/login');
        }
  
        axios.post('http://localhost:3000/user/verifyToken', { token })
          .then(response => {
          
              if (token === response.data.token) {
                setLoading(false);
                setTokenMatch(true);
              } else {
                console.log("Token doesn't match");
            navigate('/user/login');
                setLoading(true);
                setTokenMatch(false);
              }
            
          })
          .catch(error => {
            console.error('Error verifying token:', error);
            setLoading(false);
            setTokenMatch(false);
            navigate('/user/login');
          });
      };
  
  
      const timeout = setTimeout(() => {
        if (loading) {
          setLoading(false);
          navigate('/user/login');

        }
      }, 3000); 
  
      checkToken()
      return () => {
        clearTimeout(timeout);
      };
  
    }, [navigate, loading]);
  
    if (loading) {
      return <>
      <div className="flex justify-center items-center h-screen flex-col">
          <p className="logo1 !text-5xl mb-10 !text-slate-900">Learnify</p>
          <div className="loader1"></div>
        </div>
      </>;
    }
  
    if (!tokenMatch) {
      navigate('/user/login');
      return null;
    }
  
    return (
      <>
       <section className="px-10 lg:text-white w-full h-screen  text-black">
                <main className='w-full text-center lg:py-5 lg:px-2 mt-14 flex justify-between space-x-20'>
                  <div className='w-full'>
                      <p className='text-black mb-2'>Student ID</p>
                    <div className="rounded-md p-4 w-full bg-slate-900">
                    <h4 className='text-2xl font-bold'> {matricNumber}</h4> 
                    </div>
                  </div>

                  <div className='w-full'>
                      <p className='text-black mb-2'>Department</p>
                    <div className="rounded-md p-4 w-full bg-slate-900">
                    <h4 className='text-2xl font-bold'>---</h4> 
                    </div>
                  </div>

                  <div className='w-full'>
                      <p className='text-black mb-2'>Level</p>
                    <div className="rounded-md p-4 w-full bg-slate-900">
                    <h4 className='text-2xl font-bold'>---</h4> 
                    </div>
                  </div>
                </main>

                <main className='w-full bg-slate-900 py-48 rounded-md'>

                </main>

            </section>
      </>
    );
}

export default UserDashboard