import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

const Contact = () => {
  return (
    <div className='px-6 max-w-[1000px] mx-auto  grid md:grid-cols-2 place-items-center' id="contact">



            <div>
                <div className="p-2">
                    <div className="text-gray-300 my-3">
                        <h3 className="text-4xl font-semibold mb-5">About <span>Me</span></h3>
                        <p className="text-justify leading-7 w-11/12 mx-auto">
                        Hello! I'm Salmanul Faris CK,
                        A Full Stack Web Developer specializing in the MERN stack, Proficient in ReactJs and NodeJS, with a strong problemsolving mindset and a collaborative approach. Quick to adapt to new technologies, making me a valuable asset in dynamic web development environments.
                        </p>     
                    </div>
                </div> 
        
            </div>



            <form action="https://getform.io/f/ebpddzvb" method="POST" 
            className=' max-w-6xl p-5 md:p-12' id="form">
                <p className='text-gray-100 font-bold text-xl mb-2'>Let´s connect!</p>
                <input
                    type="text"
                    id="name"
                    placeholder='Your Name ...'
                    name="name"
                    className='mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4'
                />
                <input
                    type="email"
                    id="email"
                    placeholder='Your Email ...'
                    name="email"
                    className='mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4'
                />
                <textarea
                    name="textarea"
                    id="textarea"
                    cols="30"
                    rows="4"
                    placeholder='Your Message ...'
                    className='mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4'
                />
                <button type="submit" className='w-full py-3 rounded-md text-gray-100 font-semibold text-xl bg-primary-color'>Send Message</button>
            </form>

        
    </div>
  )
}

export default Contact