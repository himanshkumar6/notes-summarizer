import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Loader } from "lucide-react";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    toast.success("Login Successfully");
    navigate("/");
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
          Hey There, Login Here!
        </h1>
        <form onSubmit={handleLogin}>
          <Input
            icons={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icons={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            className="text-sm font-semibold text-green-500 hover:underline bg-clip-text"
            to={"/forgot-password"}
          >
            Forgot Password?
          </Link>
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
              <span>Login</span>
            )}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center px-8 py-4 bg-gray-900 bg-opacity-50">
        <p className="text-sm text-gray-500">
          New to Register Here?{" "}
          <Link className="text-green-400 hover:underline" to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
