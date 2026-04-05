import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'

const ListServices = ({ isAdmin }) => {
  const [servicesList, setServicesList] = useState([])
  const [editing, setEditing] = useState(null)
  const [newPrice, setNewPrice] = useState('')
  const [activeProfile, setActiveProfile] = useState(null)
  const [newServiceName, setNewServiceName] = useState('')
  const [newServicePrice, setNewServicePrice] = useState('')

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/service/list-service`, { withCredentials: true })
      if (data.success) setServicesList(data.services)
    } catch (error) {
      console.log(error)
    }
  }

  const savePrice = async (profileId, index) => {
    try {
      await axios.post(
        `${backendUrl}/api/service/update-price`,
        {
          profileId,
          serviceIndex: index,
          price: newPrice,
        },
        { withCredentials: true },
      )

      setEditing(null)
      setNewPrice('')
      fetchList()
    } catch (error) {
      console.log(error)
    }
  }

  const removeProfile = async id => {
    if (!isAdmin) return
    try {
      await axios.post(`${backendUrl}/api/service/remove-service`, { id }, { withCredentials: true })
      fetchList()
    } catch (error) {
      console.log(error)
    }
  }

  const addService = async profileId => {
    try {
      await axios.post(
        `${backendUrl}/api/service/add-to-profile`,
        {
          profileId,
          name: newServiceName,
          price: newServicePrice,
        },
        { withCredentials: true },
      )

      setNewServiceName('')
      setNewServicePrice('')
      setActiveProfile(null)
      fetchList()
    } catch (error) {
      console.log(error)
    }
  }

  const removeService = async (profileId, index) => {
    try {
      await axios.post(`${backendUrl}/api/service/remove-from-profile`, { profileId, serviceIndex: index }, { withCredentials: true })
      fetchList()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-xl font-semibold'>Services List</h2>

      {servicesList.map(profile => (
        <div key={profile._id} className='border rounded p-4'>
          <div className='flex justify-between items-center mb-4'>
            <b>{profile.profile}</b>
            <button onClick={() => removeProfile(profile._id)} className='text-red-500 text-sm'>
              Delete Profile
            </button>
          </div>

          {profile.services.map((service, index) => (
            <div key={index} className='grid grid-cols-4 gap-4 items-center border-t py-2 text-sm'>
              <p>{service.name}</p>

              {editing?.profileId === profile._id && editing.index === index ? <input value={newPrice} onChange={e => setNewPrice(e.target.value)} className='border p-1 rounded w-24' /> : <p>${service.price}</p>}

              {editing?.profileId === profile._id && editing.index === index ? (
                <button onClick={() => savePrice(profile._id, index)} className='text-green-600'>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditing({ profileId: profile._id, index })
                    setNewPrice(service.price)
                  }}
                  className='text-blue-600'>
                  Edit
                </button>
              )}

              <button onClick={() => removeService(profile._id, index)} className='text-red-500'>
                Delete
              </button>
            </div>
          ))}

          <div className='mt-4'>
            {activeProfile === profile._id ? (
              <div className='flex gap-2'>
                <input placeholder='Service Name' value={newServiceName} onChange={e => setNewServiceName(e.target.value)} className='border p-1 rounded' />
                <input placeholder='Price' value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)} className='border p-1 rounded w-24' />
                <button onClick={() => addService(profile._id)} className='bg-green-600 text-white px-3 rounded'>
                  OK
                </button>
              </div>
            ) : (
              <button onClick={() => setActiveProfile(profile._id)} className='text-blue-600 text-sm'>
                + Add Service
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListServices
