import React, { useEffect } from 'react'

import { Space, Modal } from 'antd'
import './ResultsModal.css'
import ProgressBar from './ProgressBar'

import useSound from 'use-sound'
import achievement from '../media/achievement.mp3'
import giraffeA from '../media/giraffe-a.gif'
import giraffeB from '../media/giraffe-b.gif'
import giraffeC from '../media/giraffe-c.gif'
import giraffeD from '../media/giraffe-d.gif'
import giraffeE from '../media/giraffe-e.gif'

export default function ResultsModal({
   open,
   correct,
   incorrect,
   percentage,
   setShowResultsModal,
   rebuildGame,
   numQuestions,
}) {
   const giraffeImage = (percentage) => {
      if (percentage >= 85) {
         return <img src={giraffeA} height='40px' alt='A' />
      } else if (percentage >= 70) {
         return <img src={giraffeB} height='40px' alt='B' />
      } else if (percentage >= 50) {
         return <img src={giraffeC} height='40px' alt='C' />
      } else if (percentage >= 20) {
         return <img src={giraffeD} height='40px' alt='D' />
      } else {
         return <img src={giraffeE} height='40px' alt='E' />
      }
   }

   const you = (
      <div>
         <Space>
            {giraffeImage(percentage)}
            <span
               className='yourResult flashingBox'
               style={{
                  fontSize: '1.0rem',
               }}
            >
               YOU 👉
            </span>
         </Space>
      </div>
   )

   const [playAchievement] = useSound(achievement)

   useEffect(() => {
      if (open) {
         playAchievement()
      }
   }, [open, playAchievement])

   const fontColor = (percentage) => {
      if (percentage >= 85) {
         return 'gold'
      } else if (percentage >= 70) {
         return 'silver'
      } else if (percentage >= 50) {
         return 'var(--myBrown)'
      } else if (percentage >= 20) {
         return 'purple'
      } else {
         return 'darkred'
      }
   }

   return (
      <Modal
         width={'320px'}
         rebuildGame
         title
         centred
         open
         // onOk={handleOk}
         onCancel={() => setShowResultsModal(false)}
         footer
         correct
         incorrect
         percentage
         keyboard={true}
         style={{ padding: '0' }}
         //    onCancel={() =>  { setShowResultsModal(false)  }
      >
         <div
         // className='modalContainer'
         // style={{ width: '100%' }}
         >
            <div style={{ textAlign: 'center' }}>
               <h3
                  style={{
                     fontFamily: 'Schoolbell',
                     textDecoration: 'underline',
                     fontSize: '1.4rem',
                     color: 'red',
                  }}
               >
                  RESULTS:
               </h3>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
               <div
                  // className='modal-table-container'
                  style={{
                     width: '100%',
                     textAlign: 'center',
                     backgroundColor: 'var(--myOrange)',
                     padding: '15px 0 10px 0',
                     borderRadius: '20px 20px 0px 0px',
                  }}
               >
                  <ProgressBar percentage={percentage} />
               </div>

               <h1
                  style={{
                     width: '100%',
                     padding: '1px',
                     color: fontColor(percentage),
                  }}
               >
                  SCORE: {Math.round(percentage)}%{' '}
                  {giraffeImage(percentage)}
               </h1>

               <div
                  className='africanFont'
                  style={{
                     backgroundColor: 'var(--myOrange)',
                     width: '100%',
                     textAlign: 'center',
                  }}
               >
                  <h2>
                     <span style={{ color: 'green' }}>
                        RIGHT {correct}{' '}
                     </span>
                     |{' '}
                     <span style={{ color: 'darkred' }}>
                        {incorrect} WRONG{' '}
                     </span>
                  </h2>
               </div>

               <div
                  className='africanFont'
                  style={{
                     backgroundColor: 'var(--myOrange)',
                     width: '100%',
                     textAlign: 'center',
                  }}
               >
                  <h3>
                     Questions: {numQuestions} |{' '}
                     <span style={{ color: 'var(--myWhite)' }}>
                        Unanswered:{' '}
                     </span>
                     {numQuestions - correct - incorrect}
                  </h3>
               </div>

               <div
                  // className='resultsTableBackground'
                  className='full-height-table-wrapper'
                  // className='modal-table-container'
                  // style={{ backgroundColor: 'var(--myOrange)' }}
               >
                  {/* <img
                     src={resultsGiraffeHappy}
                     alt=''
                     className='image-cell'
                  /> */}
                  <table
                     className='modal-table africanFont '
                     style={{
                        backgroundColor: '',
                        color: 'var(--myBrown)',
                        border: 'none',
                     }}
                  >
                     <tbody>
                        <tr
                           style={{
                              border: 'none',
                              width: '100%',
                              flexBasis: '100%',
                           }}
                        >
                           <td
                              className='r1a'
                              style={{
                                 border: 'none',
                              }}
                           >
                              {percentage > 85 && you}
                           </td>
                           <td className=' r1b gold-background'>
                              A: 85-100{' '}
                              <span className='resultsIcon result-a'>
                                 🤩
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className='r1a'>
                              {percentage >= 70 &&
                                 percentage < 85 &&
                                 you}
                           </td>
                           <td className=' r1b silver-background'>
                              B: 70-85{' '}
                              <span className='resultsIcon result-b'>
                                 😇
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className='r1a'>
                              {percentage >= 50 &&
                                 percentage < 70 &&
                                 you}
                           </td>
                           <td className=' r1b bronze-background '>
                              C: 50-70{' '}
                              <span className='resultsIcon result-c'>
                                 🧐
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td className='r1a'>
                              {percentage >= 20 &&
                                 percentage < 50 &&
                                 you}
                           </td>
                           <td className=' r1b rainbow-background '>
                              D: 20-50{' '}
                              <span className='resultsIcon result-d'>
                                 🤡
                              </span>
                           </td>
                        </tr>
                        <tr>
                           <td
                              className='r1a'
                              style={{
                                 borderRadius:
                                    '0px 0px 00px 20px',
                              }}
                           >
                              {percentage < 20 && you}
                           </td>
                           <td
                              className=' r2b poo-background'
                              style={{
                                 borderRadius:
                                    '0px 0px 20px 0px',
                              }}
                           >
                              E: 0-20{' '}
                              <span className='resultsIcon result-e'>
                                 😩
                              </span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <br />
            <div
               style={{
                  textAlign: 'center',
                  marginBottom: '-30px',
               }}
            >
               <button
                  onClick={() => setShowResultsModal(false)}
               >
                  VIEW ANSWERS
               </button>
               <button onClick={() => rebuildGame()}>
                  TRY AGAIN
               </button>
               {/* <button>HOME</button> */}
            </div>
            <br />
            <br />
         </div>
      </Modal>
   )
}
