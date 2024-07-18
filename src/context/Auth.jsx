import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set base URL for axios
  axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

  // Update axios headers when auth changes
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
  }, [auth?.token]);

  // Retrieve the user from local storage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData.user, token: parsedData.token });
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const { data } = await axios.post("/auth/login", {
        identifier,
        password,
      });

      if (!data?.error) {
        // Login successful
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        return data;
      } else {
        // Login failed
        return false;
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error?.response && error?.response?.data && error?.response?.data?.error) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("An error occurred while logging in");
      }
    } 
  };

  // Signup function
  const signup = async (formData) => {
    try {
      const { data } = await axios.post("/auth/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!data.error) {
        setAuth({
          user: data?.user,
          token: data?.token,
        });
        // Save signup data to local storage
        localStorage.setItem("auth", JSON.stringify(data));
      } else {
        console.log(data.error);
      }

      return data;
    } catch (error) {
      console.log("Signup Error:", error);
      if (error?.response && error?.response?.data && error?.response?.data?.error) {
        throw new Error(error?.response?.data?.error);
      } else {
        throw new Error("An error occurred while signing up", error);
      }
    }
  };

  const logout = () => {
    // Clear auth data
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
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
