import React from 'react'
import ProgressBar from './ProgressBar'
import Rewards from './Rewards'
import { Space } from 'antd'

export default function ScoreBoard({
   rewardsRef,
   percentage,
   numQuestions,
   correct,
   incorrect,
}) {
   percentage = Math.round(percentage)
   return (
      <div
         className=''
         style={{
            // outline: '3px dotted var(--myOrange)',
            border: '4px dotted white',
            borderRadius: '10px',
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
               <div
                  className='gameFont'
                  style={{
                     padding: '1px',

                     flex: '1 1 30%',
                     // borderRight: 'dotted 1px var(--myWhite)',
                  }}
               >
                  <div
                     className=''
                     style={{
                        fontSize: '1.6rem',
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
               <h2 className=''>{percentage}%</h2>
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
