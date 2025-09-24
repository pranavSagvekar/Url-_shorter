import React from 'react';
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { LogIn, Link, UserRoundPlus } from "lucide-react";
import { motion } from "framer-motion";



function Header() {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center border-b border-gray-300 px-4 py-2 m-3 align-middle'>
      
      {/* Logo Section */}
      <motion.div
            className='flex items-center gap-2 cursor-pointer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => navigate("/")}
            >
                <div className='flex items-center bg-black p-2 rounded-xl'>
                    <Link size={20} color="#ffffff" />
                </div>
                <h1 className='text-xl font-semibold'>ShortyLink</h1>
        </motion.div>


      {/* Buttons Section */}
      <div className='flex items-center gap-4'>
        {/* Sign In Button */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log('hover started!')}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => navigate("/login")}
        >
          <LogIn size={16} color="#000" strokeWidth={2} />
          <span className="text-black font-semibold text-sm">Sign In</span>
        </motion.button>

        {/* Register Button */}
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-black transition-colors duration-300 hover:bg-gray-800"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log('hover started!')}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          onClick={() => navigate("/signup")}
        >
          <UserRoundPlus size={16} color="#ffffff" strokeWidth={2} />
          <span className="text-white font-semibold text-sm">Register</span>
        </motion.button>
      </div>
    </div>
  );
}

export default Header;
