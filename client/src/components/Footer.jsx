import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <hr className='text-gray-300 my-5' />
      <div className='flex flex-col md:flex-row justify-between m-2 md:m-5'>
        <div className='flex flex-col gap-4 md:w-1/2'>
          <p>© Veterinary Clinic PawCare in San Francisco 2026</p>
          <p className='text-gray-700 text-sm md:text-base'>456 Elm St, San Francisco, CA 94102, USA</p>
          <p className='text-gray-700 text-sm md:text-base'>Working Hours: Mon-Sun 10:00 AM - 10:00 PM</p>
          <p className='text-gray-500 text-sm md:text-base hidden md:block'>2012-2026 ©</p>
        </div>
        <div className='flex flex-col gap-2 md:w-1/2 md:text-right md:items-end text-gray-700'>
          <div className='flex gap-2'>
            <img className='w-4' src={assets.call1} alt='Phone' />
            <p className='text-sm md:text-base'>+1 (555) 123-4567</p>
          </div>
          <p className='text-sm leading-7'>
            “Please consult a specialist for contraindications. Prices on this website are not a public offer. Full pricing is available at the reception or by phone.”
          </p>
          <p className='text-gray-500 text-sm md:text-base md:hidden'>2012-2026 ©</p>
        </div>
      </div>
    </div>
  )
}

export default Footer