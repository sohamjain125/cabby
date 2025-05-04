import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Settings = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-sm z-50">
                <img className="w-25 h-20" src={logo} alt="Cabby Logo" />
                <Link to="/" className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-arrow-left-line"></i>
                </Link>
            </div>
            <div className="pt-32 w-full max-w-md px-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
                    <div className="space-y-4">
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <i className="text-xl ri-edit-line"></i>
                                <span>Edit Profile</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <i className="text-xl ri-lock-line"></i>
                                <span>Change Password</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <i className="text-xl ri-notification-3-line"></i>
                                <span>Notification Preferences</span>
                            </div>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 