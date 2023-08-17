'use client'
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import Link from "next/link";
import { Translate } from "translate-easy";

const Footer = () => {
  return (
    <section>
      <div className="paddings innerWidth flexCenter  f-container md:!justify-between">
        <div className="flexColStart f-left !items-center gap-4 text-center md:!items-start md:!text-left">
          <Link href="/" className="rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent">
            <Image src="/logo.svg" alt="logo" width={153} height={153} />
          </Link>
          <h3 className="secondaryText rtl:text-right">
        <Translate>We are always available around the clock to answer your questions</Translate>.
          <br/>
          <Translate>So, please feel free to contact us</Translate>.
          </h3>
        </div>
        <div className="flexColStart f-right !items-center text-center">
          <span className="primaryText dark:text-indigo-500">Information</span>
          {/* <a href="https://www.google.com/maps?ll=30.05016,31.202757&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=3975772482927079619" target="_blank" className="secondaryText">21 Fawakeh Dokki, Cairo, Egypt</a> */}
          <p className="secondaryText"><Translate>Made with 💙 in Egypt</Translate></p>
         <SocialIcons/>
        </div>
      </div>
    </section>
  );
};

export default Footer;
