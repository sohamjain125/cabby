import React, { useState } from 'react';

const DummyPaymentModal = ({ open, amount, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!open) return null;

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onSuccess();
                onClose();
            }, 1200);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs flex flex-col items-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                <h2 className="text-xl font-bold mb-4">Make Payment</h2>
                <div className="mb-6 text-lg">Amount: <span className="font-semibold text-green-600">{amount}</span></div>
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-pink-600">Processing Payment...</span>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center">
                        <i className="ri-checkbox-circle-fill text-4xl text-green-500 mb-2"></i>
                        <span className="text-green-700 font-semibold">Payment Successful!</span>
                    </div>
                ) : (
                    <button onClick={handlePay} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-2 rounded-lg shadow transition-all">Pay Now</button>
                )}
            </div>
        </div>
    );
};

export default DummyPaymentModal; 