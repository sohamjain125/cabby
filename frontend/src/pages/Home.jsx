import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import logo from '../assets/logo.png'
import RideHistory from '../components/RideHistory'
import PaymentHistory from '../components/PaymentHistory'
import Sidebar from '../components/Sidebar'

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const [ sidebarOpen, setSidebarOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const sidebarRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)
    const [ showRides, setShowRides ] = useState(false)
    const [ showPayments, setShowPayments ] = useState(false)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])

    useGSAP(function () {
        if (sidebarOpen) {
            gsap.to(sidebarRef.current, {
                x: 0,
                duration: 0.3
            })
        } else {
            gsap.to(sidebarRef.current, {
                x: '-100%',
                duration: 0.3
            })
        }
    }, [sidebarOpen])

    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
        setShowRides(false)
        setShowPayments(false)
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Welcome message */}
            {user && (
                <div className='fixed top-0 left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm sm:text-base'>
                    Welcome, User
                </div>
            )}
            <div className='fixed p-3 sm:p-6 top-0 flex items-center justify-between w-screen bg-white shadow-sm z-50'>
                <div className='flex items-center gap-2 sm:gap-4'>
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'
                    >
                        <i className="text-base sm:text-lg font-medium ri-menu-line"></i>
                    </button>
                    <img className='w-12 h-8 sm:w-15 sm:h-10' src={logo} alt="Cabby Logo" />
                </div>
                <div className='flex items-center gap-2 sm:gap-4'>
                    <Link to='/user/profile' className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-base sm:text-lg font-medium ri-user-line"></i>
                    </Link>
                    <Link to='/user/logout' className='h-8 w-8 sm:h-10 sm:w-10 bg-white flex items-center justify-center rounded-full shadow-sm'>
                        <i className="text-base sm:text-lg font-medium ri-logout-box-r-line"></i>
                    </Link>
                </div>
            </div>

            <Sidebar open={sidebarOpen} onClose={closeSidebar}>
                <div className='p-4 sm:p-6 relative'>
                    <div className='flex items-center justify-between mb-6 sm:mb-8'>
                        <h2 className='text-lg sm:text-xl font-semibold'>Menu</h2>
                        <button 
                            onClick={closeSidebar}
                            className='h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center rounded-full hover:bg-gray-100'
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                    <div className='space-y-3 sm:space-y-4'>
                        <Link 
                            to='/user/profile'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-user-line"></i>
                            <span className="text-sm sm:text-base">Profile</span>
                        </Link>
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <button 
                            onClick={() => setShowRides(!showRides)}
                            className='w-full flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50'
                        >
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <i className="text-lg sm:text-xl ri-route-line"></i>
                                <span className="text-sm sm:text-base">My Rides</span>
                            </div>
                            <i className={`ri-arrow-${showRides ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showRides && (
                            <div className='px-2 sm:px-3'>
                                <RideHistory isCaptain={false} />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <button 
                            onClick={() => setShowPayments(!showPayments)}
                            className='w-full flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50'
                        >
                            <div className='flex items-center gap-2 sm:gap-3'>
                                <i className="text-lg sm:text-xl ri-bank-card-line"></i>
                                <span className="text-sm sm:text-base">Payments</span>
                            </div>
                            <i className={`ri-arrow-${showPayments ? 'up' : 'down'}-s-line`}></i>
                        </button>
                        {showPayments && (
                            <div className='px-2 sm:px-3'>
                                <PaymentHistory />
                            </div>
                        )}
                        <div className='border-t border-gray-100 my-3 sm:my-4'></div>
                        <Link 
                            to='/user/settings'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-settings-3-line"></i>
                            <span className="text-sm sm:text-base">Settings</span>
                        </Link>
                        <Link 
                            to='/user/logout'
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50'
                            onClick={closeSidebar}
                        >
                            <i className="text-lg sm:text-xl ri-logout-box-r-line"></i>
                            <span className="text-sm sm:text-base">Logout</span>
                        </Link>
                    </div>
                </div>
            </Sidebar>

            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-4 sm:p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 right-4 sm:right-6 top-4 sm:top-6 text-xl sm:text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-xl sm:text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-2 sm:py-3' onSubmit={submitHandler}>
                        <div className="line absolute h-12 sm:h-16 w-1 top-[50%] -translate-y-1/2 left-4 sm:left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-8 sm:px-12 py-2 text-base sm:text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-8 sm:px-12 py-2 text-base sm:text-lg rounded-lg w-full mt-2 sm:mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-3 sm:px-4 py-2 rounded-lg mt-2 sm:mt-3 w-full text-sm sm:text-base'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 sm:py-10 pt-10 sm:pt-12'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 sm:py-6 pt-10 sm:pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 sm:py-6 pt-10 sm:pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-4 sm:py-6 pt-10 sm:pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    )
}

export default Home