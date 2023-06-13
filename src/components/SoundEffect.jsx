/**
 * File: Soundeffect.jsx 
 * 
 * This file contains the chew-soundeffect component for the application
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
import React, { useRef } from 'react';

const SoundEffect = () => {
    const audioRef = useRef(null);

    return(
        <audio ref={audioRef}>
            <source src='sound.mp3' type='audio/mpeg'/>
            <p>
                Your browser does not support the audio element.</p>
            
        </audio>
    );
};

export default SoundEffect;