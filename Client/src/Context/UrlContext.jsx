import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UrlContext = createContext();


export const UrlProvider = ({ children }) => {
  const [totalclick, setTotalclick] = useState({ totalclick: 0, totalurl: 0 });
  const [initialData, setInitialData] = useState([]);
  const [getdataperurl, setGetdataperurl] = useState(null)
  const navigate = useNavigate();


  const shortUrl = async (longUrl) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.post(
        "https://url-shorter-2-ate6.onrender.com/api/url/",
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

  const openShortUrl = (shortUrl , originalUrl) => {
    
    
    if(originalUrl.startsWith("http://")  || originalUrl.startsWith("https://")){
      window.open(shortUrl, "_blank");
    }else{
      navigate('/error')
    }

  };

  const fetchTotalclick = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios.get(
        "https://url-shorter-2-ate6.onrender.com/api/url/totalClick",
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
        "https://url-shorter-2-ate6.onrender.com/api/url/initialData",
        { headers }
      );
      if (res.data.success) {
        setInitialData(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };


const getDataofEach = async (shortCode) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await axios.get(`https://url-shorter-2-ate6.onrender.com/api/url/data/${shortCode}`, { headers });

    if (res.data.success) {
      setGetdataperurl(res.data); 
      console.log(setGetdataperurl.longUrl)
    }
  } catch (error) {
    console.log("Error fetching data: ", error);
    setGetdataperurl(null);
  }
};

 

  const value = {
    shortUrl,
    openShortUrl,
    fetchTotalclick,
    totalclick,
    fetchInitialData,
    initialData,
    getDataofEach,
    getdataperurl
  
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export default UrlContext;
