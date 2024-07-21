import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = JSON.parse(params.get('user'));

    if (token && user) {
      localStorage.setItem('auth', JSON.stringify({
        success: true,
        message: "Login successful",
        token: token,
        user: user
      }));
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
