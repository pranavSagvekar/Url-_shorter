import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft , Lock , Mail  , Eye , EyeOff} from 'lucide-react'
import {motion} from 'framer-motion'
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Back button */}
      <div className="px-10 py-10">
        <div
          className="flex items-center gap-1 cursor-context-menu px-4 py-2 w-fit duration-300 rounded-xl hover:bg-gray-200"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          <span className="font-semibold text-sm">Back to Home</span>
        </div>
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div className="border-2 border-gray-200 rounded-2xl shadow-md p-6">
          <div className='bg-black p-3 rounded-full w-fit mx-auto'>
            <Lock size={34} color="#ffffff" />
          </div>
          <div className="flex flex-col mt-6 justify-center items-center text-center">
              <h1 className="text-2xl font-semibold">
                Welcome Back
              </h1>
              <p className="text-gray-500">
                Sign in to your account to access your shortened links
              </p>
          </div>
          <div className='flex flex-col mt-6 '>
              <h1 className='font-semibold'>Email</h1>
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 outline-0 active:shadow-md">
                  <Mail size={16} color="#616161"  />
                  <input
                    type="Email"
                    placeholder="Enter your mail"
                    className="flex-1 outline-none bg-transparent"
                  />
              </div>
             
          </div>
          <div className='flex flex-col mt-6 '>
              <h1 className='font-semibold'>Password</h1>
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 outline-0 active:shadow-md">
                  <Lock size={16} color="#616161" />
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Enter your mail"
                    className="flex-1 outline-none bg-transparent"
                  />
                  {visible ?
                    <Eye size={16} color="#616161" className='cursor-pointer' onClick={() => setVisible(!visible)} />
                    : 
                    <EyeOff size={16} color="#616161" className='cursor-pointer' onClick={() => setVisible(!visible)} />
                  }
              </div>
          </div>
          <motion.div 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
          className='flex justify-center  mt-6 bg-black text-white font-semibold rounded-md px-2 py-2  cursor-context-menu font-md'>
            Sign in
          </ motion.div>

          <div className='flex justify-center items-center gap-2 mt-4 text-sm text-gray-500 text-center'>
            <p>Don't have an account?  </p>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className='text-black text-base cursor-context-menu font-semibold hover:underline'
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
