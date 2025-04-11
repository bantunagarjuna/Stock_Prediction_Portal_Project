import React, {useEffect} from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  const Token = localStorage.getItem('access')
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/')
        console.log('Protected data fetched successfully')
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching protected data:', error)
      }
    }

    fetchProtectedData();
  }, [])

  return (
    <>
      <h1 className='text-light'>Dashboard</h1>
    </>
  )
}

export default Dashboard
