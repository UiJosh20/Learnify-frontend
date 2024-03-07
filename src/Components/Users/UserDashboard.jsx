import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const matricNumber = useSelector(state => state.matric.matricNumber);
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const TokenURL = 'http://localhost:3000/user/verifyToken';
  const ClassURL = 'http://localhost:3000/user/userDashboard';
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        navigate('/user/login');
      }

      axios.post(TokenURL, { token })
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

    const fetchUpcomingClasses = () => {
      axios.get(ClassURL)
        .then((response) => {
          setUpcomingClasses(response.data.upcomingClasses);
        })
        .catch((error) => {
          console.error('Error fetching upcoming classes:', error);
        });
    }

    checkToken();
    fetchUpcomingClasses();
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="logo1 !text-5xl mb-10 !text-slate-900">Learnify</p>
        <div className="loader1"></div>
      </div>
    );
  }

  if (!tokenMatch) {
    navigate('/user/login');
    return null;
  }

  return (
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
        <div className='bg-gray-200 w-96 overflow-y-auto' style={{ maxHeight: '400px' }}>
          <div className='bg-slate-900 p-4'>
          <h3 className='text-xl font-bold text-yellow-500 '>Upcoming Classes</h3>
          </div>
          <div className='space-y-5 py-7'>
            {
              upcomingClasses.map((item, i) => (
                <div key={i} className='text-gray-600 px-5'>
                  <p className='text-slate-800'>{item.Course}</p>
                  <p>{item.Instructor}</p>
                  <small>{item.Date}</small>
                  &nbsp;&nbsp;
                  <small>{item.Time}</small>
                  <p>{item.Location}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className='bg-gray-200 p-4 w-full'>
        </div>
      </main>
    </section>
  );
}

export default UserDashboard;
