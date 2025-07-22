import React from 'react';

export default function Popup({ onClose, children }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                {children}
                <button onClick={onClose} style={{
                backgroundImage: 'linear-gradient(to right, pink, purple , blue)',
                color: 'white',
                padding: '1vw 2vw',
                border: "none",
                fontSize: "2vw",
                borderRadius: "15%"
            }} > Got my bag.... let's go!!
            </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
    },
    popup: {
        background: '#4b4d49',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
    },
    button: {
        marginTop: '1rem'
    }
};
