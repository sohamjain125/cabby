import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const UserProfile = () => {
    const { user } = useContext(UserDataContext)

    // Dummy stats and rides
    const stats = {
        totalRides: 23,
        totalSpent: '₹5,800',
        rating: 4.7
    }
    const recentRides = [
        {
            id: 1,
            date: '2024-03-15',
            time: '09:30 AM',
            from: 'Koramangala',
            to: 'Indiranagar',
            fare: '₹250',
            status: 'Completed',
            captain: 'Amit Verma'
        },
        {
            id: 2,
            date: '2024-03-12',
            time: '07:10 PM',
            from: 'MG Road',
            to: 'Jayanagar',
            fare: '₹320',
            status: 'Completed',
            captain: 'Sunita Rao'
        },
        {
            id: 3,
            date: '2024-03-10',
            time: '11:45 AM',
            from: 'HSR Layout',
            to: 'Whitefield',
            fare: '₹410',
            status: 'Completed',
            captain: 'Rakesh Singh'
        }
    ]

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-sm'>
                <img className='w-25 h-20' src={logo} alt="Cabby Logo" />
                <Link to='/home' className='h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-arrow-left-line"></i>
                </Link>
            </div>

            {/* Profile Content */}
            <div className='pt-32 px-6'>
                {/* Profile Header */}
                <div className='bg-white rounded-xl p-6 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <div className='h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center'>
                            <i className="text-3xl ri-user-line"></i>
                        </div>
                        <div>
                            <h2 className='text-xl font-semibold capitalize'>{user?.fullname.firstname} {user?.fullname.lastname}</h2>
                            <p className='text-gray-600'>{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Profile Stats */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Ride Statistics</h3>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.totalRides}</h4>
                            <p className='text-sm text-gray-600'>Total Rides</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.totalSpent}</h4>
                            <p className='text-sm text-gray-600'>Total Spent</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.rating}</h4>
                            <p className='text-sm text-gray-600'>Rating</p>
                        </div>
                    </div>
                </div>

                {/* Recent Rides */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Recent Rides</h3>
                    <div className='space-y-2'>
                        {recentRides.map(ride => (
                            <div key={ride.id} className='bg-gray-50 p-3 rounded-md border border-gray-100'>
                                <div className='flex justify-between items-center mb-1'>
                                    <span className='font-medium text-base'>{ride.from} → {ride.to}</span>
                                    <span className='text-green-600 font-medium text-base'>{ride.fare}</span>
                                </div>
                                <div className='text-xs text-gray-600 mb-1'>
                                    {ride.date} at {ride.time} | Captain: {ride.captain}
                                </div>
                                <span className='px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs'>{ride.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Settings</h3>
                    <div className='space-y-4'>
                        <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <i className="text-xl ri-edit-line"></i>
                                <span>Edit Profile</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <i className="text-xl ri-lock-line"></i>
                                <span>Change Password</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <i className="text-xl ri-notification-3-line"></i>
                                <span>Notifications</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile 