import Sponsors from "@/home/Sponsors";
import Footer from "@/components/Footer";
import GetStarted from "@/home/GetStarted";
import Navbar from "@/components/Navbar";
import Hero from "@/home/Hero";
import HowItWorks from "@/home/HowItWorks";
import AboutUs from "@/home/AboutUs";
import DevelopmentNotification from "@/components/DevelopmentNotification";
import Comments from "@/home/Comments";
import OurTeam from "@/home/OurTeam";

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
        <OurTeam />
        <Comments />
        <footer>
          <Footer />
        </footer>
      </section>
    </main>
  );
};
export default Home;
