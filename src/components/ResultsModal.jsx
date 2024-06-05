import React, { useEffect } from 'react'
import Modal from 'antd/es/modal/Modal'
import './ResultsModal.css'
import ProgressBar from './ProgressBar'
import ScoreBoard from './ScoreBoard'
import useSound from 'use-sound'
import achievement from '../media/achievement.mp3'

export default function ResultsModal({
   title,
   open,
   footer,
   correct,
   incorrect,
   percentage,
   onCancel,
   resetRewards,
   setIsModalOpen,
   rebuildGame,
   rewardsRef,
   words,
}) {
   const you = (
      <div
         style={{
            // outline: 'var(--myYellow) 3px dashed',
            // borderRadius: '10px',
            // padding: '0.4rem',
            fontSize: '1.0rem',
         }}
         className='flashingBox '
      >
         YOUR RESULT 👉
      </div>
   )

   const [playAchievement] = useSound(achievement)

   useEffect(() => {
      if (open) {
         playAchievement()
      }
   }, [open, playAchievement])

   // const fontColor = (percentage) => {
   //    console.log('FONT percentage: ', percentage)
   //    switch (percentage) {
   //       case percentage > 85:
   //          return 'gold'
   //          break
   //       case percentage > 70:
   //          return 'silver'
   //          break
   //       case percentage > 50:
   //          return 'black'
   //          break
   //       case percentage > 20:
   //          return 'purple'
   //          break
   //       default:
   //          return 'darkred'
   //    }

   // }

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
         onCancel={() => setIsModalOpen(false)}
         footer
         correct
         incorrect
         percentage
         keyboard={true}
         style={{ padding: '0' }}
         //    onCancel={() =>  { setIsModalOpen(false)  }
      >
         <div className='modalContainer'>
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
            <div
               className='modal-table-container'
               style={{
                  textAlign: 'center',
                  backgroundColor: 'var(--myOrange)',
                  padding: '10px',
                  borderRadius: '20px 20px 0px 0px',
               }}
            >
               <ProgressBar percentage={percentage} />
            </div>

            <h1
               style={{
                  width: '98%',
                  padding: '1px',
                  color: fontColor(percentage),
               }}
            >
               SCORE: {Math.round(percentage)}%
            </h1>

            <div
               className='africanFont'
               style={{
                  backgroundColor: 'var(--myOrange)',
                  width: '98%',
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
               className='modal-table-container'
               style={{ backgroundColor: 'var(--myOrange)' }}
            >
               <table
                  className='modal-table africanFont'
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
                           className='r1'
                           style={{
                              border: 'none',
                           }}
                        >
                           {percentage > 85 && you}
                        </td>
                        <td className=' r1 gold-background'>
                           A: 85-100 🤩
                        </td>
                     </tr>
                     <tr>
                        <td className='r1'>
                           {percentage >= 70 &&
                              percentage < 85 &&
                              you}
                        </td>
                        <td className=' r1 silver-background'>
                           B: 70-85 😇
                        </td>
                     </tr>
                     <tr>
                        <td className='r1'>
                           {percentage >= 50 &&
                              percentage < 70 &&
                              you}
                        </td>
                        <td className=' r1 bronze-background'>
                           C: 50-70 🧐
                        </td>
                     </tr>
                     <tr>
                        <td className='r1'>
                           {percentage >= 20 &&
                              percentage < 50 &&
                              you}
                        </td>
                        <td className=' r1 rainbow-background'>
                           D: 20-50 🤡
                        </td>
                     </tr>
                     <tr>
                        <td className='r1'>
                           {percentage < 20 && you}
                        </td>
                        <td
                           className=' r2 poo-background'
                           style={{
                              borderRadius: '0px 0px 20px 0px',
                           }}
                        >
                           E: 0-20 😤
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <br />
            <div style={{ float: 'right' }}>
               <button onClick={() => setIsModalOpen(false)}>
                  VIEW WORDS
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
