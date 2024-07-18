import React, {useState} from 'react'
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import project8 from "../assets/project8.png";
import project9 from "../assets/project9.png";
import arrow from "../assets/arrow.png";
import { AiFillGithub } from 'react-icons/ai'
import ShinyEffect from './ShinyEffect';

const projects = [
  {
    img: project3,
    title: "Ecommerce Webiste - jcclub.shop",
    description: "A complete ecommerce website made with NodeJs,Express,MongoDB and HBS",
    links: {
      site: "wwww.jcclub.shop",
      github: "https://github.com/salmanck66/Ecommerce-Project-",
    },
  },
  {
    img: project1,
        title: "Kanban ToDo App ",
        description:
          "Kanban style drag and drop todo app built with reactJS and tailwindCSS with progress statuses",
        links: {
          site: "https://kanban-to-do-tasks-drag-and-drop.vercel.app/",
          github: "https://github.com/salmanck66/Kanban_To_Do_Tasks_Drag_And_Drop",
        },
      },
      {
        img: project2,
        title: "Seat Resevervation App",
        description: "A minimalist seat reservation app built with ReactJS and TailwindCSS that can be extended with multiple features",
        links: {
          site: "https://seminar-hall-seat-resevation-app.vercel.app/",
          github: "https://github.com/salmanck66/Seminar-Hall-Seat-Resevation-App",
        },
      },
      {
        img: project4,
        title: "User Management Tool",
        description:
          "A simple user management tool using react and redux as state management tool to demonstate CRUD operations and redux toolkit",
        links: {
          site: "https://user-details-management-react-redux.vercel.app/",
          github: "https://github.com/salmanck66/User_Details_Management_React_Redux",
        },
      },
      {
        img: project5,
        title: "Javascript Quiz App",
        description: "A simple Javascript app using vanilla javascript,Data persistance using LocalStorage",
        links: {
          site: "https://javascript-quiz-app-react.vercel.app/",
          github: "https://github.com/salmanck66/Javascript-Quiz-App-React",
        },
      },
      {
        img: project6,
        title: "Keyboard Clone",
        description:
          "A simple keyboard and a section to visualize how it functions , made with react ",
        links: {
          site: "https://keyboard-react-one.vercel.app/",
          github: "https://github.com/salmanck66/Keyboard_React",
        },
      },
      {
        img: project8,
        title: "Post scheduler",
        description:
          "An app made for scheduling posts based on date and time or instant post made with react ",
        links: {
          site: "https://post-scheduler-lyart.vercel.app/",
          github: "https://github.com/salmanck66/Post-Scheduler",
        },
      },
      {
        img: project9,
        title: "Stop Watch",
        description:
          "A simple and stylish stop watch made using reactJs and styles and made responsive in tailwindCSS ",
        links: {
          site: "https://stop-watch-react-js-six.vercel.app/",
          github: "https://github.com/salmanck66/StopWatch-ReactJs",
        },
      }
]

const Portfolio = () => {
    const [currentProject, setCurrentProject] = useState(0)

  return (
<div className='my-6 max-w-[1200px] mx-auto grid flex-wrap grid-cols-8 gap-6 md:py-40' id="portfolio">
<div className='z-10 col-span-3 grid place-items-center grid-cols-1 relative'>
  <p className='text-gray-200 font-bold text-4xl -skew-y-6 '>Select Project</p>
  <img src={arrow} className='absolute w-[50px] top-10 right-12' />

  <ul className='ml-6 flex flex-row md:flex-col gap-6 flex-wrap justify-center md:gap-1
   space-y-2 md:space-y-4 text-2xl'>
    {projects.map((project, index) => (
      <li
        key={index}
        onClick={() => setCurrentProject(index)}
        className={`cursor-pointer text-gray-300 rounded-lg px-2 hover:bg-slate-600
         transition duration-300 ${
          currentProject === index ? 'active-project' : ''
        }`}
      >
        {project.title}
      </li>
    ))}
  </ul>
</div>

        <div className='z-10 glass  w-full border-2 col-span-5'>
            <div className='w-full h-80'>
                <img src={projects[currentProject].img} alt={projects[currentProject].title} 
                className='w-full h-full object-cover rounded-lg mb-4'/>
            </div>
            <div className='p-6'>
              <p className='text-gray-200 my-4'>
                  {projects[currentProject].description}
              </p>
              <div className='flex space-x-4'>
                  <a href={projects[currentProject].links.site} className='px-4 py-2 bg-slate-600
                   text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'>View Site</a>
                  <a href={projects[currentProject].links.github} className='px-4 py-2 bg-gray-800
                   text-gray-200 text-2xl rounded-lg hover:bg-gray-600 transition duration-300'>
                    <AiFillGithub/>
                    </a>
              </div>
            </div>
            
        </div>


    </div>
  )
}

export default Portfolio