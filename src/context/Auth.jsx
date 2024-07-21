import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
    success: false,
    message: ''
  });

  // Set base URL for axios
  axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

  // Update axios headers when auth changes
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`;
  }, [auth?.token]);

  // Retrieve the user from local storage
  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
        success: parsedData.success,
        message: parsedData.message
      });
    }
  }, []);

  const login = async (formData) => {
    try {
      const { data } = await axios.post('/auth/login', formData);

      if (!data?.error) {
        setAuth({ user: data.user, token: data.token, success: data.success, message: data.message });
        localStorage.setItem('auth', JSON.stringify(data));
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Login error:', error?.response?.data?.message);
      throw new Error(error?.response?.data?.message || 'An error occurred while logging in');
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await axios.post('/auth/register', formData);

      if (!data.error) {
        setAuth({ user: data.user, token: data.token, success: data.success, message: data.message });
        localStorage.setItem('auth', JSON.stringify(data));
      } else {
        console.log(data.error);
      }

      return data;
    } catch (error) {
      console.log('Signup Error:', error);
      throw new Error(error?.response?.data?.message || 'An error occurred while signing up');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '', success: false, message: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
