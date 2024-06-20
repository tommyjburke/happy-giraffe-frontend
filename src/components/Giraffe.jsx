import React from 'react'
import { useEffect, useState } from 'react'
import giraffeSound from '../media/giraffe.mp3'
import useSound from 'use-sound'

const styles = {
   '@keyframes rotate': {
      from: {
         transform: 'rotate(0deg)',
      },
      to: {
         transform: 'rotate(360deg)',
      },
   },
   giraffe: {
      animation: 'rotate 1s linear infinite',
      display: 'inline-block',
   },
}
export default function Giraffe() {
   const [giraffeX, setGiraffeX] = useState(0)
   const [playGiraffeSound] = useSound(giraffeSound, {
      volume: 0.5,
   })

   useEffect(() => {
      const interval = setInterval(() => {
         setGiraffeX((prevX) => (prevX - 5) % 100)
      }, 200)
      return () => clearInterval(interval)
   }, [])

   return (
      <div
         className='unselectable'
         style={{ marginLeft: '50px' }}
      >
         <div
            onClick={() => playGiraffeSound()}
            className='largeIcon jumpingGiraffe'
            style={{
               display: 'inline-block',
               whiteSpace: 'nowrap',
               marginLeft: `${giraffeX}px`,
               cursor: 'grabbing',
            }}
         >
            🦒
         </div>
      </div>
   )
}
