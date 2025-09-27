import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Eye, EyeOff, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-10 py-10">
        <div
          className="flex items-center gap-1 cursor-pointer px-4 py-2 w-fit duration-300 rounded-xl hover:bg-gray-200"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          <span className="font-semibold text-sm">Back to Home</span>
        </div>
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSignup} className="border-2 border-gray-200 rounded-2xl shadow-md p-6 w-full max-w-md">
          <div className='bg-black p-3 rounded-full w-fit mx-auto'>
            <User size={34} color="#ffffff" />
          </div>
          <div className="flex flex-col mt-6 justify-center items-center text-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-gray-500 px-6">
              Join thousands of users shortening their links
            </p>
          </div>

          <div className='flex flex-col mt-6'>
            <h1 className='font-semibold'>Full Name</h1>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
              <User size={16} color="#616161" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div className='flex flex-col mt-6'>
            <h1 className='font-semibold'>Email</h1>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
              <Mail size={16} color="#616161" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div className='flex flex-col mt-6'>
            <h1 className='font-semibold'>Password</h1>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
              <Lock size={16} color="#616161" />
              <input
                type={visible ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                required
              />
              {visible ?
                <Eye size={16} color="#616161" className='cursor-pointer' onClick={() => setVisible(!visible)} /> :
                <EyeOff size={16} color="#616161" className='cursor-pointer' onClick={() => setVisible(!visible)} />
              }
            </div>
          </div>

          <div className='flex flex-col mt-6'>
            <h1 className='font-semibold'>Confirm Password</h1>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
              <Lock size={16} color="#616161" />
              <input
                type={confirmVisible ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
                required
              />
              {confirmVisible ?
                <Eye size={16} color="#616161" className='cursor-pointer' onClick={() => setConfirmVisible(!confirmVisible)} /> :
                <EyeOff size={16} color="#616161" className='cursor-pointer' onClick={() => setConfirmVisible(!confirmVisible)} />
              }
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='flex justify-center w-full mt-6 bg-black text-white font-semibold rounded-md px-2 py-2 cursor-pointer'
          >
            Create Account
          </motion.button>

          <div className='flex justify-center items-center gap-2 mt-4 text-sm text-gray-500 text-center'>
            <p>Already have an account?</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className='text-black text-base cursor-pointer font-semibold hover:underline'
              onClick={() => navigate("/login")}
            >
              Sign in here
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;

