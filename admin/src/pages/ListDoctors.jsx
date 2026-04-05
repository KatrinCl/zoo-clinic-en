import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast'

const ListDoctors = ({ isAdmin }) => {
  const [list, setList] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const [form, setForm] = useState({
    name: '',
    speciality: '',
    experience: '',
    description: '',
    skills: '',
    image: null,
  })

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list-doctor`, {
        withCredentials: true,
      })

      if (data.success) setList(data.doctors)
      else toast.error(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeDoctor = async id => {
    if (!isAdmin) return

    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/remove-doctor`, { id }, { withCredentials: true })

      if (data.success) {
        toast.success(data.message)
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const openEdit = doc => {
    setSelectedDoc(doc)
    setForm({
      name: doc.name,
      speciality: doc.speciality,
      experience: doc.experience,
      description: doc.description,
      skills: doc.skills,
      image: null,
    })
    setIsEditOpen(true)
  }

  const handleUpdate = async e => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('id', selectedDoc._id)
      formData.append('name', form.name)
      formData.append('speciality', form.speciality)
      formData.append('experience', form.experience)
      formData.append('description', form.description)
      formData.append('skills', form.skills)

      if (form.image) {
        formData.append('image', form.image)
      }

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-doctor`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (data.success) {
        toast.success(data.message)
        setIsEditOpen(false)
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [isAdmin])

  return (
    <div>
      <p className='text-base'>Doctors List</p>

      <div className='flex flex-col gap-4 mt-4'>
        <div className='grid grid-cols-[0.6fr_0.5fr_0.5fr_1fr_1fr_0.3fr_0.3fr] items-center border bg-gray-100 text-sm p-2'>
          <b>Image</b>
          <b>Name</b>
          <b>Speciality</b>
          <b>Skills</b>
          <b>Description</b>
          <b>Experience</b>
          <b>Action</b>
        </div>

        {list.map(doc => (
          <div key={doc._id} className='grid grid-cols-[0.6fr_0.5fr_0.5fr_1fr_1fr_0.3fr_0.3fr] items-center'>
            <img src={doc.image} alt='' className='w-20 h-20 object-cover' />
            <p>{doc.name}</p>
            <p>{doc.speciality}</p>
            <p className='truncate'>{doc.skills}</p>
            <p className='truncate'>{doc.description}</p>
            <p>{doc.experience} yrs</p>

            <div className='flex gap-3 justify-center'>
              <span onClick={() => openEdit(doc)} className='cursor-pointer text-blue-600'>
                ✏️
              </span>

              <span onClick={() => removeDoctor(doc._id)} className='cursor-pointer text-red-500'>
                X
              </span>
            </div>
          </div>
        ))}
      </div>

      {isEditOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <form onSubmit={handleUpdate} className='bg-white p-6 rounded-xl w-[400px] flex flex-col gap-4'>
            <h2 className='text-lg font-semibold'>Edit Doctor</h2>

            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder='Name' className='border p-2 rounded' />

            <input value={form.speciality} onChange={e => setForm({ ...form, speciality: e.target.value })} placeholder='Speciality' className='border p-2 rounded' />

            <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder='Experience' className='border p-2 rounded' />

            <textarea value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder='Skills' className='border p-2 rounded' />

            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder='Description' className='border p-2 rounded' />

            <input type='file' onChange={e => setForm({ ...form, image: e.target.files[0] })} />

            <div className='flex gap-3 justify-end'>
              <button type='button' onClick={() => setIsEditOpen(false)} className='px-4 py-2 border rounded'>
                Cancel
              </button>

              <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ListDoctors
