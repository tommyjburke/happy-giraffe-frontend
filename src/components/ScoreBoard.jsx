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
            borderRadius: '0px 0px 10px 10px',
            backgroundColor: 'black',
            color: 'white',
            width: '100%',
            opacity: '0.9',
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
                  padding: '0.5rem 0.3rem',
               }}
            >
               <div
                  style={{
                     paddingLeft: '5px',
                     flex: '1 1 20%',
                  }}
               >
                  {useTimer ? (
                     <div>
                        <CountdownTimer
                           duration={duration}
                           onTimeUp={onTimeUp}
                        />
                     </div>
                  ) : (
                     <div
                        style={{
                           textDecoration: 'double-line-through',
                           color: 'lightgray',
                           opacity: '0.5',
                        }}
                     >
                        Timer
                     </div>
                  )}
               </div>
               <div
                  style={{
                     padding: '0px',
                     flex: '1 1 20%',
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
                     marginLeft: 'auto',
                     flex: '3 3 60%',
                     textAlign: 'right',
                     alignContent: 'flex-end',
                     alignSelf: 'flex-end',
                  }}
               >
                  <ProgressBar percentage={percentage} />
               </div>
               <span
                  className='computerFont'
                  style={{
                     color: 'white',
                     padding: '2px 0.5rem 6px 0.5rem',
                  }}
               >
                  {percentage}%
               </span>
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
