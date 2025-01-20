import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader } from "lucide-react";
import { Mail } from "lucide-react";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
   const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
    toast.success("Login Successfully");
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl md:max-w-md rounded-2xl backdrop:filter backdrop:blur-xl max-w-[22rem]"
    >
      <div className="p-8 mx-3">
        <h1 className="pb-1 mb-6 text-2xl font-bold text-center text-transparent lg:text-3xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
          Forgot Password
        </h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-6 text-center text-gray-300">
              Please enter your email address, and we will send you a link to
              reset your password.
            </p>
            <Input
              icons={Mail}
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {error && (
            <p className="mb-2 text-sm font-semibold text-red-500">{error}</p>
          )}
            <motion.button
              className="w-full px-4 py-3 mt-1 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
                "Send Reset Email"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-center mx-auto mb-4 bg-green-500 rounded-full size-16"
            >
              <Mail className="text-white size-8" />
            </motion.div>
            <p className="mb-6 text-gray-300 ">
              We’ll send you a password reset link shortly if there’s an account
              linked to {email}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50">
        <Link
          to={"/login"}
          className="flex items-start text-sm text-green-400 hover:underline "
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
