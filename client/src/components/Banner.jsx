import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4 m-2 md:m-10'>
      <div className='flex flex-1 flex-col gap-10 border border-gray-100 shadow-xl rounded-2xl p-8'>
        <h1 className='text-lg md:text-4xl md:leading-14'>
          Veterinary Clinic <span className='font-bold'>PawCare</span> <br /> in San Francisco
        </h1>
        <p className='text-gray-700'>Working Hours: Mon-Sun 10:00 AM - 10:00 PM</p>
      </div>

      <div className='border border-gray-100 shadow-xl rounded-2xl flex-1 overflow-hidden'>
        <img className='w-full h-full object-cover' src={assets.vet} alt="vet-banner" />
      </div>
    </div>
  )
}

export default Banner