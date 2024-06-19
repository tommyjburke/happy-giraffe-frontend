import React from 'react'
import { useEffect, useState } from 'react'

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

   useEffect(() => {
      const interval = setInterval(() => {
         setGiraffeX((prevX) => (prevX - 5) % 100)
      }, 500)
      return () => clearInterval(interval)
   }, [])

   return (
      <div style={{ marginLeft: '50px' }}>
         <div
            className='largeIcon jumpingGiraffe'
            style={{
               display: 'inline-block',
               whiteSpace: 'nowrap',
               marginLeft: `${giraffeX}px`,
            }}
         >
            🦒
         </div>
      </div>
   )
}
