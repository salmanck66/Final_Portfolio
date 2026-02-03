import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";

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

      <ul className="hidden md:flex z-50 gap-6">
        {["About", "Portfolio", "Experience"].map((item) => (
          <li key={item} className="relative group p-5">
            <Link
              to={item.toLowerCase()}
              smooth={true}
              offset={50}
              duration={500}
              className="text-xl font-medium transition-colors duration-300 hover:text-white cursor-pointer"
            >
              {item}
            </Link>
            <span className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#7a0d8a] via-[#c92085] to-[#c68109] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded-full"></span>
          </li>
        ))}

        <li className="p-5">
          <Link
            to="contact"
            smooth={true}
            offset={50}
            duration={500}
            className="font-bold px-6 py-2 rounded-xl bg-primary-color text-white transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            Contact
          </Link>
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
          {["About", "Portfolio", "Experience"].map((item) => (
            <li key={item} className="p-2">
              <Link
                to={item.toLowerCase()}
                smooth={true}
                offset={50}
                duration={500}
                onClick={closeMenu}
                className="hover:text-primary-color transition-colors duration-300 block cursor-pointer"
              >
                {item}
              </Link>
            </li>
          ))}
          <li className="p-2 mt-4">
            <Link
              to="contact"
              smooth={true}
              offset={50}
              duration={500}
              onClick={closeMenu}
              className="inline-block px-6 py-3 rounded-xl bg-primary-color text-white font-bold transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
