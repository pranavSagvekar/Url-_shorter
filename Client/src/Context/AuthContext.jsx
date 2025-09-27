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
        const res = await axios.get("http://localhost:5000/api/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        
        const { user, token } = res.data.message;

        console.log("Token from backend :", token); // This should now log the token correctly

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
      const res = await axios.post("http://localhost:5000/api/register",{
        name , email , password
      });

      if (res.data.success) {
        const { user, token } = res.data.message;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Signup failed:", error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const shortUrl = async (longUrl) => {
    try { 
      const token = localStorage.getItem("token");
      const headers = {};
      if(token){
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await axios.post('http://localhost:5000/api/url/' ,{originalUrl : longUrl} , {headers}) ;

      if(res.data.success){
        return res.data.data.shortUrl;
      }
    } catch (error) {
      console.log("Error is : " + error );
      return null;
    }
  }

  const openShortUrl = (shortUrl) => {
    
    
    window.open(shortUrl , "_blank")
  } 

  const value = { isLoggedIn, user, loading, login, logout , signup , shortUrl , openShortUrl };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

