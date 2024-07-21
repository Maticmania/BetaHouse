import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)


  const { login } = useAuth();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setloading(true)
        const data = await login(formData);

        if (!data?.error) {
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          toast.error("Login failed");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }finally{
        setloading(false)
      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg w-full flex flex-col-reverse lg:flex-row h-full">
        <div className="w-full lg:w-1/2 p-8 lg:p-12 lg:px-24 flex flex-col">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome Back to BetaHouse!</h2>
          <p>Let's get started by filling out the information below</p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4 xl:mt-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your Email'
                className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className={`h-4 w-4 ${formData.rememberMe ? 'bg-green-400 border-green-400' : 'bg-white border-gray-300'} text-green-400 rounded focus:ring-green-500`}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-lg text-gray-700">
                  Remember me
                </label>
              </div>
              <div className='text-red-400'><a href="/forget-password">Forget password</a></div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-white bg-green-700 hover:bg-green-800"
                disabled={loading}
              >
                {loading ? 'Signing In...' : ' Sign In' } 
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className='flex items-center gap-2 py-4'>
              <span className='border-t border-slate-300 w-1/2' />
              <span className="text-lg">or</span>
              <span className='border-t border-slate-300 w-1/2' />
            </p>
            <button className="w-full flex justify-center items-center gap-2 py-4 px-4 border-2 border-gray-500 rounded-2xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FcGoogle />
              Continue with Google
            </button>
          </div>
          <p className="mt-6 text-center text-lg text-gray-500">
            New User? <Link to="/register" className="text-green-600 hover:text-green-800">Sign up</Link>
          </p>
        </div>
        <div className="login w-full lg:w-1/2 bg-cover rounded-lg  relative lg:flex min-h-screen">
          <div className='absolute bg-black bg-opacity-30 h-full w-full'>
            <div className='flex items-center gap-2 p-8'>
              <h1 className='logo'>BH</h1>
              <p className='logo-text text-white'>
                BetaHouse
              </p>
            </div>
            <div>
              {/* I will add something here soon */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SignIn;
