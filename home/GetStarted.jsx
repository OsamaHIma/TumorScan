"use client";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { Translate } from "translate-easy";

const GetStarted = () => {
  return (
    <section className="paddings innerWidth" id="get-started">
      <div className="flexColCenter w-full gap-6 rounded-md border-4 border-indigo-700 bg-indigo-600 px-6 py-10 text-center md:px-0">
        <h1 className="text-xl font-semibold text-white md:text-4xl">
          <Translate>Get started with</Translate> Tumor scan
        </h1>
        <p className="text-gray-300">
          <Translate>
            Efficient diagnosis of various types of cancer for free
          </Translate>
          .
        </p>{" "}
        <Link href="/upload">
          <Button variant="outlined" className="border-gray-300 text-stone-200 py-4" >
            <Translate>Give it a try</Translate>!
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
