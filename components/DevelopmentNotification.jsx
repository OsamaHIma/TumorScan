"use client";
import React, { useEffect, useState } from "react";
import { Translate } from "translate-easy";

// Helper function to check if local storage is supported
function isLocalStorageSupported() {
  try {
    const testValue = "test";
    localStorage.setItem(testValue, testValue);
    localStorage.removeItem(testValue);
    return true;
  } catch (e) {
    return false;
  }
}

const DevelopmentNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [hideFutureNotifications, setHideFutureNotifications] = useState(false);

  useEffect(() => {
    // Check local storage if user chose to hide future notifications
    if (isLocalStorageSupported()) {
      const hideNotifications = localStorage.getItem("hideNotifications");
      if (hideNotifications) {
        setShowNotification(hideNotifications === "false" ? true : false);
        setHideFutureNotifications(
          hideNotifications === "false" ? false : true
        );
      } else {
        setShowNotification(true);
      }
    }
  }, []);

  const handleClose = () => {
    setShowNotification(false);

    // Save user preference to local storage
    if (isLocalStorageSupported()) {
      localStorage.setItem(
        "hideNotifications",
        hideFutureNotifications.toString()
      );
    }
  };

  return (
    <>
      {showNotification && (
        // <div className="fixed inset-x-0 top-12 md:top-20 z-20 p-4 bg-yellow-500">
        //   <div className="max-w-screen-lg mx-auto">
        //     <div className="flex flex-wrap gap-3 md:gap-0 justify-between items-center">
        //       <div className="text-white">
        //         <p className="font-semibold">
        //           <Translate>Website under development</Translate>
        //         </p>
        //         <p className="text-sm">
        //           <Translate>There may be some issues and bugs</Translate>.
        //         </p>
        //       </div>
        //       <div className="flex items-center space-x-2">
        //         <input
        //           type="checkbox"
        //           checked={hideFutureNotifications}
        //           onChange={() =>
        //             setHideFutureNotifications(!hideFutureNotifications)
        //           }
        //         />
        //         <label htmlFor="hide" className="text-white text-sm">
        //           <Translate>Don&apos;t show this next time</Translate>
        //         </label>
        //         <Button
        //           onClick={handleClose}
        //           className="bg-white px-3 py-1 rounded shadow text-yellow-500 font-semibold hover:bg-gray-100"
        //         >
        //           <Translate>Close</Translate>
        //         </Button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div
          id="sticky-banner"
          tabIndex="-1"
          className="fixed top-12 md:top-20 left-0 z-20 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div className="flex items-center mx-auto">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <span className="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center">
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path d="M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z" />
                </svg>
                <span className="sr-only">Light bulb</span>
              </span>
              <p className="font-semibold">
                <Translate>Website under development</Translate>
              </p>
              <p className="text-sm">
                <Translate>There may be some issues and bugs</Translate>.
              </p>
            </p>
          </div>
          <div className="flex items-center">
            <div className="check-box mx-2 flex items-center gap-3">
              <input
                type="checkbox"
                checked={hideFutureNotifications}
                onChange={() =>
                  setHideFutureNotifications(!hideFutureNotifications)
                }
              />
              <label htmlFor="hide" className="text-white text-sm">
                <Translate>Don&apos;t show this next time</Translate>
              </label>
            </div>
            <Button
              onClick={handleClose}
              type="button"
              className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close banner</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DevelopmentNotification;
