import React from "react";

const ScreenWidth = () => {
  return (
    <div className="absolute bottom-0 left-0 rounded-full p-2 h-max w-max  bg-stone-900 text-white  m-4 flex justify-center items-center">
      <div className="2xl:block hidden">2xl</div>
      <div className="2xl:hidden xl:block hidden">xl</div>
      <div className="2xl:hidden xl:hidden lg:block hidden ">lg</div>
      <div className="2xl:hidden xl:hidden lg:hidden md:block  hidden">md</div>
      <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:block hidden ">
        sm
      </div>
      <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden block  ">
        ..
      </div>
    </div>
  );
};

export default ScreenWidth;
