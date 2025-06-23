import React, { useState, useEffect } from 'react';

const pads = [
    { key: 'Q', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', name: 'Heater 1' },
    { key: 'W', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', name: 'Heater 2' },
    { key: 'E', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', name: 'Heater 3' },
    { key: 'A', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', name: 'Heater 4' },
    { key: 'S', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', name: 'Clap' },
    { key: 'D', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', name: 'Open-HH' },
    { key: 'Z', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', name: "Kick-n'-Hat" },
    { key: 'X', clip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', name: 'Kick' },
    { key: 'C', clip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', name: 'Closed-HH' },
];

function DrumMachine() {
    const [display, setDisplay] = useState('');

    const playSound = (key) => {
        const audio = document.getElementById(key);
        if (audio) {
            audio.currentTime = 0; // rewind
            audio.play();
            const pad = pads.find(p => p.key === key);
            if (pad) setDisplay(pad.name);
        }
    };

    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase();
        if (pads.some(p => p.key === key)) {
            playSound(key);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div id="drum-machine" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Drum Machine</h1>
            <div id="display" style={{ marginBottom: '20px', fontSize: '1.5rem', minHeight: '2rem' }}>
                {display}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '20px', justifyContent: 'center' }}>
                {pads.map(pad => (
                    <div
                        key={pad.key}
                        className="drum-pad"
                        id={pad.name}
                        style={{
                            border: '2px solid #333',
                            borderRadius: '8px',
                            padding: '30px',
                            cursor: 'pointer',
                            backgroundColor: '#eee',
                            userSelect: 'none'
                        }}
                        onClick={() => playSound(pad.key)}
                    >
                        {pad.key}
                        <audio className="clip" id={pad.key} src={pad.clip}></audio>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DrumMachine;
