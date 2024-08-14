import React, { useState, useRef } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import project8 from "../assets/project8.png";
import project9 from "../assets/project9.png";
import arrow from "../assets/arrow.png";

const projects = [
  {
    img: project3,
    title: "Ecommerce Website - jcclub.shop",
    description: "A complete ecommerce website made with NodeJs, Express, MongoDB and HBS",
    links: {
      site: "https://www.jcclub.shop",
      github: "https://github.com/salmanck66/Ecommerce-Project-",
    },
  },
  {
    img: project1,
    title: "Kanban ToDo App",
    description: "Kanban style drag and drop todo app built with ReactJS and TailwindCSS with progress statuses",
    links: {
      site: "https://kanban-to-do-tasks-drag-and-drop.vercel.app/",
      github: "https://github.com/salmanck66/Kanban_To_Do_Tasks_Drag_And_Drop",
    },
  },
  {
    img: project2,
    title: "Seat Reservation App",
    description: "A minimalist seat reservation app built with ReactJS and TailwindCSS that can be extended with multiple features",
    links: {
      site: "https://seminar-hall-seat-resevation-app.vercel.app/",
      github: "https://github.com/salmanck66/Seminar-Hall-Seat-Resevation-App",
    },
  },
  {
    img: project4,
    title: "User Management Tool",
    description: "A simple user management tool using React and Redux as state management to demonstrate CRUD operations and Redux Toolkit",
    links: {
      site: "https://user-details-management-react-redux.vercel.app/",
      github: "https://github.com/salmanck66/User_Details_Management_React_Redux",
    },
  },
  {
    img: project5,
    title: "Javascript Quiz App",
    description: "A simple Javascript app using vanilla javascript, data persistence using LocalStorage",
    links: {
      site: "https://javascript-quiz-app-react.vercel.app/",
      github: "https://github.com/salmanck66/Javascript-Quiz-App-React",
    },
  },
  {
    img: project6,
    title: "Keyboard Clone",
    description: "A simple keyboard and a section to visualize how it functions, made with React",
    links: {
      site: "https://keyboard-react-one.vercel.app/",
      github: "https://github.com/salmanck66/Keyboard_React",
    },
  },
  {
    img: project8,
    title: "Post Scheduler",
    description: "An app made for scheduling posts based on date and time or instant post, made with React",
    links: {
      site: "https://post-scheduler-lyart.vercel.app/",
      github: "https://github.com/salmanck66/Post-Scheduler",
    },
  },
  {
    img: project9,
    title: "Stop Watch",
    description: "A simple and stylish stop watch made using ReactJS and styled with TailwindCSS, responsive design",
    links: {
      site: "https://stop-watch-react-js-six.vercel.app/",
      github: "https://github.com/salmanck66/StopWatch-ReactJs",
    },
  },
];

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const projectInfoRef = useRef(null);

  const handleProjectClick = (index) => {
    setCurrentProject(index);
    if (window.innerWidth < 768 && projectInfoRef.current) {
      projectInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='my-6 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:py-40' id="portfolio">
      <div className='col-span-1 md:col-span-1 grid place-items-center relative'>
        <p className='text-gray-200 font-bold text-4xl -skew-y-6 '>Select Project</p>
        <img src={arrow} className='absolute w-[50px] top-10 right-12 ' alt="Arrow" />
        <ul className='ml-6 flex flex-row mt-14 md:flex-col gap-6 flex-wrap justify-center md:gap-1 space-y-2 sm:mt-8 md:space-y-4 text-2xl'>
          {projects.map((project, index) => (
            <li
              key={index}
              onClick={() => handleProjectClick(index)}
              className={`cursor-pointer text-gray-300 rounded-lg px-2 hover:bg-slate-600 transition duration-300 ${currentProject === index ? 'active-project' : ''}`}
            >
              {project.title}
            </li>
          ))}
        </ul>
      </div>

      <div className='col-span-2 md:col-span-2' ref={projectInfoRef}>
        <div className='glass border-2 w-full'>
          <div className='w-full h-80'>
            <img src={projects[currentProject].img} alt={projects[currentProject].title} className='w-full h-full object-cover rounded-lg mb-4' />
          </div>
          <div className='p-6'>
            <p className='text-gray-200 my-4'>
              {projects[currentProject].description}
            </p>
            <div className='flex space-x-4'>
              <a href={projects[currentProject].links.site} className='px-4 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'>View Site</a>
              <a href={projects[currentProject].links.github} className='px-4 py-2 bg-gray-800 text-gray-200 text-2xl rounded-lg hover:bg-gray-600 transition duration-300'>
                <AiFillGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
