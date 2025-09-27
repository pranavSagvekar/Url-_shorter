import React from 'react'
import useAuth from '../hooks/useAuth'

function Dashboard() {
  const {user , loading  } = useAuth();
  return (
    <div className='flex flex-col justify-center p-10'>
      <div className=''>
          <h1 className='text-3xl font-semibold'>Dashboard</h1>
          <p className='mt-3 ml-4 text-gray-600'>Welcome back, <b className='font-semibold'>{user.name} </b></p>
      </div>

      <div></div>
    </div>
  )
}

export default Dashboard