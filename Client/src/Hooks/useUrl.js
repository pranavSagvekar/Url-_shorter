import { useContext } from "react";
import UrlContext from "../Context/UrlContext.jsx";

const useUrl = () => {
  return useContext(UrlContext);
};

export default useUrl;

