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