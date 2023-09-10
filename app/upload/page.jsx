"use client";
import Footer from "@/components/Footer";
import { ArrowLeftCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import { Button, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

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
      <img src={URL.createObjectURL(file)} alt={file.path} />
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
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
    // setPrediction(null)
    const formData = new FormData();
    formData.append("file", uploadedPhoto);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://tumor-scan-api.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      // Handle the response containing the predictions
      console.log(response.json());
      const { class1, prob1 } = await response.json();
      console.log(class1, prob1);
      setPrediction({ class1, prob1 });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="min-h-screen relative flex flex-col justify-between pt-16">
      <Link
        href="/"
        className="p-3 absolute top-10 z-20 left-8 md:left-10 rounded-full bg-indigo-500 text-slate-100"
      >
        <ArrowLeftCircleIcon size={32} />
      </Link>
      <h1 className="dark:text-white text-stone-500 font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] my-8 text-center">
        <Translate>Upload an image</Translate>
      </h1>
      {/* <Breadcrumb /> */}
      <div className="text-center max-w-sm min-h-44 mx-auto py-16">
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
              <h4>Files</h4>
              <ul>{files}</ul>
              <Button
                disabled={loading}
                onClick={handleRemoveFiles}
                className="m-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                <Translate>Cancel</Translate>
              </Button>
              <Button
                disabled={loading}
                onClick={sendImageForPrediction}
                className="m-2 bg-green-400 text-white px-4 py-2 rounded"
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
          <motion.div
            className="py-8"
            variants={fadeIn("up", "spring", 0.3, 1)}
          >
            <h4 className="dark:text-white text-stone-500 font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px] my-8 text-center">
              <Translate>Results</Translate>
            </h4>
            <p>
              There is a <span className="font-bold">{prediction.prob1}</span>{" "}
              Probability That the patient has{" "}
              <span className="font-bold">{prediction.class1}</span>{" "}
            </p>
          </motion.div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default UploadPage;
