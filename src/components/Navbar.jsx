import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeMenu = () => {
    setNav(false);
  };

  return (
    <div
      className="text-gray-200 flex justify-between items-center max-w-[1240px]
         mx-auto h-24 px-4 text-l"
    >
      <h1 className="text-xl sm:text-3xl font-bold ml-4 sm:hover:text-4xl animate-scale duration-300 ease-in-out cursor-pointer text-neutral-200">
        SALMANUL FARIS CK
      </h1>

      <ul className="hidden md:flex z-50">
        <li className="p-5">
          <a href="#about">About</a>
        </li>
        <li className="p-5">
          <a href="#portfolio">Portfolio</a>
        </li>
        <li className="p-5">
          <a
            href="#contact"
            className="font-bold px-4 py-2 
                rounded-xl bg-primary-color"
          >
            Contact
          </a>
        </li>
      </ul>

      <div onClick={handleNav} className="z-50 block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? "z-50 text-gray-300 fixed h-full left-0 top-0 w-[60%] border-r border-r-gray-900 bg-[#202121] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="text-3xl primary-color m-4">SALMANUL FARIS CK</h1>
        <ul className="p-8 text-2xl">
          <li className="p-2">
            <a href="#about" onClick={closeMenu}>About</a>
          </li>
          <li className="p-2">
            <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
          </li>
          <li className="p-2">
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
