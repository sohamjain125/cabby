
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Start = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-white to-blue-200 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-100 rounded-full opacity-40 z-0 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-100 rounded-full opacity-40 z-0 animate-pulse"></div>
        <div className="relative z-10 w-full flex flex-col items-center">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center border border-pink-100">
                <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 border-4 border-pink-200">
                    <img src={logo} alt="Cabby Logo" className="w-20 h-20 object-contain" />
                </div>
                <h1 className="text-4xl font-extrabold text-pink-700 mb-2 tracking-tight text-center drop-shadow">Welcome to Cabby</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">A Safe Ride-Hailing App for Women, by Women</h2>
                <p className="text-gray-600 text-center mb-8 text-lg">
                    <span className="font-semibold text-pink-600">Cabby</span> is an Uber-like platform designed exclusively for female drivers and female passengers. Our mission is to empower women with safe, reliable, and comfortable transportation—whether you're commuting, running errands, or exploring the city. All drivers on Cabby are women, and only women can book rides, ensuring a secure and supportive environment for every journey.
                </p>
                <ul className="text-left text-gray-700 mb-8 list-disc pl-8 text-base w-full max-w-md mx-auto">
                    <li>100% female drivers and passengers</li>
                    <li>Verified profiles for safety</li>
                    <li>Real-time ride tracking</li>
                    <li>Easy booking and cashless payments</li>
                    <li>Empowering women through flexible work</li>
                </ul>
                <Link to="/login" className="w-full flex justify-center">
                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    </div>
);
}

export default Start