import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Sidebar = ({ open, onClose, children, width = 'w-64', zIndex = 'z-40' }) => {
    const sidebarRef = useRef(null);

    // Set initial transform
    useEffect(() => {
        if (sidebarRef.current) {
            gsap.set(sidebarRef.current, { x: '-100%' });
        }
    }, []);

    // Animate sidebar in/out
    useEffect(() => {
        if (sidebarRef.current) {
            if (open) {
                gsap.to(sidebarRef.current, { x: 0, duration: 0.3 });
            } else {
                gsap.to(sidebarRef.current, { x: '-100%', duration: 0.3 });
            }
        }
    }, [open]);

    if (!open) return null;

    // Helper to wrap children and inject close button log
    const childrenWithCloseLog = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClose: (...args) => {
                    console.log('Sidebar close button clicked');
                    if (child.props.onClose) child.props.onClose(...args);
                    onClose(...args);
                }
            });
        }
        return child;
    });

    return (
        <>
            {/* Overlay */}
            <div className={`fixed inset-0 z-30`}  onClick={() => { console.log('Sidebar overlay clicked'); onClose(); }}></div>
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-screen ${width} bg-white shadow-lg ${zIndex} overflow-y-auto`}
                style={{ willChange: 'transform' }}
            >
                {childrenWithCloseLog}
            </div>
        </>
    );
};

export default Sidebar; 