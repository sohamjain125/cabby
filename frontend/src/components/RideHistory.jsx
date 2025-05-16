import React, { useState } from 'react'
import DummyPaymentModal from './DummyPaymentModal'

const RideHistory = ({ isCaptain }) => {
    const userRides = [
        {
            id: 1,
            date: '2024-03-15',
            time: '09:30 AM',
            from: 'Medicaps University',
            to: 'Silicon City',
            fare: '₹167',
            status: 'Completed',
            passenger: 'You',
            paid: false
        },
        {
            id: 2,
            date: '2024-03-14',
            time: '02:15 PM',
            from: 'HSR Layout',
            to: 'Electronic City',
            fare: '₹350',
            status: 'Completed',
            passenger: 'You',
            paid: true
        },
        {
            id: 3,
            date: '2024-03-13',
            time: '11:45 AM',
            from: 'Whitefield',
            to: 'Marathahalli',
            fare: '₹180',
            status: 'Completed',
            passenger: 'You',
            paid: false
        }
    ];

    const captainRides = [
        {
            id: 1,
            date: '2024-03-15',
            time: '09:30 AM',
            from: 'Medicaps University',
            to: 'Silicon City',
            fare: '₹167',
            status: 'Completed',
            passenger: 'Female User',
            paid: false
        },
        {
            id: 2,
            date: '2024-03-14',
            time: '02:15 PM',
            from: 'HSR Layout',
            to: 'Electronic City',
            fare: '₹350',
            status: 'Completed',
            passenger: 'Priya Patel',
            paid: true
        },
        {
            id: 3,
            date: '2024-03-13',
            time: '11:45 AM',
            from: 'Whitefield',
            to: 'Marathahalli',
            fare: '₹180',
            status: 'Completed',
            passenger: 'Arjun Reddy',
            paid: false
        }
    ];

    const [rides, setRides] = useState(isCaptain ? captainRides : userRides);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRide, setSelectedRide] = useState(null)

    const handleMakePayment = (ride) => {
        console.log('Make Payment clicked for ride:', ride);
        console.log('Current modal state before opening:', modalOpen);
        setSelectedRide(ride);
        setModalOpen(true);
        console.log('Modal state after opening:', modalOpen);
    }

    const handlePaymentSuccess = () => {
        console.log('Payment success handler called');
        console.log('Selected ride:', selectedRide);
        setRides(rides.map(r =>
            r.id === selectedRide.id ? { ...r, paid: true } : r
        ));
        console.log('Rides after payment:', rides);
    }

    return (
        <div className="p-1 sm:p-2">
            <h2 className="text-base sm:text-lg font-semibold mb-2">Recent Rides</h2>
            <div className="space-y-1 sm:space-y-2">
                {rides.map((ride) => (
                    <div key={ride.id} className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <p className="font-medium text-sm sm:text-base">{ride.passenger}</p>
                                <p className="text-xs text-gray-500">{ride.date} at {ride.time}</p>
                            </div>
                            <span className="text-green-600 font-medium text-sm sm:text-base">{ride.fare}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                            <p>From: {ride.from}</p>
                            <p>To: {ride.to}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-1 sm:gap-2">
                            <span className="px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                {ride.status}
                            </span>
                            {ride.paid ? (
                                <span className="px-1.5 sm:px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                                    {isCaptain ? 'Payment Received' : 'Paid'}
                                </span>
                            ) : (
                                isCaptain ? (
                                    <span className="px-1.5 sm:px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                        Awaiting Payment
                                    </span>
                                ) : (
                                    <button
                                        className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-pink-600 text-white rounded text-xs hover:bg-pink-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleMakePayment(ride);
                                        }}
                                    >
                                        Make Payment
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <DummyPaymentModal
                open={modalOpen}
                amount={selectedRide?.fare}
                onClose={() => {
                    console.log('Modal close button clicked');
                    setModalOpen(false);
                }}
                onSuccess={handlePaymentSuccess}
            />
        </div>
    )
}

export default RideHistory 