import React from "react";
import project1 from "../assets/project1.png";
import project3 from "../assets/project7.png";
import {
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiHtml5,
  DiCss3,
  DiSass,
  DiBootstrap,
} from "react-icons/di";

const About = () => {
  return (
    <div
      className="max-w-[1000px] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center md:py-24"
      id="about"
    >
      <div className="p-6">
        <h2 className="text-gray-200 text-3xl font-bold mb-4">Highlight</h2>
        <p className="text-gray-300 mb-4">
        MERN stack developer with extensive experience in building scalable and high-performance web applications. 
          My portfolio includes a fully functional e-commerce store hosted on AWS EC2 with Nginx and Cloudflare, a full-stack chat application in the MERN stack, 
          and over 40 mini projects that demonstrate my expertise in modern web development.
        </p>

      </div>

    </div>
  );
};

export default About;
