"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {

  return (
   
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastContainer
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        toastClassName="dark:bg-stone-800 dark:text-green-100"
      />
        {children}
      </ThemeProvider>
    
  );
};
export default Providers;
