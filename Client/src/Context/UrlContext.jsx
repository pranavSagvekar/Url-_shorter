import { createContext, useState } from "react";
import axios from "axios";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [totalclick, setTotalclick] = useState({ totalclick: 0, totalurl: 0 });
  const [initialData, setInitialData] = useState([]);

  const shortUrl = async (longUrl) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.post(
        "http://localhost:5000/api/url/",
        { originalUrl: longUrl },
        { headers }
      );

      if (res.data.success) {
        return res.data.data.shortUrl;
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
      return null;
    }
  };

  const openShortUrl = (shortUrl) => {
    window.open(shortUrl, "_blank");
  };

  const fetchTotalclick = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get(
        "http://localhost:5000/api/url/totalClick",
        { headers }
      );
      if (res.data.success) {
        setTotalclick(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching total clicks:", error);
    }
  };

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get(
        "http://localhost:5000/api/url/initialData",
        { headers }
      );
      if (res.data.success) {
        setInitialData(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const value = {
    shortUrl,
    openShortUrl,
    fetchTotalclick,
    totalclick,
    fetchInitialData,
    initialData,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export default UrlContext;
