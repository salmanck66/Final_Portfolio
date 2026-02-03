import React from 'react'

const Experience = () => {
  return (
    <div className="py-10 bg-[#232325]" id="experience">
      <h2 className="mb-8 text-3xl text-white text-center">
        My <span className="text-blue-400">Experience</span>
      </h2>

      {/* Helixo Experience */}
      <div className="mb-[20px] text-white bg-gray-700/20 p-4 rounded-3xl max-w-[300px] sm:max-w-[600px] mx-auto">
        <p className="font-semibold">Helixo Innovations Pvt Ltd — Kochi</p>
        <p className="text-gray-400">(October 2024 – March 2025)</p>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Worked as a Junior Software Engineer contributing to some of Shopify’s
          top-downloaded apps used by thousands of merchants worldwide.  
          Built and maintained features using MERN, Next.js, Remix, Svelte,
          CRXJS, and WordPress. Improved UFE (36,000+ active users) with new
          features and performance optimizations, and also enhanced Bucks and
          Geolocation apps.  
          Worked on a large-scale system with Super Admin, Admin, and Widget
          components, and gained hands-on experience deploying Shopify apps
          using Docker and DigitalOcean.
        </p>
      </div>

      <div className="h-[50px] w-[2px] bg-slate-400 my-1 mx-auto"></div>

      {/* Selfstack Experience */}
      <div className="mb-[20px] text-white bg-gray-700/20 p-4 rounded-3xl max-w-[300px] sm:max-w-[600px] mx-auto">
        <p className="font-semibold">Selfstack Hub LLP — Calicut</p>
        <p className="text-gray-400">(February 2024 – October 2024)</p>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Worked as a MERN Stack Developer Intern building applications with
          React, Node.js, and MongoDB. Completed 20+ mini projects including a
          Shipping Aggregator API, QR generator, post scheduler, user management
          app, and multiple responsive websites.  
          Collaborated using Git/GitHub, participated in weekly reviews, and
          strengthened logical thinking, communication, and problem-solving
          skills through real-world projects.
        </p>
      </div>
    </div>
  )
}

export default Experience
