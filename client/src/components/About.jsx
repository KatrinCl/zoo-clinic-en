import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col m-2 md:m-10 border border-gray-100 shadow-xl rounded-2xl'>
      <div className='m-4 md:m-10'>
        <h1 className='text-lg md:text-4xl'>
          About <span className='font-bold text-blue-950'>VetClinic</span>
        </h1>

        <div className='flex flex-col gap-6 mt-5'>
          <p className='text-gray-700 leading-relaxed'>
            VetClinic is a modern veterinary clinic combining experienced specialists and advanced technology. Since 2012, we have helped over 10,000 pets.
          </p>

          <p className='text-gray-700 leading-relaxed'>
            Our mission is to provide high-quality veterinary care with attention to every patient. Our clinic has certified veterinarians, surgeons, and therapists who regularly update their skills and apply only proven treatment methods.
          </p>

          <p className='text-gray-700 leading-relaxed'>
            We use advanced diagnostic equipment: digital X-ray, expert-class ultrasound, and an in-house lab for urgent tests. This allows us to provide accurate diagnoses and effective treatment quickly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About