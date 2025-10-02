import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth.js";
import useUrl from "../Hooks/useUrl";
import { Link, ChartColumn, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import CustomTable from "../Components/createTable.jsx";

function Dashboard() {
  const { user } = useAuth();
  const { totalclick, fetchTotalclick, fetchInitialData, shortUrl } = useUrl();
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTotalclick();
    fetchInitialData();
  }, []);

  const handleShorten = async () => {
    if (url.trim() === "") {
      toast.error("Please enter URL to shorten.");
      return;
    }

    const result = await shortUrl(url);
    if (result) {
      toast.success("URL shortened successfully!");
      setUrl("");
      fetchInitialData(); // refresh table
      fetchTotalclick();  // refresh counts
    }
  };

  return (
    <div className="flex flex-col justify-center p-10">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-3 ml-4 text-gray-600">
          Welcome back, <b className="font-semibold">{user?.name}</b>
        </p>
      </div>

      {/* Total Links & Clicks */}
      <div className="flex justify-between align-middle mx-24 gap-16 pb-10">
        <div className="flex justify-between flex-[0.5] border border-gray-300 rounded-xl p-4">
          <div className="flex-row justify-between">
            <p className="text-gray-500">Total Links:</p>
            <p className="font text-2xl">{totalclick.totalUrls || 0}</p>
          </div>
          <div className="flex items-center justify-center">
            <Link size={40} />
          </div>
        </div>

        <div className="flex justify-between flex-[0.5] border border-gray-300 rounded-xl p-4">
          <div className="flex-row justify-between">
            <p className="text-gray-500">Total Clicks:</p>
            <p className="font text-2xl">{totalclick.totalClicks || 0}</p>
          </div>
          <div className="flex items-center justify-center">
            <ChartColumn size={40} />
          </div>
        </div>
      </div>

      {/* Create Short Link */}
      <div className="flex-row border border-gray-300 rounded-xl mx-5 p-4">
        <div className="flex items-center align-middle pb-6">
          <Plus size={20} />
          <p className="ml-2">Create New Short Link</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            className="flex-[0.9] p-2 bg-gray-100 rounded-md pl-4 text-md"
            type="text"
            placeholder="Enter your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleShorten}
            className="flex-[0.1] text-white bg-black rounded-md text-base py-2"
          >
            Create Link
          </motion.button>
        </div>
      </div>

      {/* Search & Table */}
      <div className="pt-8 mx-6">
        <div className="flex justify-between p-4">
          <h2>Your Links:</h2>
          <div className="bg-gray-200 px-4 py-2 flex items-center gap-4 rounded-md focus-within:border-2 focus-within:border-gray-600 focus-within:shadow-md transition ease-out duration-200">
            <Search size={16} className="text-gray-600" />
            <input
              type="text"
              placeholder="Search Links..."
              className="bg-transparent outline-none text-gray-700 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <CustomTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Dashboard;
