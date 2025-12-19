import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// OrbitControls, Stars, Float are removed
import gsap from 'gsap';

// ... StarLayer and StarField definitions ...
const StarLayer = ({ count, depth, speed }) => {
    const points = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 120;
            pos[i + 1] = (Math.random() - 0.5) * 120;
            pos[i + 2] = depth;
        }
        return pos;
    }, [count, depth]);

    useFrame(() => {
        if (points.current) {
            points.current.rotation.y += speed * 0.002;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial color={0x9fb3ff} size={0.4} transparent opacity={0.6} sizeAttenuation={true} />
        </points>
    );
};

const StarField = () => {
    useFrame((state) => {
        const { mouse, camera } = state;
        // Parallax effect
        camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.04;
    });

    return (
        <>
            <StarLayer count={1200} depth={-60} speed={0.015} />
            <StarLayer count={800} depth={-40} speed={0.03} />
            <StarLayer count={400} depth={-20} speed={0.06} />
            <ambientLight intensity={0.5} />
        </>
    );
};

const LoginScreen = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();

    const handleLogin = () => {
        setLoading(true);
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: onLogin
        });
    };

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Wallpaper Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)', // Abstract Blue
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.8)'
            }} />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.15)', // Lighter glass for Windows feel
                backdropFilter: 'blur(20px)',
                padding: '3rem',
                borderRadius: '20px', // Softer corners
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '320px'
            }}>

                <div style={{ position: 'relative' }}>
                    <img
                        src="src/assets/Images/Screenshot 2025-12-19 144508.png"
                        alt="User"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.5)', marginBottom: '0.5rem', objectFit: 'cover' }}
                    />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'normal' }}>Welcome to Naitik's Portfolio</h3>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '10px 24px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px',
                        color: '#fff',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        transition: 'all 0.2s',
                        opacity: loading ? 0.7 : 1
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
