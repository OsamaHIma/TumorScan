import "./globals.scss";
import Providers from "@/components/Providers";


export const metadata = {
  title: "Tumor Scan | Tumor and cancer AI scanner",
  description: `Tumor Scan - Advanced Cancer Detection and Tumor Analysis
Description: Tumor Scan is a state-of-the-art platform that leverages advanced imaging technology and artificial intelligence algorithms to provide accurate and efficient diagnosis of various types of cancer. Our innovative solutions enable early detection, personalized treatment plans, and enhanced patient care. Experience the future of cancer detection and sign up now for personalized tumor analysis.`,
  keywords:
    "tumor scan, cancer detection, tumor analysis, advanced imaging technology, artificial intelligence, early detection, personalized treatment, patient care, medical image analysis, 3D visualization, diagnosis, treatment options",
  // author: "Refilex Software Company",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Tumor Scan | Tumor and cancer AI scanner",
  ogDescription: `Tumor Scan - Advanced Cancer Detection and Tumor Analysis
Description: Tumor Scan is a state-of-the-art platform that leverages advanced imaging technology and artificial intelligence algorithms to provide accurate and efficient diagnosis of various types of cancer. Our innovative solutions enable early detection, personalized treatment plans, and enhanced patient care. Experience the future of cancer detection and sign up now for personalized tumor analysis.`,
  ogImage: "./opengraph-image.png",
  twitterTitle: "Tumor Scan | Tumor and cancer AI scanner",
  twitterDescription: `Tumor Scan - Advanced Cancer Detection and Tumor Analysis
Description: Tumor Scan is a state-of-the-art platform that leverages advanced imaging technology and artificial intelligence algorithms to provide accurate and efficient diagnosis of various types of cancer. Our innovative solutions enable early detection, personalized treatment plans, and enhanced patient care. Experience the future of cancer detection and sign up now for personalized tumor analysis.`,
  twitterImage: "./opengraph-image.png",
  
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/logoTab.svg" />
      </head>
      <body
        className={`ltr:!font-poppins rtl:!font-cairo bg-stone-200 dark:bg-primary-black text-stone-800 dark:text-stone-200 transition-all ease-in-out`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
