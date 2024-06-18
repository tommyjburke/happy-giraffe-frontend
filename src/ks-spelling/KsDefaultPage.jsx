import { Popover } from 'antd'
import TypewriterEffect from '../components/TypewriterEffect'
import background5 from '../media/background5.png'
import useSound from 'use-sound'
import soundTestGirl from '../media/happyGiraffeSoundTest.mp3'
import { LoadingOutlined } from '@ant-design/icons'
import { useState, useCallback } from 'react'

const readWord = (text) => {
   // robotMessage()
   const synth = window.speechSynthesis
   const utterThis = new SpeechSynthesisUtterance(text)
   utterThis.rate = 0.8
   synth.speak(utterThis)
}

const soundTestContent = (
   <div
      style={{
         width: '320px',
         textAlign: 'left',
         fontFamily: 'Roboto',
         fontSize: '1.0rem',
         fontWeight: '600',
         color: 'red',
      }}
   >
      Some sounds may not be heard if your device is set to{' '}
      <b>
         <u>mute</u>
      </b>
      .
      <br />
      It may be necessary to click this button before playing the
      game. <b>Check</b> if the voice content can be heard.
      <br />
      <u>
         <b>Note:</b>{' '}
      </u>
      Different browsers may use different robotic voices.
   </div>
)

export default function KsDefaultPage() {
   const [soundTest] = useSound(soundTestGirl)
   const [humanLoading, setHumanLoading] = useState(false)
   const [robotLoading, setRobotLoading] = useState(false)

   const startHumanLoading = useCallback(() => {
      setHumanLoading(true)
      setTimeout(() => {
         setHumanLoading(false)
      }, 1500)
   }, [])

   const startRobotLoading = useCallback(() => {
      setRobotLoading(true)
      setTimeout(() => {
         setRobotLoading(false)
      }, 1500)
   })

   return (
      <div>
         <div
            style={{
               textAlign: 'center',
               width: '100%',
               //    height: '90vh',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'space-between',
               overflowY: 'auto',
               marginBottom: '30px',
            }}
         >
            <br />
            <div
               className='africanFont'
               style={{
                  // fontFamily: 'Indie Flower',
                  fontWeight: '800',
                  // fontSize: '2.8rem',
                  flex: '1 1 0',
                  color: 'green',
               }}
            >
               <span style={{ fontSize: '4rem' }}>☝️</span>
               <TypewriterEffect
                  text='Click a GREEN button to begin....'
                  myFontSize='1.1rem'
                  isLooping
               />
            </div>
            <div
               style={{
                  textAlign: 'center',
                  flex: '1 1 0',
               }}
            >
               {' '}
               <div
                  className='africanFont'
                  style={{ color: 'var(--myBrown)' }}
               >
                  <h3>KeyStage Primary</h3>
                  <h3>Create a K.S. Spelling Quiz</h3>
               </div>
            </div>

            <br />
            <div style={{ flex: '1 1 0' }}>
               <Popover
                  content={soundTestContent}
                  title='Sound Test'
               >
                  <button
                     onClick={() => {
                        startHumanLoading()
                        soundTest()
                     }}
                     title='Sound Test. Checks if sounds are working'
                     style={{
                        backgroundColor: 'var(--myOrange)',
                        padding: '',
                        outline: '5px ridge var(--myWhite)',
                        marginBottom: '10px',
                        animation: 'moveInLeft 600ms ease-out',
                        // borderRadius: '20px',
                     }}
                  >
                     {humanLoading ? (
                        <>
                           {' '}
                           <LoadingOutlined />
                           Sound Test
                        </>
                     ) : (
                        '👧 Sound Test '
                     )}
                  </button>
                  <br />
                  <button
                     title='Sound Test. Checks if sounds are working'
                     style={{
                        backgroundColor: 'var(--myOrange)',
                        padding: '',
                        outline: '5px ridge var(--myWhite)',
                        animation: 'moveInLeft 600ms ease-out',
                        // borderRadius: '20px',
                     }}
                     onClick={() => {
                        startRobotLoading()
                        readWord(
                           'this is a sound test for happy giraffe'
                        )
                     }}
                  >
                     {robotLoading ? (
                        <>
                           {' '}
                           <LoadingOutlined />
                           Sound Test
                        </>
                     ) : (
                        '🤖 Sound Test '
                     )}
                  </button>
               </Popover>
            </div>
            <br />
            <div
               style={{
                  margin: '15px',
                  flex: '2 1 70%',
               }}
            >
               <img
                  src={background5}
                  alt='Happy Giraffe'
                  width='60%'
               />
            </div>
         </div>
      </div>
   )
}
