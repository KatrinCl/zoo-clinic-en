import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col m-2 md:m-10'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <Link to='/' className='text-2xl cursor-pointer'>
            PawCare
          </Link>
          <img className='w-6 h-6' src={assets.logo} alt="" />
        </div>
        <p className='text-gray-700 hidden md:block'>456 Elm St, San Francisco, CA 94102, USA</p>

        <button onClick={() => setOpen(!open)} className='md:hidden text-3xl text-blue-900 cursor-pointer'>
          ☰
        </button>
      </div>
      <hr className='text-gray-300 my-5' />
      <div className='hidden md:flex justify-between'>
        <div className='flex gap-4 text-blue-900'>
          <a href='/#services'>Services</a>
          <NavLink to='/services'>Pricing</NavLink>
          <NavLink to='/#docs'>Doctors</NavLink>
          <a href='/#photos'>Gallery</a>
          <a href='/#actions'>Promotions</a>
          <a href='/#contacts'>Contact</a>
        </div>
        <div className='flex gap-2 rounded-xl px-4 py-2 bg-blue-900 text-white'>
          <img className='w-4' src={assets.call} alt='' />
          <p className='text-sm md:text-base'>+1 (555) 123-4567</p>
        </div>
      </div>

      {open && (
        <div className='md:hidden mt-6 border rounded-xl p-4 flex flex-col gap-4 bg-white shadow-xl'>
          <NavLink to='/#services' onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to='/services' onClick={() => setOpen(false)}>Pricing</NavLink>
          <NavLink to='/#docs' onClick={() => setOpen(false)}>Doctors</NavLink>
          <NavLink to='/#photos' onClick={() => setOpen(false)}>Gallery</NavLink>
          <NavLink to='/#actions' onClick={() => setOpen(false)}>Promotions</NavLink>
          <NavLink to='/#contacts' onClick={() => setOpen(false)}>Contact</NavLink>

          <div className='flex gap-2 items-center justify-center mt-4 bg-blue-900 text-white rounded-xl px-4 py-2'>
            <img className='w-4' src={assets.call} alt='Phone' />
            <p className='text-sm'>+1 (555) 123-4567</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar