import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import {Link} from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg w-full flex h-full">
        <div className="lg:w-1/2 p-8 lg:p-12 lg:px-24 flex flex-col">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Join our community of home seekers and explore the possibilities that await.</h2>
          <p>Lets get started by filling out the information below</p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                  placeholder='Enter Name'
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 ">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                  placeholder='Enter Name'
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
                className="mt-1 block w-full px-3 py-3 border-[2.5px] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
            <input type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`h-4 w-4 ${formData.termsAccepted ? 'bg-green-400 border-green-400' : 'bg-white border-gray-300'} text-green-400 rounded focus:ring-green-500`}
                />

              <label htmlFor="termsAccepted" className="ml-2 block text-lg text-gray-900">
                I agree to <a href="#" className="text-green-600 hover:text-green-800">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-800">Privacy Policies</a>
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
            <div>
            <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-medium text-white bg-green-700 hover:bg-green-800 ">
                Sign up
              </button>
            </div>
          </form>
          <div className=" text-center">
            <p className='flex items-center gap-2 py-4'>
            <span className='border-t border-slate-300 w-1/2' />
            <span className="text-lg">or</span>
            <span className='border-t border-slate-300 w-1/2' />
             </p>
             <button className="w-full flex justify-center items-center gap-2 py-4 px-4 border-2 border-gray-500 rounded-2xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50">
             <FcGoogle/>
              Continue with Google
            </button>
          </div>
          <p className="mt-6 text-center text-lg text-gray-500">
          Already have an account? <Link to="/login" className="text-green-600 hover:text-green-800">Sign in</Link>
          </p>
        </div>
        <div className="login hidden lg:flex lg:w-1/2 bg-cover  rounded-lg relative">
            <div className='absolute bg-black bg-opacity-30 h-full w-full'>
                <div className='flex items-center gap-2 p-8'>        
                <h1 className='logo'>BH</h1>
                <p className='logo-text'>
                    BetaHouse
                </p>
                </div>
            </div>
            </div>
      </div>
    </div>
  );
};

export default SignUp;
