import './Welcome.css'
import background5 from '../media/background5.png'
import { Link } from 'react-router-dom'
import React from 'react'
import {
   isMobile,
   isTablet,
   isBrowser,
   isAndroid,
   isIOS,
   isWindows,
   isMacOs,
   isLinux,
   isChrome,
   isFirefox,
   isSafari,
   isOpera,
   isIE,
   isEdge,
   isBrave,
} from 'react-device-detect'

// const playAudioFile = () => {
//    const fileLocation =
//       'https://api.dictionaryapi.dev/media/pronunciations/en/clear-us.mp3'
//    const audio = new Audio(fileLocation)
//    audio.play()
// }

export default function Welcome() {
   const getBrowser = () => {
      switch (true) {
         case isChrome:
            return 'Chrome'
         case isFirefox:
            return 'Firefox'
         case isSafari:
            return 'Safari'
         case isOpera:
            return 'Opera'
         case isIE:
            return 'Internet Explorer'
         case isEdge:
            return 'Edge'
         // case isBrave:
         //    return 'Brave'
         default:
            return 'Unknown'
      }
   }

   const getDevice = () => {
      switch (true) {
         case isTablet:
            return 'Tablet'
         case isMobile:
            return 'Mobile'
         case isBrowser:
            return 'Browser'
         default:
            return 'Desktop'
      }
   }

   const getOS = () => {
      switch (true) {
         case isAndroid:
            return 'Android'
         case isIOS:
            return 'iOS'
         case isWindows:
            return 'Windows'
         case isMacOs:
            return 'MacOS'
         // case isLinux:
         //    return 'Linux'
         default:
            return 'Unknown'
      }
   }

   return (
      <>
         <div
            className='mainContainer'
            // style={{ overflowY: 'scroll !important' }}
         >
            <h1>HAPPY GIRAFFE</h1>
            <div style={{ textAlign: 'center' }}>
               <span className='welcomeTitle africanFont'>
                  Automated Rote Learning, Saving Time,
                  Effortless Exercises
               </span>
            </div>

            <div className='flexVerticalContainer'>
               <div>
                  <div
                     style={{
                        textAlign: 'center',
                     }}
                  >
                     <img
                        src={background5}
                        width='160px'
                        alt='happy giraffe'
                     />
                  </div>
               </div>
               <div className='welcomeParagraph'>
                  <label>Welcome to Happy Giraffe:</label>
                  <ul style={{ paddingLeft: '2rem' }}>
                     <li>
                        A tool for teachers and parents to easily
                        create engaging exercises for
                        primary-aged children.
                     </li>
                     <li>
                        Simplifies the preparation and
                        customization of educational activities,
                        eliminating the hassle of rote-learning
                        tasks.
                     </li>
                     <li>
                        Supports all learners, including children
                        with ADHD, providing fun and interactive
                        exercises that improve <u>focus</u> and
                        make mastering basic academic skills more
                        enjoyable.
                     </li>
                     <li>
                        Transforms the way young learners engage
                        with their education.
                     </li>
                     <li>No logins, no cookies, no faff.</li>
                  </ul>
               </div>

               <div
                  className='welcomeParagraph'
                  style={{ textAlign: 'center' }}
               >
                  <h2>What would you like to do?</h2>
                  <Link to='/ks'>
                     <button>
                        Create KeyStage Spelling Game
                     </button>
                  </Link>
                  <Link to='/spelling-diy'>
                     <button>
                        Create Customised Spelling Game
                     </button>
                  </Link>
                  <br />
                  <Link to='/maths'>
                     <button>Create Maths Game</button>
                  </Link>
                  <br />
                  <br />
                  <div
                     className=''
                     style={{ textAlign: 'center' }}
                  >
                     {' '}
                     <p> Optimised for Chrome desktop.</p>
                     <u>Detected:</u> {getOS()} {getBrowser()}{' '}
                     {getDevice()}
                     {/* <br />
                        BROWSER
                        <br />
                        {getBrowser()}
                        <br />
                        OPERATING SYSTEM
                        <br /> */}
                  </div>
                  <br />
                  <br />
                  <br />
               </div>
            </div>
         </div>
      </>
   )
}
