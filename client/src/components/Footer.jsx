import React from 'react'
import {data, footer_data} from '../assets/data'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
<div>
    <div onClick={() => navigate('/')} className=" cursor-pointer flex items-center gap-2 sm:gap-4">
      <img
        
        src={data.logo}
        alt="logo"
        className=" w-10 h-10 sm:w-14 sm:h-14"
      />
      <h1 className="text-xl sm:text-2xl font-semibold text-primary tracking-wide">Nuvina</h1>
    </div>
    <p className='max-w-[410px] mt-6'>Nuvina’s blog is your hub for tales of life, travel, and creativity, sparking inspiration with every new post.</p>
</div>
<div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
{footer_data.map((section,index)=> (
    <div key={index}> 
    <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
    <ul className='text-sm space-y-1'>
        {section.links.map((link,i)=> (
            <li key={i}>
                <a href="#" className='hover:underline transition'>{link}</a>
            </li>
        ))}
    </ul>
    </div>
))}
</div>




    </div>
    <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © Nuvina Zeyus - All Right Reserved. </p>
    </div>
  )
}

export default Footer
