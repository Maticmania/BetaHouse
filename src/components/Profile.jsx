import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/Footer";
import CreateProduct from "./Tools/Product";

const UserProfile = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth?.user?._id;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
  });
  const [preview, setPreview] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`auth/user/${userId}`)
        .then((response) => {
          setUserData(response?.data?.user);
          setPreview(response?.data?.user.image);
        })
        .catch((error) => {
          console.error("Error fetching the user data!", error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setUserData({
        ...userData,
        profilePicture: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("image", userData.profilePicture);

    axios
      .put("auth/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.success("Profile updated successfully");
        setTimeout(() => navigate("/home"), 2000);
      })
      .catch((error) => {
        console.error("Error updating the profile!", error);
        toast.error("There was an error updating the profile!");
      });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .put("auth/user/update", passwords)
      .then((response) => {
        toast.success("Password updated successfully");
        setShowPasswordModal(false);
        setPasswords({ currentPassword: "", newPassword: "" });
        setConfirmPassword("");
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        console.log("Error updating the password!", error);
        if (error?.response?.data?.success === false) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("There was an error updating the password!");
        }
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-6 bg-gray-100">
        <div className="rounded-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Update Profile
          </h2>
          <form>
            <div className="mb-4 flex items-center flex-col">
              {preview && (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border border-green-400"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-1 block w-2/5 border border-gray-300 cursor-pointer"
              />
              <label className="block text-sm font-medium text-gray-700 mt-2">
                Profile Picture
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-14">
              <button
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={() => navigate("/home")}
              >
                Go Home
              </button>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 mt-4"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Current Password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Confirm New Password"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Show Password
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <CreateProduct/>
      <Footer />
    </>
  );
};

export default UserProfile;
