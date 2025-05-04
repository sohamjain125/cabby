import React from 'react'

const PaymentHistory = () => {
    const dummyPayments = [
        {
            id: 1,
            date: '2024-03-15',
            amount: '₹1,250',
            type: 'UPI',
            status: 'Success',
            description: 'Weekly earnings'
        },
        {
            id: 2,
            date: '2024-03-14',
            amount: '₹850',
            type: 'Cash',
            status: 'Success',
            description: 'Daily earnings'
        },
        {
            id: 3,
            date: '2024-03-13',
            amount: '₹1,500',
            type: 'UPI',
            status: 'Success',
            description: 'Weekly bonus'
        }
    ]

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <div className="space-y-4">
                {dummyPayments.map((payment) => (
                    <div key={payment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-medium">{payment.description}</p>
                                <p className="text-sm text-gray-500">{payment.date}</p>
                            </div>
                            <span className="text-green-600 font-medium">{payment.amount}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-600">
                                {payment.type}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {payment.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentHistory 