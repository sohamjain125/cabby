import React, { useState } from 'react';

const DummyPaymentModal = ({ open, amount, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!open) return null;

    const handlePay = () => {
        console.log('Pay Now button clicked');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                console.log('Payment simulation complete');
                setSuccess(false);
                onSuccess();
                onClose();
            }, 1200);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-[90%] sm:w-full max-w-xs flex flex-col items-center relative">
                <button onClick={onClose} className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl">&times;</button>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Make Payment</h2>
                <div className="mb-4 sm:mb-6 text-base sm:text-lg">Amount: <span className="font-semibold text-green-600">{amount}</span></div>
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-1 sm:mb-2"></div>
                        <span className="text-pink-600 text-sm sm:text-base">Processing Payment...</span>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center">
                        <i className="ri-checkbox-circle-fill text-3xl sm:text-4xl text-green-500 mb-1 sm:mb-2"></i>
                        <span className="text-green-700 font-semibold text-sm sm:text-base">Payment Successful!</span>
                    </div>
                ) : (
                    <button onClick={handlePay} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow transition-all text-sm sm:text-base">Pay Now</button>
                )}
            </div>
        </div>
    );
};

export default DummyPaymentModal; 