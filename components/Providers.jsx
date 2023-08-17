"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "translate-easy";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {

  return (
   
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
        <ToastContainer
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        toastClassName="dark:bg-stone-800 dark:text-green-100"
      />
        {children}
        </LanguageProvider>

      </ThemeProvider>
    
  );
};
export default Providers;
