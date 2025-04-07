import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMe } from "../redux/slices/authSlice"

function Profile() {

    const dispatch = useDispatch()
    const { user, isLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(fetchMe())
    }, [dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <div>Please login to view your profile</div>
    }


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
        <div className="flex items-center space-x-4">
            <img 
            src={user.avatar?.url || "https://imgs.search.brave.com/HarckInVhfLpiDFAWsKKmoDcUE5k6BSO8CEaT0T-lto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzgwLzM1LzU1/LzM2MF9GXzk4MDM1/NTU1N19VRVZxU3Js/R3YzZEpKeXhqVVZ0/QWRkOWk1SUVGWFFy/ay5qcGc"} 
            alt="avatar" 
            className="w-20 h-20 rounded-full object-cover"
            />
            <div>
                <h2 className="text-xl font-bold">{user.fullName}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
            </div>
        </div>
        <div className="space-y-2">
            <p><strong>Username:</strong>{user.username}</p>
            <p><strong>Email:</strong>{user.email}</p>
            <p><strong>Phone:</strong>{user.phoneNumber}</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Profile
        </button>
    </div>
  )
}

export default Profile