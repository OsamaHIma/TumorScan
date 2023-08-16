import "./globals.scss";
import { Poppins } from "next/font/google";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "Refilex Software Company | Web & Mobile App Development",
  description:
    "Refilex, a software development company based in Egypt that offers web and mobile app development, website development, e-commerce development, web hosting, and server security services",
  keywords:
    "software development, web development, mobile app development, website development, e-commerce development, web hosting, server security, Egypt",
  author: "Refilex Software Company",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "Refilex Software Company | Web & Mobile App Development",
  ogDescription:
    "Refilex, a software development company based in Egypt that offers web and mobile app development, website development, e-commerce development, web hosting, and server security services",
  ogImage: "./opengraph-image.png",
  twitterTitle: "Refilex Software Company | Web & Mobile App Development",
  twitterDescription:
    "Refilex, a software development company based in Egypt that offers web and mobile app development, website development, e-commerce development, web hosting, and server security services",
  twitterImage: "./opengraph-image.png",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://refilex.com/wp-content/uploads/2022/04/profile@300x.png"
        />
      </head>
      <body className={`${poppins.className} transition-all ease-in`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
