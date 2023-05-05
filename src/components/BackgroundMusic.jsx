
import { useState } from 'react'
import useSound from 'use-sound'
import gameSong from './audio/sneaky.mp3'

function BackgroundMusic(){
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, {pause}] = useSound(gameSong, { 
            volume:0.1, 
            onPlay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false)
        })
    
    const togglePlay = () => {
        if(isPlaying){
            pause();
        } else {
            play();
        }
        setIsPlaying(!isPlaying)
    }
    
    return(
       <button onClick={() => togglePlay()}>
        Play/Stop
       </button>
            
    )
}
export default BackgroundMusic;