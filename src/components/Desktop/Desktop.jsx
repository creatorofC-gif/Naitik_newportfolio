import React, { useState } from 'react';
import { FaDesktop, FaTrash, FaGlobe,FaPowerOff } from 'react-icons/fa';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import MyComputer from '../Apps/MyComputer';
import Browser from '../Apps/Browser';

// Placeholder for now
const RecycleBin = () => <div style={{ padding: '20px', color: '#fff' }}>Recycle Bin is empty.</div>;

const APPS = [
    { id: 'my_computer', title: 'My Computer', icon: FaDesktop, component: MyComputer },
    { id: 'browser', title: 'Web Browser', icon: FaGlobe, component: Browser },
    { id: 'recycle_bin', title: 'Recycle Bin', icon: FaTrash, component: RecycleBin },
];

const Desktop = ({ onShutdown }) => {
    const [windows, setWindows] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(1);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const openWindow = (appId) => {
        if (windows.find(w => w.id === appId)) {
            focusWindow(appId);
            return;
        }
        const app = APPS.find(a => a.id === appId);
        setWindows([...windows, { ...app, zIndex: zIndexCounter }]);
        setZIndexCounter(prev => prev + 1);
        setActiveWindowId(appId);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const focusWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, zIndex: zIndexCounter } : w));
        setZIndexCounter(prev => prev + 1);
        setActiveWindowId(id);
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #0a1020 0%, #000 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'linear-gradient(rgba(0, 255, 213, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 213, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* Desktop Icons Area */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {APPS.map(app => (
                    <DesktopIcon
                        key={app.id}
                        icon={app.icon}
                        label={app.title}
                        onClick={() => openWindow(app.id)}
                    />
                ))}
            </div>

            {/* Windows Layer */}
            {windows.map(win => {
                const AppContent = win.component;
                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        onClose={closeWindow}
                        zIndex={win.zIndex}
                        onFocus={focusWindow}
                    >
                        <AppContent />
                    </Window>
                );
            })}

            {/* Taskbar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '48px',
                background: 'rgba(10, 15, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                zIndex: 10000
            }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{
                        width: '32px', height: '32px', background: '#00ffd5', borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold'
                    }}>
                        <span>D</span>
                    </div>
                </div>

                <div style={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}>
                    {new Date().toLocaleTimeString()}
                </div>

                <button
                    onClick={onShutdown}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ff0055',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    title="Shutdown"
                >
                    <FaPowerOff />
                </button>
            </div>
        </div>
    );
};

export default Desktop;
