"use client";
import Footer from "@/components/Footer";
import {
  ArrowLeftCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import { Button, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { toast } from "react-toastify";
import { InfoIcon } from "lucide-react";
import { facts } from "@/constants";
import { TitleText, TypingText } from "@/components/TypingText";

const styles = {
  focused: {
    borderColor: "#2196f3",
  },
  accept: {
    borderColor: "#00e676",
    backgroundColor: "rgb(59 130 246 / 0.3)",
  },
  reject: {
    borderColor: "#ff1744",
    backgroundColor: "rgb(220 38 38 / 0.3)",
  },
};

const UploadPage = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [prediction, setPrediction] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const FactTag = ({ fact }) => {
    return (
      <motion.div
        className="fact-tag bg-stone-800 text-gray-100 flex items-center gap-2 text-sm max-w-fit transition-all ease-in-out duration-300 rounded-lg p-4 m-2 shadow-lg" // add these classes
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.7, delay: 0.2 }}
        layoutId="fact-tag"
      >
        <InfoIcon className="text-blue-500" size={47} />
        <p>
          <Translate>{fact}</Translate>
        </p>
      </motion.div>
      // toast(fact)
    );
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/jfif": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...(isFocused && styles.focused),
      ...(isDragAccept && styles.accept),
      ...(isDragReject && styles.reject),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <img
        src={URL.createObjectURL(file)}
        alt={file.path}
        className="rounded-md"
      />
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const fileUrl = acceptedFiles[0];
      setPrediction(null);
      setUploadedPhoto(fileUrl);
    }
  }, [acceptedFiles, setUploadedPhoto]);

  const handleRemoveFiles = () => {
    if (uploadedPhoto) {
      URL.revokeObjectURL(uploadedPhoto);
    }
    setUploadedPhoto(null);
    acceptedFiles.splice(0, acceptedFiles.length);
  };
  // Function to send an image for prediction
  const sendImageForPrediction = async () => {
    setIsLoading(true);
    if (!uploadedPhoto) {
      // Handle case where no file is selected
      setIsLoading(false);
      toast.error("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", uploadedPhoto);

    try {
      const response = await fetch(
        "https://tumor-scan-api.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const { class1, prob1 } = await response.json();
        // Handle the response containing the predictions
        setPrediction({ class1, prob1 });
        handleRemoveFiles();
      } else {
        // Handle the error response
        toast.error("Failed to send the image for prediction");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        className="min-h-screen relative paddings innerWidth pt-16"
      >
        <Link
          href="/"
          className="p-3 absolute top-10 z-20 left-8 md:left-10 rounded-full bg-indigo-500 text-slate-100"
        >
          <ArrowLeftCircleIcon size={32} />
        </Link>
        <TypingText title="| Get The Results" textStyles="text-center" />
        <TitleText title="Upload An Image" textStyles="text-center" />
        <div className="text-center max-w-sm min-h-44 mx-auto pt-16">
          <div
            {...getRootProps({ className: "dropzone", style })}
            className="py-5 px-4  border border-dashed border-gray-400 rounded-tr-lg rounded-tl-lg transition-all"
          >
            <input {...getInputProps()} />
            <Image
              src="/image icon.svg"
              className="inline"
              width={19}
              height={19}
              priority
              alt="image icon"
            />
            <p className="text-gray-400">
              <Translate>Drag your image, or select</Translate> &nbsp;
              <span className="text-gray-500 font-semibold cursor-pointer">
                <Translate>click to browse</Translate>
              </span>
            </p>
          </div>
          <p className="text-gray-400 mt-2">
            <Translate>
              (Only *.jpeg, *.jpg, *.jfif and *.png images will be accepted)
            </Translate>
          </p>
          <aside>
            {files.length > 0 && (
              <>
                <h4>Selected Image:</h4>
                <ul>{files}</ul>
                <Button
                  disabled={loading}
                  onClick={handleRemoveFiles}
                  className="mx-2 mt-6 md:text-lg bg-red-500 text-white px-4"
                >
                  <Translate>Cancel</Translate>
                </Button>
                <Button
                  disabled={loading}
                  onClick={sendImageForPrediction}
                  className="mx-2 mt-6 md:text-lg px-6 bg-green-400 text-white"
                >
                  {loading ? (
                    <Spinner color="green" className="mx-auto" />
                  ) : (
                    <Translate>Send</Translate>
                  )}
                </Button>
              </>
            )}
          </aside>
          {prediction && (
            <div
              className="py-8"
            >
              <h4 className="dark:text-white text-stone-500 font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] my-8 text-center">
                <Translate>Results</Translate>
              </h4>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {prediction.prob1 > 0.5 ? (
                  <CheckCircleIcon className="text-green-500" size={48} />
                ) : (
                  <XCircleIcon className="text-red-500" size={48} />
                )}
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    <Translate>There is a</Translate>{" "}
                    <span className="font-bold">
                      {prediction.prob1.toFixed(1)}%
                    </span>{" "}
                    <Translate>probability that the patient has</Translate>{" "}
                    <span className="font-bold text-red-300">
                      {prediction.class1}
                    </span>
                    .
                  </p>
                  <p className="text-gray-400">
                    <Translate>
                      Based on the prediction model and data.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
          )}
          {loading && (
            <div className="py-10">
              <h1 className="dark:text-white text-stone-500 md:text-[20px] my-4 text-center">
                <Translate>Some Quick Facts</Translate>
              </h1>
              <p className="text-gray-400">
                Read some facts while waiting for the results
              </p>
              <FactTag key={index} fact={facts[index]} />
            </div>
          )}
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default UploadPage;
