import React, { useState, useRef, useEffect } from 'react';
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import { motion, useDragControls } from 'framer-motion'; // Ah, I didn't install framer-motion.
// I will use standard CSS + Mouse Events for dragging or just static center modal for simplicity if dragging is too complex for one file without libraries.
// Actually, simple dragging is easy. 

const Window = ({ id, title, onClose, children, zIndex, onFocus }) => {
    const [position, setPosition] = useState({ x: 100 + Math.random() * 50, y: 50 + Math.random() * 50 });
    const windowRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleMouseDown = (e) => {
        onFocus(id);
        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={windowRef}
            style={{
                position: 'absolute',
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
                width: isMaximized ? '100%' : '600px',
                maxWidth: isMaximized ? '100%' : '90vw',
                height: isMaximized ? 'calc(100% - 48px)' : '400px', // Subtract taskbar height if needed, or 100%
                backgroundColor: 'rgba(10, 15, 30, 0.95)',
                backdropFilter: 'blur(12px)',
                border: isMaximized ? 'none' : '1px solid rgba(0, 255, 213, 0.3)',
                borderRadius: isMaximized ? 0 : '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: zIndex,
                overflow: 'hidden',
                animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transition: 'all 0.3s ease'
            }}
            onMouseDown={() => onFocus(id)}
        >
            {/* Title Bar */}
            <div
                onMouseDown={isMaximized ? undefined : handleMouseDown}
                style={{
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                    cursor: isMaximized ? 'default' : 'grab',
                    userSelect: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* macOS style buttons or just icons */}
                    <span style={{ color: '#00ffd5', fontWeight: 'bold', fontFamily: 'var(--font-code)' }}>{title}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <VscChromeMinimize className="window-control" />
                    <VscChromeMaximize className="window-control" onClick={toggleMaximize} />
                    <VscChromeClose className="window-control close" onClick={() => onClose(id)} />
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem', color: '#fff' }}>
                {children}
            </div>

            <style>{`
        .window-control { cursor: pointer; color: #8892b0; transition: color 0.2s; }
        .window-control:hover { color: #fff; }
        .window-control.close:hover { color: #ff0055; }
        @keyframes popIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Window;
