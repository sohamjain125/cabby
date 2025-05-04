import React from 'react'

const RideHistory = () => {
    const dummyRides = [
        {
            id: 1,
            date: '2024-03-15',
            time: '09:30 AM',
            from: 'Koramangala',
            to: 'Indiranagar',
            fare: '₹250',
            status: 'Completed',
            passenger: 'Rahul Sharma'
        },
        {
            id: 2,
            date: '2024-03-14',
            time: '02:15 PM',
            from: 'HSR Layout',
            to: 'Electronic City',
            fare: '₹350',
            status: 'Completed',
            passenger: 'Priya Patel'
        },
        {
            id: 3,
            date: '2024-03-13',
            time: '11:45 AM',
            from: 'Whitefield',
            to: 'Marathahalli',
            fare: '₹180',
            status: 'Completed',
            passenger: 'Arjun Reddy'
        }
    ]

    return (
        <div className="p-2">
            <h2 className="text-lg font-semibold mb-2">Recent Rides</h2>
            <div className="space-y-2">
                {dummyRides.map((ride) => (
                    <div key={ride.id} className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <p className="font-medium text-base">{ride.passenger}</p>
                                <p className="text-xs text-gray-500">{ride.date} at {ride.time}</p>
                            </div>
                            <span className="text-green-600 font-medium text-base">{ride.fare}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                            <p>From: {ride.from}</p>
                            <p>To: {ride.to}</p>
                        </div>
                        <div className="mt-1">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                {ride.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RideHistory 