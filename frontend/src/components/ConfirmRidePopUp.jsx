import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }


    }
    return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40'>
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-8 w-[90%] sm:w-full max-w-xs flex flex-col items-center relative'>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(false)
                    props.setRidePopupPanel(false)
                }} className='absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl'>&times;</button>
                <h2 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4'>Confirm Ride</h2>
                <div className='flex gap-2 sm:gap-3 justify-between flex-col items-center'>
                    <div className='w-full mt-3 sm:mt-5'>
                        <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                            <i className="ri-map-pin-user-fill text-lg sm:text-xl"></i>
                            <div>
                                <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
                                <p className='text-xs sm:text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                            <i className="text-lg sm:text-xl ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
                                <p className='text-xs sm:text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3'>
                            <i className="ri-currency-line text-lg sm:text-xl"></i>
                            <div>
                                <h3 className='text-base sm:text-lg font-medium'>₹{props.ride?.fare}</h3>
                                <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 sm:mt-6 w-full'>
                        <form onSubmit={submitHander}>
                            <input 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                type="text" 
                                className='bg-[#eee] px-4 sm:px-6 py-2 sm:py-4 font-mono text-base sm:text-lg rounded-lg w-full mt-2 sm:mt-3' 
                                placeholder='Enter OTP' 
                            />
                            <button className='w-full mt-3 sm:mt-5 text-base sm:text-lg flex justify-center bg-green-600 text-white font-semibold p-2 sm:p-3 rounded-lg'>Confirm</button>
                            <button 
                                onClick={() => {
                                    props.setConfirmRidePopupPanel(false)
                                    props.setRidePopupPanel(false)
                                }} 
                                className='w-full mt-2 bg-red-600 text-base sm:text-lg text-white font-semibold p-2 sm:p-3 rounded-lg'
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp