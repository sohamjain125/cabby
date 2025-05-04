import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const CaptainProfile = () => {
    const { captain } = useContext(CaptainDataContext)

    // Dummy stats
    const stats = {
        earnings: '₹48,500',
        todayEarnings: '₹2,450',
        weekEarnings: '₹12,800',
        hoursOnline: 120,
        totalRides: 156,
        rating: 4.9
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-sm'>
                <img className='w-15 h-10' src={logo} alt="Cabby Logo" />
                <Link to='/captain-home' className='h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full'>
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
                            <h2 className='text-xl font-semibold capitalize'>{captain?.fullname.firstname} {captain?.fullname.lastname}</h2>
                            <p className='text-gray-600'>{captain?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Vehicle Information */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Vehicle Information</h3>
                    <div className='space-y-3'>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>Vehicle Type</span>
                            <span className='font-medium capitalize'>{captain?.vehicle.vehicleType}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>Vehicle Color</span>
                            <span className='font-medium capitalize'>{captain?.vehicle.color}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>License Plate</span>
                            <span className='font-medium'>{captain?.vehicle.plate}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-600'>Capacity</span>
                            <span className='font-medium'>{captain?.vehicle.capacity} persons</span>
                        </div>
                    </div>
                </div>

                {/* Earnings Statistics */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Earnings Statistics</h3>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.todayEarnings}</h4>
                            <p className='text-sm text-gray-600'>Today</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.weekEarnings}</h4>
                            <p className='text-sm text-gray-600'>This Week</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.earnings}</h4>
                            <p className='text-sm text-gray-600'>This Month</p>
                        </div>
                    </div>
                </div>

                {/* Ride Statistics */}
                <div className='mt-6 bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold mb-4'>Ride Statistics</h3>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.totalRides}</h4>
                            <p className='text-sm text-gray-600'>Total Rides</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.hoursOnline}</h4>
                            <p className='text-sm text-gray-600'>Hours Online</p>
                        </div>
                        <div className='text-center'>
                            <h4 className='text-2xl font-semibold'>{stats.rating}</h4>
                            <p className='text-sm text-gray-600'>Rating</p>
                        </div>
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

export default CaptainProfile 