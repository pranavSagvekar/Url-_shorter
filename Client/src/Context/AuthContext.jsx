import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://urlshortner-gnge.onrender.com/api/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("User verification failed:", err);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("https://urlshortner-gnge.onrender.com/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        const { user, token } = res.data.message;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("https://urlshortner-gnge.onrender.com/api/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        const { user, token } = res.data.message;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const value = { isLoggedIn, user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
