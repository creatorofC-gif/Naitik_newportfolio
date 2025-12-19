import React from 'react';

const DesktopIcon = ({ icon: Icon, label, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80px',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '5px',
                transition: 'background 0.2s',
                marginBottom: '10px'
            }}
            className="desktop-icon"
        >
            <div style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                marginBottom: '5px',
                color: '#00ffd5',
                fontSize: '24px'
            }}>
                <Icon />
            </div>
            <span style={{
                color: '#fff',
                fontSize: '12px',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                textAlign: 'center'
            }}>
                {label}
            </span>
            <style>{`
        .desktop-icon:hover { background: rgba(255, 255, 255, 0.1); }
        .desktop-icon:active { transform: scale(0.95); }
      `}</style>
        </div>
    );
};

export default DesktopIcon;
