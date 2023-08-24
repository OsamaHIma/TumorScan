import Sponsors from "@/home/Sponsors";
import Footer from "@/home/Footer";
import GetStarted from "@/home/GetStarted";
import Navbar from "@/components/Navbar";
import Hero from "@/home/Hero";
import HowItWorks from "@/home/HowItWorks";
import AboutUs from "@/home/AboutUs";
import DevelopmentNotification from "@/components/DevelopmentNotification";
import Comments from "@/home/Comments";

const Home = () => {
  return (
    <main className="relative overflow-x-clip">
      <section className="relative ">
        <div className="gradient absolute left-[100px] h-80 w-80 bg-black/20 blur-[100px] dark:bg-white/10" />
        <DevelopmentNotification />
        <Navbar />
        <Hero />
        <Sponsors />
        <AboutUs />

        <div className="gradient absolute -top-24 right-[100px] h-80 w-80 bg-indigo-600/30 blur-[100px]" />
        <HowItWorks />

        <GetStarted />
        <div className="gradient absolute top-[40%] -z-[2] left-[40%] h-96 w-96 bg-orange-400/30 blur-[100px]" />
        {/* <div className="gradient absolute bottom-0 -z-[2] left-0 h-80 w-80 bg-indigo-500/30 blur-[100px]" /> */}
        <Comments />
        <footer>
          <Footer />
        </footer>
      </section>
    </main>
  );
};
export default Home;
