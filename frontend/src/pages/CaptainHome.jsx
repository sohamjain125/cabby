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

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopupPanel(true)
    })

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
        <div className='h-screen'>
            {/* Welcome message */}
            {captain && (
                <div className='fixed top-0 left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow'>
                    Welcome, Captain
                </div>
            )}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-sm z-50'>
                <div className='flex items-center gap-4'>
                    <button 
                        onClick={() => {
                            setSidebarOpen(true)
                            console.log('Sidebar open button clicked, sidebarOpen set to true')
                        }}
                        className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-sm'
                    >
                        <i className="text-lg font-medium ri-menu-line"></i>
                    </button>
                    <img className='w-15 h-10' src={logo} alt="Cabby Logo" />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to='/captain/profile' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-lg font-medium ri-user-line"></i>
                    </Link>
                    <Link to='/captain/logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
            </div>

            <Sidebar open={sidebarOpen} onClose={closeSidebar}>
                <div className='p-6 relative'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-xl font-semibold'>Menu</h2>
                        <button 
                            style={{ position: 'absolute', top: 12, right: 12, background: 'red', color: 'white', border: '2px solid black', zIndex: 1000 }}
                            onClick={() => {
                                alert('Sidebar close button clicked');
                                closeSidebar();
                            }}
                            className='h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100'
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className='space-y-4'>
                        <Link 
                            to='/captain/profile'
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-xl ri-user-line"></i>
                            <span>Profile</span>
                        </Link>
                        <div className='border-t border-gray-100 my-4'></div>
                        <button 
                            onClick={() => setShowRides(!showRides)}
                            className='w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'
                        >
                            <div className='flex items-center gap-3'>
                                <i className="text-xl ri-route-line"></i>
                                <span>My Rides</span>
                            </div>
                            <i className={`ri-arrow-${showRides ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showRides && (
                            <div className='px-3'>
                                <RideHistory />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-4'></div>
                        <button 
                            onClick={() => setShowEarnings(!showEarnings)}
                            className='w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50'
                        >
                            <div className='flex items-center gap-3'>
                                <i className="text-xl ri-money-dollar-circle-line"></i>
                                <span>Earnings</span>
                            </div>
                            <i className={`ri-arrow-${showEarnings ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showEarnings && (
                            <div className='px-3'>
                                <Earnings />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-4'></div>
                        <Link 
                            to='/captain/settings'
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-xl ri-settings-3-line"></i>
                            <span>Settings</span>
                        </Link>
                        <Link 
                            to='/captain/logout'
                            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-xl ri-logout-box-r-line"></i>
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </Sidebar>

            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome