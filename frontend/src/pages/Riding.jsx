import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
    const [sosActive, setSosActive] = useState(false);

    socket.on("ride-ended", () => {
        navigate('/home')
    })

    const handlePayment = () => {
        setPaymentLoading(true);
        setTimeout(() => {
            setPaymentLoading(false);
            setPaymentDone(true);
        }, 1500);
    }

    const handleSOS = () => {
        setSosActive(true);
        // In a real application, this would trigger emergency services
        // and notify nearby authorities
        alert('SOS Alert: Emergency services have been notified. Stay calm, help is on the way.');
        // Simulate sending SOS signal to backend
        socket.emit('sos-triggered', {
            rideId: ride?.id,
            location: ride?.currentLocation,
            timestamp: new Date().toISOString()
        });
    }

    const closeSOSAlert = () => {
        setSosActive(false);
    }

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-4'>
                {/* SOS Button */}
                <button 
                    onClick={handleSOS}
                    className={`fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
                        sosActive ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                    <i className="ri-emergency-line text-white text-xl"></i>
                    <span className="text-white font-semibold">SOS</span>
                </button>
                {sosActive && (
                    <div className='fixed top-32 right-4 bg-white p-4 rounded-lg shadow-lg border border-red-200 max-w-xs'>
                        <div className="flex items-center gap-2 mb-2">
                            <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
                            <h3 className="text-red-600 font-semibold">Emergency Alert</h3>
                        </div>
                        <p className='text-gray-700'>Emergency notification has been sent. Help is on the way.</p>
                        <p className='text-sm text-gray-500 mt-1'>Your location is being shared with emergency services.</p>
                        <button 
                            onClick={closeSOSAlert}
                            className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Okay
                        </button>
                    </div>
                )}
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                {!paymentDone && !paymentLoading && (
                    <button onClick={handlePayment} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
                )}
                {paymentLoading && (
                    <div className='w-full mt-5 flex flex-col items-center'>
                        <div className='w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-2'></div>
                        <span className='text-green-700 font-semibold'>Processing Payment...</span>
                    </div>
                )}
                {paymentDone && (
                    <div className='w-full mt-5 flex flex-col items-center'>
                        <i className='ri-checkbox-circle-fill text-4xl text-green-500 mb-2'></i>
                        <span className='text-green-700 font-semibold text-lg'>Payment Successful!</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Riding