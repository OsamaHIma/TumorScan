"use client";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import Link from "next/link";
import { Translate } from "translate-easy";
import { motion } from "framer-motion";
import { useState } from "react";
import { XIcon } from "lucide-react";

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const handlePrivacyClick = () => {
    setShowPrivacyModal(true);
  };
  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };
  return (
    // <section>
    //   <div className="paddings innerWidth flexCenter relative container md:!justify-between">
    //   <div className="bg-gradient-to-t from-orange-400/30 to-transparent dark:from-indigo-600/30 w-full h-full absolute bottom-0 left-0 -z-10"></div>

    //     <div className="flexColStart f-left !items-center gap-4 text-center md:!items-start md:!text-left">
    //       <Link href="/" className="rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent">
    //         <Image src="/logo.svg" alt="logo" width={153} height={153} />
    //       </Link>
    //       <h3 className="secondaryText rtl:text-right">
    //     <Translate>We are always available around the clock to answer your questions</Translate>.
    //       <br/>
    //       <Translate>So, please feel free to contact us</Translate>.
    //       </h3>
    //     </div>
    //     <div className="flexColStart f-right !items-center text-center">
    //       <span className="primaryText dark:text-indigo-300">Information</span>
    //       {/* <Link href="https://www.google.com/maps?ll=30.05016,31.202757&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=3975772482927079619" target="_blank" className="secondaryText">21 Fawakeh Dokki, Cairo, Egypt</Link> */}
    //       <p className="secondaryText"><Translate>Made with 💙 in Egypt</Translate></p>
    //      <SocialIcons/>
    //     </div>
    //   </div>
    // </section>

    <footer className="relative py-3 bg-indigo-200 dark:bg-stone-800">
      <div className="bg-gradient-to-b from-stone-200 to-transparent dark:from-primary-black w-full h-44 absolute -top-4 left-0"></div>

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                className="rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent"
                width={153}
                height={153}
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 z-10">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Hot links</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/upload" className="hover:underline">
                    <Translate>Upload</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <Translate>Dashboard</Translate>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Follow us</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://github.com/osamaHIma"
                    className="hover:underline "
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Legal</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li
                  className="mb-4 hover:underline cursor-pointer"
                  onClick={handlePrivacyClick}
                >
                  <Translate>Privacy Policy</Translate>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <Translate>Terms &amp; Conditions</Translate>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="https://flowbite.com/" className="hover:underline">
              Tumor Scan™
            </Link>
            . <Translate>All Rights Reserved</Translate>.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
      {showPrivacyModal && (
        <motion.div
          className="absolute -top-32 flex items-center justify-center z-50 max-w-3xl md:ml-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ol className="bg-stone-100 list-decimal dark:bg-stone-900 rounded-lg shadow-lg p-6 overflow-y-auto max-h-96">
            <h2 className="text-lg font-bold mb-4">
              <Translate>Privacy Policy</Translate>
            </h2>
            <p className="my-3">
              <Translate>
                At &quot;Tumor Scan&quot;, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy outlines how we collect, use, and safeguard the
                information you provide to us through our website
              </Translate>
              .
            </p>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Information Collection</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We may collect personal information, such as your name, email
                address, and phone number, when you sign up for our services or
                interact with our website
              </Translate>
              .
            </li>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Information Usage</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We use the collected information to provide and improve our
                services, communicate with you, and personalize your experience
                on our website
              </Translate>
              .
            </li>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Information Sharing</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We do not sell, rent, or lease your personal information to
                third parties. However, we may share your information with
                trusted service providers who assist us in operating our website
                and providing the requested services
              </Translate>
              .
            </li>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Security</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We implement security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction
              </Translate>
              .
            </li>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Third-Party Links</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                websites. We encourage you to review the privacy policies of
                those websites
              </Translate>
              .
            </li>
            <li className="my-3">
              <strong className="text-indigo-300">
                <Translate>Changes to the Privacy Policy</Translate>:
              </strong>
              <br />{" "}
              <Translate>
                We may update or modify this Privacy Policy from time to time.
                We will notify you of any changes by posting the revised policy
                on our website
              </Translate>
              .
            </li>
            <p className="my-3">
              <Translate>
                By using the &quot;Tumor Scan&quot; website and providing your personal
                information, you consent to the collection, use, and disclosure
                of your information as described in this Privacy Policy
              </Translate>
              .
            </p>
            <button
              className="btn bg-blue-600 my-3"
              onClick={closePrivacyModal}
            >
              <Translate>Close</Translate>
            </button>
          </ol>
        </motion.div>
      )}
    </footer>
  );
};

export default Footer;
