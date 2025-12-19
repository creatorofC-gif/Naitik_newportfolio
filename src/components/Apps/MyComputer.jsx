import React, { useState } from 'react';
import { FaFolder, FaFileAlt, FaDesktop, FaHdd, FaArrowLeft } from 'react-icons/fa';

const MyComputer = () => {
    const [path, setPath] = useState('/'); // '/' or '/about' or '/skills'

    const renderContent = () => {
        if (path === '/') {
            return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '20px' }}>
                    <div className="file-item" onClick={() => setPath('/about')}>
                        <FaFolder size={40} color="#f8d775" />
                        <span>About Me</span>
                    </div>
                    <div className="file-item" onClick={() => setPath('/skills')}>
                        <FaFolder size={40} color="#f8d775" />
                        <span>Skills</span>
                    </div>
                    <div className="file-item">
                        <FaHdd size={40} color="#aaa" />
                        <span>Local Disk (C:)</span>
                    </div>
                </div>
            );
        } else if (path === '/about') {
            return (
                <div style={{ padding: '10px' }}>
                    <h2 style={{ color: '#00ffd5' }}>About Me</h2>
                    <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
                        Hello! I'm a passionate Software Developer with a knack for building immersive web experiences.
                        I specialize in JavaScript, React, and 3D web technologies.
                    </p>
                </div>
            );
        } else if (path === '/skills') {
            return (
                <div style={{ padding: '10px' }}>
                    <h2 style={{ color: '#00ffd5' }}>Technical Skills</h2>
                    <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}><strong style={{ color: '#fff' }}>Frontend:</strong> React, Vue, Three.js, GSAP, Tailwind</li>
                    </ul>
                </div>
            );
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
            {/* Toolbar */}
            <div style={{
                padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(0,0,0,0.2)'
            }}>
                <button
                    disabled={path === '/'}
                    onClick={() => setPath('/')}
                    style={{ background: 'none', border: 'none', color: path === '/' ? '#555' : '#fff', cursor: 'pointer' }}
                >
                    <FaArrowLeft size={16} />
                </button>
                <div style={{
                    flex: 1, background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace'
                }}>
                    My Computer{path}
                </div>
            </div>

            {/* View Area */}
            <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
                {renderContent()}
            </div>

            <style>{`
                .file-item { 
                    display: flex; flex-direction: column; alignItems: center; text-align: center; cursor: pointer; 
                    padding: 10px; border-radius: 5px; transition: background 0.2s;
                }
                .file-item:hover { background: rgba(255, 255, 255, 0.1); }
                .file-item span { margin-top: 5px; font-size: 12px; }
            `}</style>
        </div>
    );
};

export default MyComputer;
