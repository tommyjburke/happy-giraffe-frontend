import React from 'react'
import ProgressBar from './ProgressBar'
import Rewards from './Rewards'
import CountdownTimer from './CountdownTimer'

export default function ScoreBoard({
   rewardsRef,
   percentage,
   numQuestions,
   correct,
   incorrect,
   useTimer,
   duration = 60,
   onTimeUp,
}) {
   percentage = Math.round(percentage)
   return (
      <div
         className='unselectable'
         style={{
            // outline: '3px dotted var(--myOrange)',
            // border: '4px dotted white',
            borderRadius: '5px',
            backgroundColor: 'black',
            color: 'white',
            width: '100%',
         }}
      >
         <div>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  // border: '4px dotted var(--myWhite)',
                  padding: '0.5rem 1rem',
                  opacity: '0.7',
               }}
            >
               {/* Add the logical AND operator to the condition */}
               {useTimer ? (
                  <div>
                     <CountdownTimer
                        duration={duration}
                        onTimeUp={onTimeUp}
                     />
                  </div>
               ) : null}
               <div
                  style={{
                     padding: '1px',

                     flex: '1 1 30%',
                     // borderRight: 'dotted 1px var(--myWhite)',
                  }}
               >
                  <div
                     className=''
                     style={{
                        fontSize: '1.4rem',
                        fontFamily: 'Orbitron',
                        textAlign: 'center',
                        letterSpacing: '0.3rem',
                     }}
                  >
                     <span
                        style={{
                           color: 'green',
                        }}
                     >
                        ✅{correct}
                     </span>
                     :
                     <span
                        style={{
                           color: 'red',
                        }}
                     >
                        {incorrect}❌
                     </span>{' '}
                  </div>
               </div>
               <div
                  style={{
                     flex: '1 2 70%',
                     textAlign: 'center',
                     alignContent: 'stretch',
                  }}
               >
                  <ProgressBar percentage={percentage} />
               </div>
               <h3
                  className='computerFont'
                  style={{
                     color: 'white',
                     paddingRight: '2rem',
                  }}
               >
                  {percentage}%
               </h3>
            </div>
         </div>
         <div>
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <Rewards ref={rewardsRef} />
            </div>
         </div>
      </div>
   )
}
