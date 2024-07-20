import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(`Failed to reset password ${error?.response?.data?.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              New Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="viewPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="viewPassword" className="ml-2 block text-lg text-gray-700">
              Show password
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-700 hover:bg-green-800"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
