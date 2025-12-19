import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './components/Boot/BootSequence';
import LoginScreen from './components/Login/LoginScreen';
import Desktop from './components/Desktop/Desktop';

const App = () => {
  const [phase, setPhase] = useState('BOOT'); // BOOT, LOGIN, DESKTOP, SHUTDOWN

  useEffect(() => {
    if (phase === 'SHUTDOWN') {
      const timer = setTimeout(() => {
        window.close(); // Attempt to close
        // If it fails (security), show a message
        document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#333;font-family:monospace'>System Halted. You may close this tab.</div>";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#121212', // Ambient room background
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Monitor Bezel */}
      <div style={{
        width: '98vw',
        height: '95vh',
        maxWidth: '1920px',
        maxHeight: '1200px',
        background: '#050505',
        padding: '25px 25px 60px 25px', // Larger bezel, thicker chin
        borderRadius: '20px',
        boxShadow: '0 0 0 2px #333, 0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Screen Area */}
        <div style={{
          flex: 1,
          position: 'relative',
          background: '#000',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid #333'
        }}>
          <AnimatePresence mode="wait">
            {phase === 'BOOT' && (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                <BootSequence onComplete={() => setPhase('LOGIN')} />
              </motion.div>
            )}
            {phase === 'LOGIN' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                <LoginScreen onLogin={() => setPhase('DESKTOP')} />
              </motion.div>
            )}
            {phase === 'DESKTOP' && (
              <motion.div
                key="desktop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                <Desktop onShutdown={() => setPhase('SHUTDOWN')} />
              </motion.div>
            )}
            {phase === 'SHUTDOWN' && (
              <motion.div
                key="shutdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="shutdown-screen"
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'black', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <h1 style={{ color: 'white', fontFamily: 'monospace' }}>SHUTTING DOWN...</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Branding / Power LED */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ color: '#555', fontFamily: 'sans-serif', fontWeight: '600', letterSpacing: '2px', fontSize: '14px', textTransform: 'uppercase' }}>LEGION</span>
          <div style={{ width: '4px', height: '4px', background: phase === 'SHUTDOWN' ? '#330000' : '#ccc', borderRadius: '50%', boxShadow: phase === 'SHUTDOWN' ? 'none' : '0 0 5px #ccc' }}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
