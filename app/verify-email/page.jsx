"use client";
import { motion } from "framer-motion";
import { MailCheckIcon, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/firebase";
import { toast } from "react-toastify";
import { playFireWorks } from "@/lib/fireWorks";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

const EmailVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      const res = await verifyEmail(oobCode);
      setIsVerified(true);
      playFireWorks();
      router.push("/auth/login");
    } catch (error) {
      toast.error(error.code);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen  ">
        <motion.div
          initial={{ opacity: 0, translateY: "2rem" }}
          animate={{ opacity: 1, translateY: 0 }}
          className="bg-white shadow-md rounded p-8 max-w-xs"
        >
          {!isVerified && (
            <div className="text-center">
              <Mail className="text-indigo-500 w-12 h-12 mx-auto" />
              <h2 className="text-2xl font-bold text-stone-800">Verify Email</h2>
              <p className="text-gray-600 ">
                Click the button below to verify your email address.
              </p>
              <Button
                onClick={handleVerifyEmail}
                className="bg-orange-500 hover:bg-orange-700 text-white py-4 mt-4"
              >
                Verify Email
              </Button>
            </div>
          )}
          {isVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 w-full mt-4"
            >
              <Image
                width={200}
                height={150}
                priority
                src="/emailVerified.png"
                alt="Email Verified"
                className="max-w-[17rem] object-contain"
              />
              <div>
                <MailCheckIcon className="text-green-500 w-12 h-12 mx-auto" />
                <h2 className="text-2xl font-bold text-center text-gray-600">
                  Email Verified!
                </h2>
                <p className="text-gray-600 text-center">
                  Thank you for verifying your email.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EmailVerificationPage;
