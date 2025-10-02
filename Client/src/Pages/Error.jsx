import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, X, Check } from "lucide-react";
import { motion } from "framer-motion";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      
      {/* Animated Warning Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="text-red-00 mb-6"
      >
        <AlertTriangle size={80} strokeWidth={1.5} />
      </motion.div>

     
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-extrabold text-8xl text-gray-800 mb-4"
      >
        404
      </motion.h1>

    
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-lg text--600 mt-2 px-2 md:px-0"
      >
        Please check your URL. <br />
        It should start with{" "}
        <span className="font-semibold text-black">http://</span> or{" "}
        <span className="font-semibold text-black">https://</span>
        <br />
        (<X size={16} className="inline mr-1 text-gray-500" /> google.com →{" "}
        <Check size={16} className="inline ml-1 text-gray-500" />{" "}
        https://www.google.com)
      </motion.h2>

  
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10"
      >
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-gray-500 text-white rounded-xl shadow-lg "
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}

export default Error;
