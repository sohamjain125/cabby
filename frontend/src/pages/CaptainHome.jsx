import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import logo from '../assets/logo.png'
import RideHistory from '../components/RideHistory'
import Earnings from '../components/Earnings'
import Sidebar from '../components/Sidebar'

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const [ sidebarOpen, setSidebarOpen ] = useState(false)
    const [ showRides, setShowRides ] = useState(false)
    const [ showEarnings, setShowEarnings ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)
    const [ ride, setRide ] = useState(null)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()
    }, [])

    useEffect(() => {
        socket.on('new-ride', (data) => {
            console.log('Received new-ride event:', data);
            setRide(data);
            setRidePopupPanel(true);
        });
        // Optionally clean up
        // return () => socket.off('new-ride');
    }, []);

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    useEffect(() => {
        console.log('sidebarOpen changed:', sidebarOpen)
    }, [sidebarOpen])

    const closeSidebar = () => {
        console.log('closeSidebar called')
        setSidebarOpen(false)
        setShowRides(false)
        setShowEarnings(false)
    }

    return (
        <div className='h-screen bg-gray-50 w-full max-w-full overflow-x-hidden box-border'>
            {/* Welcome message */}
            {captain && (
                <div className='fixed top-0 left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-blue-100 text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded shadow text-xs sm:text-base'>
                    Welcome, Captain
                </div>
            )}
            <div className='fixed p-2 sm:p-4 top-0 flex items-center justify-between w-full sm:w-screen bg-white shadow-sm z-50 box-border'>
                <div className='flex items-center gap-2 sm:gap-4'>
                    <button 
                        onClick={() => {
                            setSidebarOpen(true)
                            console.log('Sidebar open button clicked, sidebarOpen set to true')
                        }}
                        className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'
                    >
                        <i className="text-base sm:text-lg font-medium ri-menu-line"></i>
                    </button>
                    <img className='w-12 h-8 sm:w-15 sm:h-10 object-contain' src={logo} alt="Cabby Logo" />
                </div>
                <div className='flex items-center gap-2 sm:gap-4'>
                    <Link to='/captain/profile' className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-base sm:text-lg font-medium ri-user-line"></i>
                    </Link>
                    <Link to='/captain/logout' className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-base sm:text-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
            </div>

            <Sidebar open={sidebarOpen} onClose={closeSidebar}>
                <div className='p-3 sm:p-6 relative w-full max-w-full box-border'>
                    <div className='flex items-center justify-between mb-5 sm:mb-8'>
                        <h2 className='text-lg sm:text-xl font-semibold'>Menu</h2>
                        <button 
                            style={{ position: 'absolute', top: 12, right: 12, background: 'red', color: 'white', border: '2px solid black', zIndex: 1000 }}
                            onClick={() => {
                                alert('Sidebar close button clicked');
                                closeSidebar();
                            }}
                            className='h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full hover:bg-gray-100'
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className='space-y-3 sm:space-y-4'>
                        <Link 
                            to='/captain/profile'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-user-line"></i>
                            <span>Profile</span>
                        </Link>
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <button 
                            onClick={() => setShowRides(!showRides)}
                            className='w-full flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base'
                        >
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <i className="text-lg sm:text-xl ri-route-line"></i>
                                <span>My Rides</span>
                            </div>
                            <i className={`ri-arrow-${showRides ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showRides && (
                            <div className='px-2 sm:px-3'>
                                <RideHistory />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <button 
                            onClick={() => setShowEarnings(!showEarnings)}
                            className='w-full flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base'
                        >
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <i className="text-lg sm:text-xl ri-money-dollar-circle-line"></i>
                                <span>Earnings</span>
                            </div>
                            <i className={`ri-arrow-${showEarnings ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showEarnings && (
                            <div className='px-2 sm:px-3'>
                                <Earnings />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <Link 
                            to='/captain/settings'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-settings-3-line"></i>
                            <span>Settings</span>
                        </Link>
                        <Link 
                            to='/captain/logout'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-logout-box-r-line"></i>
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </Sidebar>

            <div className='w-full h-auto sm:h-3/5 box-border'>
                <img className='h-full w-full object-cover rounded-b-xl' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='w-full h-auto sm:h-2/5 p-2 sm:p-6 box-border'>
                <CaptainDetails />
            </div>
            {ridePopupPanel && (
                <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-1 sm:px-3 py-6 sm:py-10 pt-8 sm:pt-12 box-border'>
                    <RidePopUp
                        ride={ride}
                        setRidePopupPanel={setRidePopupPanel}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        confirmRide={confirmRide}
                    />
                </div>
            )}
            {confirmRidePopupPanel && (
                <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 bg-white px-1 sm:px-3 py-6 sm:py-10 pt-8 sm:pt-12 box-border'>
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        setRidePopupPanel={setRidePopupPanel}
                    />
                </div>
            )}
        </div>
    )
}

export default CaptainHome