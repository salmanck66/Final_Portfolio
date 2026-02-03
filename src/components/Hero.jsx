import React from "react";
import profilepic from "../assets/ppic.png";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import {
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiHtml5,
  DiCss3,
  DiGit,
  DiBootstrap,
  DiMongodb,
  DiAws,
  DiJqueryLogo,
  DiNginx,
} from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";      // Next.js
import { SiRemix, SiSvelte, SiShopify, SiWordpress, SiDocker, SiDigitalocean } from "react-icons/si";
import ShinyEffect from "./ShinyEffect";

const Hero = () => {
  const handleDownloadCV = () => {
    const pdfUrl = "/Salmanul Faris CK-1.pdf"; // Replace with actual PDF URL

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Salmanul Faris CK-1.pdf";

    // Simulate a click on the link to initiate the download
    link.click();
  };
    const TechIcon = ({ children, name, color }) => (
  <div className="icon-wrapper text-5xl">
    <span className={`tech-icon ${color}`}>
      {children}
    </span>
    <span className="tooltip">{name}</span>
  </div>
);

  return (
    <div
      className="max-w-full mx-auto grid md:grid-cols-8 gap-6 p-6 md:py-20"
      id="home"
      style={{ overflowX: "hidden" }}
    >
      <div className="glass grid grid-cols-2 col-span-1 md:col-span-5 p-8">
        <div className="my-auto">
          <img className="mx-auto h-auto" src={profilepic} alt="profile pic" />
        </div>

        <div className="my-auto sm:ml-8 flex-col">
          <p className="text-xl md:text-4xl font-bold text-gray-200">
            Hi! I am <br /> Salmanul Faris Ck <br />
            <TypeAnimation
              sequence={["MERN Stack", 1000, "Developer", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <button
            className="mt-4 px-2 sm:px-4 py-2 text-xs sm:text-lg font-bold text-white bg-primary-color rounded-xl"
            onClick={handleDownloadCV}
          >
            Download CV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:col-span-3 gap-6">
        <div className="text-5xl p-8 md:p-12 glass">
          <p className="text-gray-200 text-xl font-bold mb-4 text-center">
            My Tech Stack
          </p>
<div className="grid grid-cols-4 gap-6 place-items-center">
  <TechIcon name="HTML" color="text-orange-600">
    <DiHtml5 />
  </TechIcon>

  <TechIcon name="CSS" color="text-blue-600">
    <DiCss3 />
  </TechIcon>

  <TechIcon name="Bootstrap" color="text-purple-600">
    <DiBootstrap />
  </TechIcon>

  <TechIcon name="JavaScript" color="text-yellow-500">
    <DiJavascript1 />
  </TechIcon>

  <TechIcon name="React" color="text-blue-500">
    <DiReact />
  </TechIcon>

  <TechIcon name="Node.js" color="text-green-500">
    <DiNodejsSmall />
  </TechIcon>

  <TechIcon name="MongoDB" color="text-green-800">
    <DiMongodb />
  </TechIcon>

  <TechIcon name="Git" color="text-orange-800">
    <DiGit />
  </TechIcon>

  <TechIcon name="AWS" color="text-stone-600">
    <DiAws />
  </TechIcon>

  <TechIcon name="jQuery" color="text-blue-800">
    <DiJqueryLogo />
  </TechIcon>

  <TechIcon name="Nginx" color="text-green-800">
    <DiNginx />
  </TechIcon>

  <TechIcon name="Next.js" color="text-black dark:text-white">
    <RiNextjsFill />
  </TechIcon>

  <TechIcon name="Remix" color="text-blue-500">
    <SiRemix />
  </TechIcon>

  <TechIcon name="Svelte" color="text-orange-500">
    <SiSvelte />
  </TechIcon>

  <TechIcon name="Shopify" color="text-green-600">
    <SiShopify />
  </TechIcon>

  <TechIcon name="WordPress" color="text-blue-700">
    <SiWordpress />
  </TechIcon>

  <TechIcon name="Docker" color="text-blue-500">
    <SiDocker />
  </TechIcon>

  <TechIcon name="DigitalOcean" color="text-blue-400">
    <SiDigitalocean />
  </TechIcon>
</div>

        </div>

        <div className="flex justify-center items-center flex-col glass">
          <div className=" text-7xl flex justify-start gap-6 py-4">
            <a
              href="https://www.linkedin.com/in/salmanul-faris-c-k/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <AiFillLinkedin cursor="true" className="tech-icon text-gray-600" />
            </a>
            <a
              href="https://github.com/salmanck66"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <AiFillGithub className="text-gray-600 tech-icon" />
            </a>
          </div>
        </div>

        {/* <div className="absolute overflow-hidden md:overflow-visible">
          <div className="hidden md:block">
            <ShinyEffect left={550} top={100} size={700} />
          </div>
        </div> */}
      </div>
    </div>
  );

};

export default Hero;
