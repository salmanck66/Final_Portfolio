import React from 'react'
import project1 from '../assets/project1.png'
import project3 from '../assets/project7.png'
import {
    DiJavascript1,
    DiReact,
    DiNodejsSmall,
    DiHtml5,
    DiCss3,
    DiSass,
    DiBootstrap
} from 'react-icons/di'

const About = () => {
  return (
    <div className='max-w-[1000px] mx-auto p-6 grid grid-cols-2 gap-8 place-items-center md:py-52' id="about">

<div className='p-6'>
            <h2 className='text-gray-200 text-3xl font-bold mb-4'>Skills</h2>
            <p className='text-gray-300 mb-4'>
                As a passionate web front-end developer with over 5 years of
                experience, I have a proven track record of creating visually
                stunning and responsive websites.
            </p>
            <div className='md:flex flex-wrap gap-4 text-4xl justify-center hidden'>
                <DiHtml5 className="text-orange-600" />
                <DiCss3 className="text-blue-600" />
                <DiSass className="text-pink-600" />
                <DiBootstrap className="text-purple-600" />
                <DiJavascript1 className="text-yellow-500" />
                <DiReact className="text-blue-500" />
                <DiNodejsSmall className="text-green-500" />
            </div>

        </div>



        <div className='relative group'>
            <div className='w-full h-full absolute -inset-1 bg-gradient-to-r from-purple-100
             to-orange-900 rounded-lg
            blur opacity-25 group-hover:opacity-100 transition duration-300'></div>
            <div className='relative w-full p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg'>
                <img src={project1} alt="project 1" className='rounded-lg md:max-w-[500px]' />
            </div>
        </div>





        <div className='p-6'>
            <h2 className='text-gray-200 text-3xl font-bold mb-4'>Frontend Experience</h2>
            <p className='text-gray-300 mb-4'>
                Experienced in creating modern, responsive web applications using
                the latest frontend technologies.
            </p>

        </div>



        <div className='relative group'>
            <div className='w-full h-full absolute -inset-1 bg-gradient-to-r
             from-purple-100 to-orange-900 rounded-lg
            blur opacity-25 group-hover:opacity-100 transition duration-300'></div>
            <div className='relative w-full p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg'>
                <img src={project3} alt="project 3" className='rounded-lg md:max-w-[500px]' />
            </div>
        </div>






        
    </div>
  )
}

export default About