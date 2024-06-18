import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
// import click from './click.mp3'
// import ding from './ding.mp3'
// import countdown2 from '../media/countdown2.mp3'
import tickSound from '../media/tick.mp3'

function CountdownTimer({ duration, onTimeUp }) {
   const [playClick] = useSound(tickSound, { volume: 0.1 })
   //    const [playDing] = useSound(ding)
   const [timeRemaining, setTimeRemaining] = useState(duration)

   const sayTimeUp = () => {
      const text = 'TIMES UP!'
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      utterThis.rate = 1.4
      utterThis.pitch = 3.5
      synth.speak(utterThis)
   }

   // const tickRef = useRef(new Audio(tickSound))
   // const tick = tickRef.current
   // tick.volume = 0.1

   // const playTick = () => {
   //    tick.currentTime = 0
   //    tick.play().catch(() => {
   //       // Silently handle the error
   //    })
   // }

   useEffect(() => {
      let intervalId = null
      if (timeRemaining > 0) {
         timeRemaining === 1 && sayTimeUp()
         playClick()
         intervalId = setInterval(() => {
            setTimeRemaining(
               (prevTimeRemaining) => prevTimeRemaining - 1
            )
         }, 1000)
      } else {
         onTimeUp()
         //  playDing()
         clearInterval(intervalId)
      }
      return () => {
         clearInterval(intervalId)
         // tick.pause()
      }
   }, [timeRemaining])

   return (
      <div
         style={{
            textAlign: 'center',
            backgroundColor: 'yellow',
            color: 'red',
            borderRadius: '10px',
            opcaity: '1.5',
            fontWeight: '400',
            padding: '0rem 0.3rem 0rem 0.3rem',
            outline: '4px solid red',
            zIndex: '0',
            display: 'inline-block',
            width: '61px',
            height: '36px',
            lineHeight: '1rem',
         }}
         className='computerFont'
         //    className='countdown-timer2'
      >
         {timeRemaining === 0 ? (
            <div>Time's up!</div>
         ) : (
            <>
               <div
                  style={{
                     textAlign: 'center',
                     fontSize: '0.6rem',
                     //   padding: '0 0.5rem',
                  }}
               >
                  Timer
               </div>

               <div
                  style={{
                     fontSize: '1.3rem',
                     //  padding: '0 0.9rem',
                     //  opacity: '1.8',
                     letterSpacing: '0.05rem',
                     textAlign: 'center',
                  }}
               >
                  {timeRemaining}
               </div>
            </>
         )}
      </div>
   )
}

export default CountdownTimer
