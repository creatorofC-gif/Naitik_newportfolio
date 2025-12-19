import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const bootLines = [
    "Initializing BIOS...",
    "Checking memory...",
    "Loading kernel modules...",
    "Mounting file systems...",
    "Connecting to neural network...",
    "Authenticating user...",
    "Starting visual interface...",
    "System Ready."
];

const BootSequence = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);

    const hasStarted = useRef(false);

    useEffect(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;

        let delay = 0;
        bootLines.forEach((line, index) => {
            delay += Math.random() * 500 + 200; // Random delay
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                // Scroll to bottom
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
                if (index === bootLines.length - 1) {
                    setTimeout(onComplete, 800);
                }
            }, delay);
        });
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            style={{
                backgroundColor: '#000',
                color: '#0f0',
                fontFamily: "'Fira Code', monospace",
                height: '100%',
                padding: '2rem',
                overflowY: 'auto',
                fontSize: '14px',
                lineHeight: '1.5'
            }}
        >
            {lines.map((line, i) => (
                <div key={i}>{`> ${line}`}</div>
            ))}
            <div className="cursor-blink">_</div>
            <style>{`
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
        </div>
    );
};

export default BootSequence;
