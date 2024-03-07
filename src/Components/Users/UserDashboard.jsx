
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const matricNumber = useSelector(state => state.matric.matricNumber);
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        navigate('/user/login');
      }

      axios.post('http://localhost:3000/user/verifyToken', { token })
        .then(response => {
          console.log(response.data);
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
        <main className='w-full  lg:pt-5 rounded-md lg:mt-20 lg:px-2'>
          <div className="bg-slate-900 lg:py-5 lg:px-10 text-white space-y-2 rounded-md">
            <small>{currentDate}</small>
            <p>
            Student ID : 
            <small className='font-bold '> {matricNumber}</small>
            </p>

            <h3 className='font-bold w-full py-5 text-2xl'>Welcome to Learnify, &nbsp;
               <strong className='text-yellow-500'>{firstName} {lastName}</strong>
            </h3>
          </div>
        </main>

        <main className='flex space-x-10 py-10 lg:px-2'>
          <div className='bg-gray-200 p-4 w-96'>
            <h3 className='text-xl font-bold text-gray-700'>Upcoming Classes</h3>
            <div className='space-y-5'>
              <h3>Chemistry 102</h3>
              <small>12:00 PM</small>
              <p>This is an organic chemistry course</p>
            </div>
          </div>
          <div className='bg-gray-200 p-4 w-full'>

          </div>
        </main>


      </section>
    </>
  );
}

export default UserDashboard