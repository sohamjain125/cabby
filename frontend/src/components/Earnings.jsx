import React from 'react'

const Earnings = () => {
    const dummyEarnings = {
        today: {
            amount: '₹2,450',
            rides: 8,
            hours: 6
        },
        thisWeek: {
            amount: '₹12,800',
            rides: 42,
            hours: 36
        },
        thisMonth: {
            amount: '₹48,500',
            rides: 156,
            hours: 120
        }
    }

    return (
        <div className="p-2">
            <h2 className="text-lg font-semibold mb-2">Earnings</h2>
            <div className="space-y-2">
                <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
                    <h3 className="text-base font-medium mb-1">Today</h3>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-bold text-green-600">{dummyEarnings.today.amount}</span>
                        <span className="text-xs text-gray-500">{dummyEarnings.today.rides} rides</span>
                    </div>
                    <p className="text-xs text-gray-600">{dummyEarnings.today.hours} hours online</p>
                </div>

                <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
                    <h3 className="text-base font-medium mb-1">This Week</h3>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-bold text-green-600">{dummyEarnings.thisWeek.amount}</span>
                        <span className="text-xs text-gray-500">{dummyEarnings.thisWeek.rides} rides</span>
                    </div>
                    <p className="text-xs text-gray-600">{dummyEarnings.thisWeek.hours} hours online</p>
                </div>

                <div className="bg-white p-2 rounded-md shadow-sm border border-gray-100">
                    <h3 className="text-base font-medium mb-1">This Month</h3>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-lg font-bold text-green-600">{dummyEarnings.thisMonth.amount}</span>
                        <span className="text-xs text-gray-500">{dummyEarnings.thisMonth.rides} rides</span>
                    </div>
                    <p className="text-xs text-gray-600">{dummyEarnings.thisMonth.hours} hours online</p>
                </div>
            </div>
        </div>
    )
}

export default Earnings 