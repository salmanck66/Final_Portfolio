import React from "react";
import profilepic from "../assets/ppic.png";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import {
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiHtml5,
  DiCss3,DiGit,
  DiBootstrap,DiMongodb,DiAws,DiJqueryLogo,DiNginx
} from "react-icons/di";
import ShinyEffect from "./ShinyEffect";

const Hero = () => {
  const handleDownloadCV = () => {
    const pdfUrl = '/Salmanul Faris CK-1.pdf'; // Replace with actual PDF URL

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Salmanul Faris CK-1.pdf';

    // Simulate a click on the link to initiate the download
    link.click();
  };
  return (
    <div
      className="max-w-[1200px] mx-auto grid md:grid-cols-8 gap-6 p-10 md:p-0 md:py-40"
      id="home"
    >
      <div className="glass grid grid-cols-2 col-span-1 md:col-span-5  p-8">
        <div className="my-auto">
          <img
            className="w-[800px] mx-auto h-auto  hover:w-[900px] ease-in-out"
            src={profilepic}
            alt="profile pic"
          />
        </div>

        <div className="my-auto  sm:ml-8  flex-col">
          <p className="inset-0 text-2xl md:text-4xl font-bold text-gray-200">
            Hi! I am <br /> Salmanul Faris Ck <br />
            <TypeAnimation
              sequence={["MERN Stack", 1000, "Developer", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <p className="text-xl md:text-3xl font-bold text-gray-500">
            with live project experience
          </p>
          <a href="">
          <button
            className="mt-4 px-4 py-2 text-lg font-bold text-white bg-primary-color rounded-xl"
            onClick={handleDownloadCV}
          >
            Download CV
          </button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1  md:col-span-3 gap-6">
        <div className="text-5xl p-12 glass">
          <p className="text-gray-200 text-xl font-bold mb-4 text-center">
            My Tech Stack
          </p>
          <div className="grid grid-cols-4 gap-4">
            <DiHtml5 className="text-orange-600" />
            <DiCss3 className="text-blue-600" />
            <DiBootstrap className="text-purple-600" />
            <DiJavascript1 className="text-yellow-500" />
            <DiReact className="text-blue-500" />
            <DiNodejsSmall className="text-green-500" />
            <DiMongodb className="text-green-800" />
            <DiGit className="text-orange-800" />
            <DiAws className="text-stone-600" />
            <DiJqueryLogo className="text-blue-800" />
            <DiNginx className="text-green-800" />
          </div>
        </div>

        <div className="flex justify-center items-center flex-col glass">
          <div className="text-7xl flex justify-start gap-4">
            <a
              href="https://www.linkedin.com/in/salmanul-faris-c-k/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <AiFillLinkedin cursor={true} className="text-gray-600" />
            </a>
            <a
              href="https://github.com/salmanck66"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <AiFillGithub className="text-gray-600" />
            </a>
          </div>
        </div>

        <div className="absolute overflow-hidden md:overflow-visible">
          <div className="hidden md:block">
            <ShinyEffect left={550} top={100} size={700} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
