import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-2xl sm:text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 sm:gap-3 justify-between flex-col items-center'>
                <img className='h-16 sm:h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-3 sm:mt-5'>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill text-lg sm:text-xl"></i>
                        <div>
                            <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3 border-b-2'>
                        <i className="text-lg sm:text-xl ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-base sm:text-lg font-medium'>562/11-A</h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 sm:gap-5 p-2 sm:p-3'>
                        <i className="ri-currency-line text-lg sm:text-xl"></i>
                        <div>
                            <h3 className='text-base sm:text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-xs sm:text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='w-full mt-3 sm:mt-5 bg-green-600 text-white font-semibold p-2 sm:p-3 rounded-lg text-sm sm:text-base'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide