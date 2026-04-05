import React from 'react'
import { assets } from '../assets/assets'

const Contacts = () => {

  return (
    <div className='flex flex-col md:flex-row gap-2 md:gap-6 mx-2 my-10 md:m-10'>
      <div className='flex flex-col gap-2 border border-gray-100 shadow-xl rounded-2xl p-10 md:w-1/2 md:h-80'>
        <h1 className='font-bold text-lg md:text-2xl'>Have Questions?</h1>
        <p>You can reach us using any of the following contact methods</p>
        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-gray-700'>Contact Number</p>
          <div className='flex gap-2 border border-gray-600 rounded-2xl p-2 md:w-50 items-center justify-center'>
            <img className='w-4' src={assets.call1} alt='Phone' />
            <p className='text-sm md:text-base'>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      <div className='flex border border-gray-100 shadow-xl rounded-2xl md:w-1/2 md:h-80 overflow-hidden'>
        <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019166909424!2d-122.4215!3d37.7793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d99e4b0b3%3A0x5a6a34b7e5e6b0b1!2s456%20Elm%20St%2C%20San%20Francisco%2C%20CA%2094102%2C%20USA!5e0!3m2!1sen!2s!4v1681000000000!5m2!1sen!2s' width='100%' height='320' style={{ border: 0 }} allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade' />{' '}
      </div>
    </div>
  )
}

export default Contacts
