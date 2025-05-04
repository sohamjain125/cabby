import React from 'react'

const RidePopUp = (props) => {
    console.log(props)
    return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40'>
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-8 w-[90%] sm:w-full max-w-xs flex flex-col items-center relative'>
                <button onClick={() => {
                    props.setRidePopupPanel(false)
                }} className='absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl'>&times;</button>
                <h2 className='text-lg sm:text-xl font-bold mb-3 sm:mb-4'>New Ride Request</h2>
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
                    <div className='mt-3 sm:mt-5 w-full'>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(true)
                            props.confirmRide()
                        }} className='bg-green-600 w-full text-white font-semibold p-2 sm:p-3 rounded-lg text-sm sm:text-base'>Accept</button>
                        <button onClick={() => {
                            props.setRidePopupPanel(false)
                        }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 sm:p-3 rounded-lg text-sm sm:text-base'>Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp