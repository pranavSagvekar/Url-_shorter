import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Link, UserRoundPlus, House, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth"; 

function Header() {
  const navigate = useNavigate();

  const { isLoggedIn, user, loading, logout } = useAuth();

  
  if (loading) {
    return (
      <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 m-3">
        <div>...</div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 m-3">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => navigate("/")}
      >
        <div className="flex items-center bg-black p-2 rounded-xl">
          <Link size={20} color="#ffffff" />
        </div>
        <h1 className="text-xl font-semibold">ShortyLink</h1>
      </motion.div>

      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
           <motion.div
              className="font-base text-gray-600  flex gap-[1px] "
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }, 
                },
              }}
            >
              {`Hi, ${user?.name || ""} `.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, rotateX: 90, y: 20 },
                    visible: {
                      opacity: 1,
                      rotateX: 0,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  style={{ display: "inline-block", perspective: 1000 }}
                >
                  {char === " " ? "\u00A0" : char} {/* preserve spaces */}
                </motion.span>
              ))}
            </motion.div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={() => navigate("/")}
            >
              <House size={16} />
              Home
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              onClick={logout} // <-- USE THE LOGOUT FUNCTION FROM CONTEXT
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={() => navigate("/login")}
            >
              <LogIn size={16} />
              <span className="text-black font-semibold text-sm">Sign In</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              onClick={() => navigate("/signup")}
            >
              <UserRoundPlus size={16} />
              <span className="text-white font-semibold text-sm">Register</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

