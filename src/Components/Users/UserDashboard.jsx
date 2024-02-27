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
      return <div>Loading...</div>;
    }
  
    if (!tokenMatch) {
      navigate('/user/login');
      return null;
    }
  
    return (
      <div>
        <h1>Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    );
}

export default UserDashboard