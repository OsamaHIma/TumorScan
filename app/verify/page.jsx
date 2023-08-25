"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";

const VerifyEmailPage = () => {
  useEffect(() => {
    toast.info("Please check your email and click on the verification link.", {
      position: "top-center",
    });
  }, []);

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-indigo-500">Please Verify Your Email</h1>
        <p className="text-gray-600 mb-4">
          We have sent you an email with a verification link. Please click on
          the link to verify your email address.
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default VerifyEmailPage;
