import React from "react";
import { motion } from "framer-motion";

const InputField = () => {
  return (
    <div>
      <motion.div
        className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          className="w-full h-40 px-4 py-2 pb-32 text-white placeholder-gray-500 transition duration-200 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 "
          placeholder="Enter text here..."
        />
      </motion.div>
    </div>
  );
};

export default InputField;

// className =
//   "w-full h-40 px-4 py-2 pb-32 text-white placeholder-gray-500 transition duration-200 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 ";
