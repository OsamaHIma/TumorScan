import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import Link from "next/link";

const Footer = () => {
  return (
    <section>
      <div className="paddings innerWidth flexCenter  f-container md:!justify-between">
        <div className="flexColStart f-left !items-center gap-4 text-center md:!items-start md:!text-left">
          <Link href="/" className="rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent">
            <Image src="/logo.svg" alt="logo" width={133} height={133} />
          </Link>
          <h3 className="secondaryText">
          We are always available around the clock to answer your inquiries.
          <br/>
          So, please feel free to contact us.
          </h3>
        </div>
        <div className="flexColStart f-right !items-center text-center">
          <span className="primaryText dark:text-indigo-500">Information</span>
          <a href="https://www.google.com/maps?ll=30.05016,31.202757&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=3975772482927079619" target="_blank" className="secondaryText">21 Fawakeh Dokki, Cairo, Egypt</a>
         <SocialIcons/>
        </div>
      </div>
    </section>
  );
};

export default Footer;
