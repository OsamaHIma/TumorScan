const GetStarted = () => {
  return (
    <section className="paddings innerWidth" id="get-started">
      <div className="flexColCenter w-full gap-6 rounded-md border-4 border-indigo-700 bg-indigo-600 px-6 py-10 text-center md:px-0">
        <h1 className="text-xl font-semibold text-white md:text-4xl">
          Get started with Tumor scanner
        </h1>
        <p className="text-gray-300">
          Efficient diagnosis of various types of cancer for free.
        </p>

        <button className="btn border-2 border-gray-50 bg-white/20 font-normal">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default GetStarted;
