"use client"
import { motion } from 'framer-motion';
import { MailCheckIcon } from 'lucide-react';
import Footer from "@/components/Footer";
import { useState } from 'react';

const EmailVerificationPage = () => {
  const [isVerified, setIsVerified] = useState(true);

  const handleVerifyEmail = () => {
    setIsVerified(true);
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, translateY: '2rem' }}
        animate={{ opacity: 1, translateY: 0 }}
        className="bg-white shadow-md rounded p-8 max-w-xs"
      >
        {/* {isVerified ? (
          <>
            <BadgeCheck  className="text-green-500 w-12 h-12 mx-auto" />
            <h2 className="text-2xl font-bold text-center">Email Verified!</h2>
            <p className="text-gray-600 text-center">
              Thank you for verifying your email.
            </p>
          </>
        ) : (
          <>
            <Mail className="text-indigo-500 w-12 h-12 mx-auto" />
            <h2 className="text-2xl font-bold text-center">Verify Email</h2>
            <p className="text-gray-600 text-center">
              Click the button below to verify your email address.
            </p>
            <button
              onClick={handleVerifyEmail}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
            >
              Verify Email
            </button>
          </>
        )} */}
        {isVerified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 w-full mt-4"
          >
            <img
              src="/emailVerified.png"
              alt="Email Verified"
              className="max-w-[17rem] object-contain"
            />
            <div>
              <MailCheckIcon className="text-green-500 w-12 h-12 mx-auto" />
              <h2 className="text-2xl font-bold text-center text-gray-600">Email Verified!</h2>
              <p className="text-gray-600 text-center">
                Thank you for verifying your email.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
      <Footer/>
      
      </>
  );
};

export default EmailVerificationPage;
