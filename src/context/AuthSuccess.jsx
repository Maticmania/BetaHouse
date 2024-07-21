import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setAuth({ user: data.user, token });
          localStorage.setItem('auth', JSON.stringify({ user: data.user, token }));
          navigate('/home');
        } catch (error) {
          console.log("Error fetching user data:", error);
          navigate('/login');
        }
      };
      fetchUserData();
    } else {
      navigate('/login');
    }
  }, [location, navigate, setAuth]);

  return <div>Loading...</div>;
};

export default AuthSuccess;
