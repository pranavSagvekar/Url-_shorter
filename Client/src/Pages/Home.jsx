import React from 'react'
import { motion } from "framer-motion";
import {Zap , Shield , ChartColumn , Link} from "lucide-react"
import { Navigate , useNavigate } from 'react-router-dom';
 function Home() {

    const navigate =useNavigate();
  return (
    <>
    <div className='flex flex-col'>
        <div className='flex items-center justify-center my-20 mb-8 '>
            <h1 className='text-5xl text-center text-shadow-gray-900'>
                Shorten Your Links,<br />
                Amplify Your Reach
            </h1>
        </div>
        <div className='flex items-center justify-center '>
            <p className='text-center text-xl text-gray-500'>
                Transform long, complex URLs into short, shareable links.<br/>
                 Track performance, engage your audience, and boost your digital presence.
            </p>
        </div>
        <div >
            <div className="flex justify-center mt-10 ">
                <div className="flex flex-col border-2 border-gray-200 p-6 rounded-2xl shadow-2xl w-full max-w-lg ">
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4 text-gray-800 font-medium justify-center  ">
                        <Link size={22} strokeWidth={1.8} />
                        <span>URL Shortener</span>
                    </div>

                    
                    <div className="flex flex-col gap-2 mb-4 md:flex-row md:gap-2 md:mb-6">
                        <input 
                            type="text"
                            placeholder="Enter your long URL here..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none duration-300 focus:ring-2 focus:ring-gray-300 ease-in  pr-20"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-black text-white px-8 py-2 rounded-md transition-colors duration-300 hover:bg-gray-800 cursor-pointer "
                        >
                            Shorten
                        </motion.button>
                    </div>

                   
                    <div className="flex items-center justify-center flex-col gap-4 text-gray-600 text-sm">
                        <span>Want to track your links and access more features?</span>
                           <div className='flex gap-4'>
                        <motion.button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </motion.button>
                        <motion.button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={() => navigate("/signup")}
                        >
                            Get Started Free
                        </motion.button>
                        </div>
                    </div>

                </div>
                </div>

        </div>
        <div className='flex align-middle justify-center pt-24 pb-10'>
            <h1  className='text-3xl'>
                Why Choose ShortyLink?
            </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 px-10 pb-30 md:flex-row">
            <motion.div
                className='border border-gray-200 rounded-xl p-4 transition-shadow duration-200 ease-in-out hover:shadow-md cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 4, ease: "easeInOut" }}
            >
                    <div className='flex flex-col items-center text-center gap-2 '>
                        <div className='bg-gray-200 p-3 rounded-4xl'>
                        <Zap size={34} color="#000" strokeWidth={1.85} />
                        </div>
                        <h1 className='text-lg font-semibold'>Lightning Fast</h1>
                        <p className='text-base text-gray-600'>
                            Shorten URLs in milliseconds with our optimized infrastructure
                        </p>
                    </div>
            </motion.div>
            <motion.div
                className='border border-gray-200 rounded-xl p-4 transition-shadow duration-500 ease-in-out hover:shadow-md cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 4, ease: "easeInOut" }}
            >
                    <div className='flex flex-col items-center text-center gap-2 '>
                        <div className='bg-gray-200 p-3 rounded-4xl'>
                        <Shield size={34} color="#000" strokeWidth={1.75} />
                        </div>
                        <h1 className='text-lg font-semibold'>Secure & Reliable</h1>
                        <p className='text-base text-gray-600'>
                            Enterprise-grade security with 99.9% uptime guarantee
                        </p>
                    </div>
            </motion.div>
            <motion.div
                className='border border-gray-200 rounded-xl p-4 transition-shadow duration-500 ease-in-out hover:shadow-md cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 4, ease: "easeInOut" }}
            >
                    <div className='flex flex-col items-center text-center gap-2 '>
                        <div className='bg-gray-200 p-3 rounded-4xl'>
                        <ChartColumn size={32} />
                        </div>
                        <h1 className='text-lg font-semibold'>Detailed Analytics</h1>
                        <p className='text-base text-gray-600'>
                           Track clicks, geographic data, and user engagement
                        </p>
                    </div>
            </motion.div>
        </div>

    </div>

    </>
  )
}

export default Home