import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaHome, FaSearch } from 'react-icons/fa';

const Browser = () => {
    const [url, setUrl] = useState('https://google.com');
    const [displayUrl, setDisplayUrl] = useState('https://google.com');
    const [content, setContent] = useState('home'); // home, work, contact, 404

    const handleNavigate = (e) => {
        e.preventDefault();
        const query = displayUrl.toLowerCase();
        if (query.includes('work')) {
            setContent('work');
            setUrl('https://devos.net/works');
        } else if (query.includes('contact')) {
            setContent('contact');
            setUrl('https://devos.net/contact');
        } else if (query.includes('google')) {
            setContent('home');
            setUrl('https://google.com');
        } else {
            setContent('404');
            setUrl(displayUrl);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1a1a2e', color: '#e0e0e0', borderRadius: '0 0 8px 8px' }}>
            {/* Browser Toolbar */}
            <div style={{
                display: 'flex', gap: '10px', padding: '10px', background: '#16213e', borderBottom: '1px solid #0f3460', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '8px', color: '#a0a0a0' }}>
                    <FaArrowLeft className="browser-btn" />
                    <FaArrowRight className="browser-btn" />
                    <FaRedo className="browser-btn" onClick={() => setContent(content)} />
                    <FaHome className="browser-btn" onClick={() => { setDisplayUrl('https://google.com'); setContent('home'); }} />
                </div>
                <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex' }}>
                    <input
                        type="text"
                        value={displayUrl}
                        onChange={(e) => setDisplayUrl(e.target.value)}
                        style={{
                            width: '100%', padding: '6px 15px', borderRadius: '20px', border: '1px solid #0f3460', outline: 'none', background: '#0f3460', color: '#fff', fontSize: '14px', fontFamily: 'monospace'
                        }}
                    />
                </form>
            </div>

            {/* Browser Content */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: '#1a1a2e' }}>
                {content === 'home' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', letterSpacing: '-2px', marginBottom: '20px', background: 'linear-gradient(to right, #00ffd5, #7000ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DevSearch</h1>
                        <div style={{ position: 'relative', width: '500px', maxWidth: '90%' }}>
                            <FaSearch style={{ position: 'absolute', left: '15px', top: '14px', color: '#666' }} />
                            <input
                                type="text"
                                placeholder="Search the web or type a URL"
                                style={{ width: '100%', padding: '12px 45px', borderRadius: '30px', border: '1px solid #333', outline: 'none', background: '#16213e', color: '#fff', fontSize: '16px' }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setDisplayUrl(e.target.value);
                                        // Trigger logic
                                        const query = e.target.value.toLowerCase();
                                        if (query.includes('work')) { setContent('work'); setDisplayUrl('https://devos.net/works'); }
                                        else if (query.includes('contact')) { setContent('contact'); setDisplayUrl('https://devos.net/contact'); }
                                        else setContent('404');
                                    }
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '30px', color: '#888', display: 'flex', gap: '15px' }}>
                            <span className="bookmark" onClick={() => { setContent('work'); setDisplayUrl('https://devos.net/works'); }}>Works</span>
                            <span className="bookmark" onClick={() => { setContent('contact'); setDisplayUrl('https://devos.net/contact'); }}>Contact</span>
                        </div>
                    </div>
                )}

                {content === 'work' && (
                    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                        <h1 style={{ borderBottom: '2px solid #00ffd5', paddingBottom: '10px', color: '#fff' }}>My Projects</h1>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
                            <div className="project-card">
                                <div style={{ height: '180px', background: 'linear-gradient(45deg, #222, #333)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '3rem' }}>🚀</span>
                                </div>
                                <div style={{ padding: '20px', background: '#16213e' }}>
                                    <h3 style={{ color: '#00ffd5' }}>Portfolio V1</h3>
                                    <p style={{ marginTop: '10px', color: '#ccc' }}>A 3D interactive portfolio built with React & Three.js. Features a simulated OS environment.</p>
                                </div>
                            </div>
                            <div className="project-card">
                                <div style={{ height: '180px', background: 'linear-gradient(45deg, #1e3c72, #2a5298)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '3rem' }}>🛒</span>
                                </div>
                                <div style={{ padding: '20px', background: '#16213e' }}>
                                    <h3 style={{ color: '#00ffd5' }}>E-Commerce Platform</h3>
                                    <p style={{ marginTop: '10px', color: '#ccc' }}>Full stack MERN application with Stripe payments, user authentication, and admin dashboard.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {content === 'contact' && (
                    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                        <h1 style={{ color: '#fff' }}>Get In Touch</h1>
                        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#aaa' }}>Have a project in mind?</p>
                        <div style={{ background: '#16213e', padding: '40px', borderRadius: '15px', textAlign: 'left', border: '1px solid #333' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>Email</label>
                                <div style={{ fontSize: '1.2rem', color: '#00ffd5' }}>naitik@devos.net</div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', color: '#888', marginBottom: '5px' }}>Socials</label>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>LinkedIn</a>
                                    <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>GitHub</a>
                                    <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Twitter</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {content === '404' && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '5rem', color: '#333' }}>404</h1>
                        <p style={{ color: '#666' }}>Site not found on this server.</p>
                    </div>
                )}
            </div>
            <style>{`
        .browser-btn { cursor: pointer; padding: 5px; border-radius: 50%; width: 28px; height: 28px; transition: background 0.2s; }
        .browser-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .project-card { border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
        .bookmark { cursor: pointer; background: #16213e; padding: 5px 15px; border-radius: 15px; font-size: 0.9rem; transition: background 0.2s; }
        .bookmark:hover { background: #0f3460; color: #fff; }
      `}</style>
        </div>
    );
};

export default Browser;
