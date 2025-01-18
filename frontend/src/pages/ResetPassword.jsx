import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, error } = useAuthStore();

  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmpassword) {
      toast.error("Mismatched ");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl md:max-w-md rounded-2xl backdrop:filter backdrop:blur-xl max-w-[22rem]"
    >
      <div className="p-8 mx-3">
        <h1 className="pb-1 mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
          Create a new Password
        </h1>
        <form onSubmit={handleResetPassword}>
          <Input
            icons={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icons={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <p className="mb-2 text-sm font-semibold text-red-500">{error}</p>
          )}
          <motion.button
            className="w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="Submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileDrag={{
              scale: 0.98,
            }}
          >
            {isLoading ? (
              <Loader className="items-center justify-center mx-auto size-6 animate-spin" />
            ) : (
              <span>Set New Password</span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
