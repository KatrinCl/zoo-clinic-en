import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'

const AddDoctor = ({ isAdmin }) => {
  const [image, setImage] = useState(false)
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [experience, setExperience] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState('')

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!isAdmin) return

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('speciality', speciality)
      formData.append('experience', experience)
      formData.append('description', description)
      formData.append('skills', skills)
      image && formData.append('image', image)

      const response = await axios.post(`${backendUrl}/api/doctor/add-doctor`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setSpeciality('')
        setExperience('')
        setDescription('')
        setSkills('')
        setImage(false)
      } else toast.error(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <p>Upload Image</p>
        <label htmlFor='image'>
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' className='w-35 h-35' />
          <input type='file' id='image' onChange={e => setImage(e.target.files[0])} hidden />
        </label>
      </div>

      <div className='flex flex-col gap-2'>
        <p>Full Name</p>
        <input type='text' required value={name} onChange={e => setName(e.target.value)} className='border border-gray-300 w-80 p-2 rounded' />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Speciality</p>
        <textarea type='text' rows={2} required value={speciality} onChange={e => setSpeciality(e.target.value)} className='border border-gray-300 w-80 p-2 rounded' />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Skills</p>
        <textarea type='text' rows={5} required value={skills} onChange={e => setSkills(e.target.value)} className='border border-gray-300 w-80 p-2 rounded' />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Description</p>
        <textarea type='text' rows={5} required value={description} onChange={e => setDescription(e.target.value)} className='border border-gray-300 w-80 p-2 rounded' />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Experience (years)</p>
        <input type='text' required value={experience} onChange={e => setExperience(e.target.value)} className='border border-gray-300 w-80 p-2 rounded' />
      </div>

      <button type='submit' className='border w-40 rounded-full p-2 cursor-pointer hover:border-gray-500'>
        Add Doctor
      </button>
    </form>
  )
}

export default AddDoctor
