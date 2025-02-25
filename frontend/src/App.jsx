import FloatingShape from "./components/FloatingShape";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import { useAuthStore } from "./store/authStore";
import VerifyYourMail from "./pages/VerifyYourMail";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoadingSpiner from "./components/LoadingSpiner";
import ResetPassword from "./pages/ResetPassword";

//protected routes for authent.

const Protectroute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (!user.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }
  return children;
};

//redirect auth. users to the home page

const RedirectAuth = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpiner />;

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Protectroute>
              <Dashboard />
            </Protectroute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuth>
              <SignUpPage />
            </RedirectAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuth>
              <LoginPage />
            </RedirectAuth>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuth>
              <ForgotPassword />
            </RedirectAuth>
          }
        />
        <Route path="/verify-email" element={<VerifyYourMail />} />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuth>
              <ResetPassword />
            </RedirectAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
