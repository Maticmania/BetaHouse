// src/components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/auth/forgot-password', { email });
      toast.success(response.data.message || "If the email is registered, a reset link will be sent.");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error sending reset password email:", error);
      toast.error("Failed to send reset password email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password</h2>
        <p className="text-lg mb-6 text-center">We will send a reset password link to your email if your email is registered with us</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-white ${isSubmitting || !email ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
              disabled={isSubmitting || !validateEmail(email)}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
