import Navbar from "@/components/Navbar";
import CustomSidebar from "@/components/sidebar";

const layout = ({ children }) => {
  return (
    <main className={`flex max-w-full`}>
      <CustomSidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default layout;
