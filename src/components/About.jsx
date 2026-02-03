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
      className="max-w-[1000px] mx-auto p-6 grid  place-items-center md:py-24"
      id="about"
    >
      <div className="p-6">
        <h2 className="text-gray-200 text-3xl font-bold mb-4">What I Do</h2>
        <p className="text-gray-300 mb-4">
        I am a Full Stack Developer with strong expertise in the MERN stack and hands-on experience across multiple modern web technologies. I have built and deployed real-world applications, including a fully functional e-commerce store hosted on AWS EC2 with Nginx and Cloudflare for performance, security, and scalability.

Beyond MERN, I have worked with Next.js, Remix, and Svelte, allowing me to build fast, modern, and highly optimized web applications. I also have practical experience in Shopify app development and WordPress, working closely with real merchants and business needs.
While working at Helixo, I contributed to and managed multiple winning, high-performing apps on the Shopify App Store, gaining strong exposure to SaaS product development, app performance optimization, user feedback handling, and marketplace growth strategies.

        </p>

      </div>

    </div>
  );
};

export default About;
