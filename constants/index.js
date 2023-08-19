import {
  BarChart2Icon,
  ShieldCheck,
  XCircleIcon,
  MessageSquare,
  PhoneCallIcon,
  VideoIcon,
  Smartphone,
  Globe,
  ShoppingBag,
  Shield,
  Server,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  MessagesSquare,
} from "lucide-react";

export const navLinks = [
  {
    id: "#about-us",
    name: "About Us",
  },
  {
    id: "#how-it-works",
    name: "How It Works",
  },
  {
    id: "/contact",
    name: "Contact Us",
  },
];

export const companiesSliderSittings = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 20,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const socialIcons = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    url: "https://www.facebook.com/RefilexOfficial/",
  },
  {
    name: "Linkedin",
    icon: <LinkedinIcon />,
    url: "https://www.linkedin.com/company/refilex",
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    url: "https://www.twitter.com/RefilexOfficial/",
  },
  {
    name: "Linkedin",
    icon: <InstagramIcon />,
    url: "https://www.instagram.com/RefilexOfficial/",
  },
  {
    name: "Github",
    icon: <GithubIcon />,
    url: "https://github.com/refilex",
  },
];

export const services = [
  {
    title: "Mobile Apps Design and Development",
    description:
      "Our highly skilled and creative team helps you make your ideas come true into a vivid and attractive image in the form of a seamless app compatible with all devices as Android and the iPhone.",
    image: "/mobile-apps-design-and-development.png",
    icon: <Smartphone className="inline h-8 w-8 text-indigo-500" />,
  },
  {
    title: "Website Development",
    description:
      "We help you to create an integrated, attractive, easy-to-browse website that is so appropriate to the nature of your business that it reflects your activity in a distinctive and targeted way, and makes you achieve your goals by helping you to appear in the first results of search engines.",
    image: "/website-development.png",
    icon: <Globe className="inline h-8 w-8 text-indigo-500" />,
  },
  {
    title: "E-Commerce Development",
    description:
      "Refilex helps you create e-stores with the latest technologies and global e-commerce platforms, by empowering you with many features such as e-commerce platforms and linking them to various payment methods in addition to helping you study and analyze the market to reach your target customers and achieve the desired outcomes.",
    image: "/ecommerce-development.png",
    icon: <ShoppingBag className="inline h-8 w-8 text-indigo-500" />,
  },
  {
    title: "Web Hosting",
    description:
      "Refilex helps you create e-stores with the latest technologies and global e-commerce platforms, by empowering you with many features such as e-commerce platforms and linking them to various payment methods in addition to helping you study and analyze the market to reach your target customers and achieve the desired outcomes.",
    image: "/web-hosting.png",
    icon: <Server className="inline h-8 w-8 text-indigo-500" />,
  },
  {
    title: "Server Security",
    description:
      "We are a unique entity that has a group of network and server security experts, who work around the clock to manage, secure, and protect your servers in accordance with the specifications of each server and the requirements of the hosted websites, in addition to following up on daily updates of exploits and solving it on an ongoing basis, as well as implementing the proper maintenance procedures for databases.",
    image: "/server-security.png",
    icon: <Shield className="inline h-8 w-8 text-indigo-500" />,
  },
];
export const aboutUsCards = [
  {
    title: "Description",
    description:
      "We leverage state-of-the-art imaging technology and advanced algorithms to provide accurate and efficient diagnosis of various types of cancer, including brain tumors, lung cancer, and more.",
    image: "/about us brain.jpg",
  },
  {
    title: "Our mission",
    description:
      "Our mission is to enable early detection, personalized treatment plans, and enhanced patient care through innovative solutions.",
    image: "/ourMession.jpg",
  },
];
