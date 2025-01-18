import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Logout = () => {
  const { logout, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <motion.div>
      <motion.button
        className="w-full px-4 py-3 mt-10 font-bold text-center text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 md:max-w-sm"
        type="Submit"
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileDrag={{
          scale: 0.98,
        }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default Logout;
