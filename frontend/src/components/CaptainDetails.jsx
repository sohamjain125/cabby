import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

    // Dummy stats
    const stats = {
        earnings: '₹48,500',
        hoursOnline: 120,
        totalRides: 156,
        rating: 4.9
    }

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>{stats.earnings}</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>{stats.hoursOnline}</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>{stats.totalRides}</h5>
                    <p className='text-sm text-gray-600'>Total Rides</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-star-line"></i>
                    <h5 className='text-lg font-medium'>{stats.rating}</h5>
                    <p className='text-sm text-gray-600'>Rating</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails