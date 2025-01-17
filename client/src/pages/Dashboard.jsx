import React, { useState } from "react";
import { motion } from "framer-motion";
import Logout from "../components/Logout";
import { useAuthStore } from "../store/authStore";
import InputField from "../components/InputField";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-screen-md p-4 mx-auto mt-10 bg-gray-900 border border-gray-800 shadow-2xl w-[94%] lg:w-full lg:max-w-screen-xl bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl"
    >
      <div className="flex justify-between">
        <h2 className="relative mb-6 font-bold text-center text-transparent cursor-pointer text-md lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          Dashboard
        </h2>
        <h2 className="relative mb-6 font-bold text-center text-transparent text-md lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          Notes Summazier
        </h2>
        <h2
          className="relative mb-6 font-bold text-center text-transparent underline cursor-pointer lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-md"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          Account
          {/* Hover Details with Animation */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 w-64 p-4 mt-2 text-gray-200 transform -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg lg:left-1 bottom-full right-1"
            >
              <h4 className="text-sm font-medium">Account Details</h4>
              <p className="text-sm font-medium">
                <strong>Name:{user.name}</strong>
              </p>
              <p className="text-sm font-medium">
                <strong>Email:{user.email}</strong>
              </p>
              <p className="text-sm font-medium">
                <strong>Status:Active</strong>
              </p>
            </motion.div>
          )}
        </h2>
      </div>
      <div className="space-y-6 ">
        <h2 className="relative mb-6 font-bold text-center text-transparent text-md lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          Input Data
        </h2>
        <InputField />
        <motion.button
          className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          type="Submit"
          // onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileDrag={{
            scale: 0.98,
          }}
        >
          Generate
        </motion.button>
        <hr />
        <h2 className="relative mb-6 font-bold text-center text-transparent text-md lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          Output Data
        </h2>
        <InputField />
      </div>
      <Logout />
      <h2 className="py-5 mx-auto font-bold text-center text-transparent cursor-pointer text-md bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
        Version 1.0.0
      </h2>
    </motion.div>
  );
};

export default Dashboard;
