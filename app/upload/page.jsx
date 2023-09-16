"use client";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Brain,
  CheckCircleIcon,
  DownloadIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import {
  Button,
  Option,
  Select,
  Spinner,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";
import { toast } from "react-toastify";
import { InfoIcon } from "lucide-react";
import { facts } from "@/constants";
import { TitleText, TypingText } from "@/components/TypingText";
import Navbar from "@/components/Navbar";

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
  const [selectedModel, setSelectedModel] = useState("");
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
    disabled: loading,
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
    if (!selectedModel) {
      // Handle case where no file is selected
      setIsLoading(false);
      toast.error("Please select an x-rey type");
      return;
    }
    const modelUrls = {
      brain: "https://tumor-scan-api.onrender.com/predict",
      colon: "https://tumor-scan-colon.onrender.com/predict",
      lung: "https://tumor-scan-colon.onrender.com/predict",
      marrow: "https://tumor-scan-marrow.onrender.com/predict",
      // chest: "https://tumor-scan-chest.onrender.com/predict",
    };
    const formData = new FormData();
    formData.append("file", uploadedPhoto);

    try {
      const response = await fetch(modelUrls[selectedModel], {
        method: "POST",
        body: formData,
      });

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
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className: "font-normal text-xs",
  };
  return (
    <>
      <Navbar />
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        className="min-h-screen relative paddings innerWidth pt-20 md:pt-32"
      >
        <TypingText title="| Get The Results" textStyles="text-center" />
        <TitleText title="Upload An Image" textStyles="text-center" />
        <div className="text-center max-w-sm min-h-44 mx-auto pt-16">
          <div className="py-5 flex flex-col gap-3">
            <div className="" dir="ltr">
              <Select

                label={<Translate>Which type is the x-ray?</Translate>}
                className="dark:text-gray-300"
                color="indigo"
                selected={(element) => {
                  if (element) {
                    const selectedValue = element;
                    if (selectedModel !== selectedValue.props.children) {
                      setSelectedModel(selectedValue.props.children);
                    }
                    return element;
                  }
                }}

              >
                
                <Option className="capitalize">brain</Option>
                <Option className="capitalize">lung</Option>
                <Option className="capitalize">colon</Option>
                <Option className="capitalize">marrow</Option>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-[10px] text-gray-400 whitespace-nowrap rtl:text-right">
                  <Translate>Don&apos;t have Images to test the models?</Translate>
                </p>
                <h5 className="text-left whitespace-nowrap">
                  <Translate>Download some now!</Translate>{"   "}
                  <ArrowRight className="inline transition-transform rtl:rotate-180" />
                </h5>
              </div>
              <div className="relative h-14 w-full">
                <div className="absolute bottom-0 ltr:-right-0 rtl:-left-0">
                  <SpeedDial placement="right">
                    <SpeedDialHandler>
                      <IconButton size="lg" className="rounded-full">
                        <DownloadIcon className="h-5 w-5" />
                      </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent>
                      <Link
                        target="_blank"
                        href="https://tumor-scan.vercel.app/brain.png"
                        download="brain.png"
                      >
                        <SpeedDialAction className="h-16 w-16">
                          <Brain className="h-5 w-5 text-stone-950" />
                          <Typography {...labelProps}><Translate>Brain</Translate></Typography>
                        </SpeedDialAction>
                      </Link>
                      <Link
                        target="_blank"
                        href="https://tumor-scan.vercel.app/lung.jpg"
                        download="lung.jpg"
                      >
                        <SpeedDialAction className="h-16 w-16">
                          <img
                            className="h-5 w-5"
                            src="https://img.icons8.com/ios/50/lungs.png"
                            alt="lungs"
                          />
                          <Typography {...labelProps}><Translate>Lung</Translate></Typography>
                        </SpeedDialAction>
                      </Link>
                      {/* <Link
                        target="_blank"
                        href="https://tumor-scan.vercel.app/chest.jpeg"
                        download="chest.jpeg"
                      >
                        <SpeedDialAction className="h-16 w-16">
                          <img
                            className="h-5 w-5"
                            src="https://img.icons8.com/ios/50/chest.png"
                            alt="chest"
                          />
                          <Typography {...labelProps}><Translate>Chest</Translate></Typography>
                        </SpeedDialAction>
                      </Link> */}
                      <Link
                        target="_blank"
                        href="https://tumor-scan.vercel.app/colon.jpg"
                        download="colon.jpg"
                      >
                        <SpeedDialAction className="h-16 w-16">
                          <img
                            className="h-5 w-5"
                            src="https://img.icons8.com/quill/50/large-intestine.png"
                            alt="large-intestine"
                          />
                          <Typography {...labelProps}><Translate>Colon</Translate></Typography>
                        </SpeedDialAction>
                      </Link>
                      <Link
                        target="_blank"
                        href="https://tumor-scan.vercel.app/marrow.jpg"
                        download="marrow.jpg"
                      >
                        <SpeedDialAction className="h-16 w-16">
                          <img
                            className="h-5 w-5"
                            src="https://img.icons8.com/external-others-pike-picture/50/external-Marrow-immune-others-pike-picture.png"
                            alt="external-Marrow-immune-others-pike-picture"
                          />
                          <Typography {...labelProps}><Translate>Marrow</Translate></Typography>
                        </SpeedDialAction>
                      </Link>
                    </SpeedDialContent>
                  </SpeedDial>
                </div>
              </div>
            </div>
          </div>
          <div
            {...getRootProps({ className: "dropzone", style })}
            className="py-5 px-4  border border-dashed border-gray-400 rounded-tr-lg rounded-tl-lg transition-all"
          >
            <input {...getInputProps()} disabled={loading} />
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
            {loading && <Spinner color="green" className="mx-auto mt-3" />}
          </div>
          <p className="text-gray-400 mt-2">
            <Translate>
              (Only *.jpeg, *.jpg, *.jfif and *.png images will be accepted)
            </Translate>
          </p>
          <aside>
            {files.length > 0 && (
              <>
                <h4 className="mt-3">
                  <Translate>Selected Image:</Translate>
                </h4>
                <ul>{files}</ul>
                <div className="" dir="ltr">
                  <Button
                    disabled={loading}
                    onClick={handleRemoveFiles}
                    className="mx-2 mt-6 md:text-lg bg-red-500 text-white px-4"
                  >
                    <Translate translations={{ ar: "إلغاء" }}>Cancel</Translate>
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={sendImageForPrediction}
                    className="mx-2 mt-6 md:text-lg px-6 bg-green-400 text-white"
                  >
                    {loading ? (
                      <Spinner color="green" className="mx-auto" />
                    ) : (
                      <Translate translations={{ ar: "أرسل" }}>Send</Translate>
                    )}
                  </Button>
                </div>
              </>
            )}
          </aside>
          {prediction && (
            <div className="py-8">
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
                <Translate>
                  Read some facts while waiting for the results
                </Translate>
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
