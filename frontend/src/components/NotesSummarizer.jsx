import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const NotesSummarizer = () => {
  const [notes, setnotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    try {
      const response = await axios.post(
        "https://notes-summarizer-rklu.onrender.com/api/summarize",
        {
          text: notes,
        }
      );
      setSummary(response.data.summary);
    } catch (error) {
      console.error(
        "Error summarizing notes:",
        error?.response || error.message || error
      );
      setSummary(
        "Failed to generate summary: " +
          (error?.response?.data?.message || "Unexpected error")
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl md:max-w-screen-xl  rounded-2xl backdrop:filter backdrop:blur-xl max-w-[22rem] text-center"
    >
      <div className="w-full max-w-screen-xl p-1 mx-auto">
        <form onSubmit={handleSummarize}>
          <textarea
            className="block w-full pt-2 pl-3 text-white bg-transparent border rounded-md shadow-sm outline-none placeholder-slate-400 focus:outline-none sm:text-md focus:ring-1"
            rows={10}
            cols={1000}
            value={notes}
            placeholder="Enter your notes here..."
            onChange={(e) => setnotes(e.target.value)}
          />
          <motion.button
            className="w-full px-4 py-3 mt-10 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 md:max-w-sm"
            type="Submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 0.58,
            }}
          >
            {loading ? "Summarizing" : "Generate"}
          </motion.button>
        </form>
        <hr className="mt-6" />
        {summary && (
          <div className="relative mt-6 mb-6 font-bold text-center text-transparent text-md lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
            Output Data
            <h2>Summary:"{summary} "</h2>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotesSummarizer;
