'use client'
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
    const [showNotification, setShowNotification] = useState(true);
    const [hideFutureNotifications, setHideFutureNotifications] = useState(false);

    useEffect(() => {
        // Check local storage if user chose to hide future notifications
        if (isLocalStorageSupported()) {
            const hideNotifications = localStorage.getItem("hideNotifications");
            if (hideNotifications) {
                setShowNotification(hideNotifications === "false" ? true : false);
                setHideFutureNotifications(hideNotifications === "false" ? false : true);
            }
        }
    }, []);

    const handleClose = () => {
        setShowNotification(false);

        // Save user preference to local storage
        if (isLocalStorageSupported()) {
            localStorage.setItem("hideNotifications", hideFutureNotifications.toString());
        }
    };

    return (
        <div>
            {showNotification && (
                <div className="fixed inset-x-0 top-12 md:top-20 z-20 p-4 bg-yellow-500">
                    <div className="max-w-screen-lg mx-auto">
                        <div className="flex flex-wrap gap-3 md:gap-0 justify-between items-center">
                            <div className="text-white">
                                <p className="font-semibold"><Translate>Website under development</Translate></p>
                                <p className="text-sm"><Translate>There may be some issues and bugs</Translate>.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={hideFutureNotifications}
                                    onChange={() => setHideFutureNotifications(!hideFutureNotifications)}
                                />
                                <label htmlFor="hide" className="text-white text-sm">
                                    <Translate>Don&apos;t show this next time</Translate>
                                </label>
                                <button
                                    onClick={handleClose}
                                    className="bg-white px-3 py-1 rounded shadow text-yellow-500 font-semibold hover:bg-gray-100"
                                >
                                    <Translate>Close</Translate>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DevelopmentNotification;
