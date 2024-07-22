import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    "Please wait a moment...",
    "We're logging you in...",
    "Just a second...",
    "Hang tight, almost there...",
    "Processing your login...",
    "Loading your account..."
  ];

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [loadingMessages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mt-4">
          <svg className="animate-spin h-10 w-10 text-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.476 0 0 6.476 0 12h4z"></path>
          </svg>
        </div>
        <div className="text-xl font-semibold text-gray-700">{loadingMessages[loadingMessageIndex]}</div>
      </div>
    </div>
  );
};

export default OAuthCallback;
