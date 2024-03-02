
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tokenMatch, setTokenMatch] = useState(false);
  
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
        <div className="px-80 text-gray-200 flex  justify-center items-center w-full">
          <h1 className='w-full'>Welcome to Student Dashboard</h1>
         
        </div>

      </>
    );
}

export default UserDashboard