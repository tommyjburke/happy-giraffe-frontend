import './Welcome.css'
import Giraffe from './Giraffe'
import timesTablePresets from '../data/timesTablesPresets.json'
import multipleChoicePresets from '../data/multipleChoicePresets.json'
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
import { Helmet } from 'react-helmet-async'
import { Select } from 'antd'

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

   const verdict = () => {
      const device = getDevice()
      const browser = getBrowser()
      if (
         (device === 'Browser' || device === 'Desktop') &&
         browser === 'Chrome'
      ) {
         return `✅`
      } else {
         return `🤨`
      }
   }

   return (
      <>
         <Helmet>
            <title>
               Happy Giraffe - Maths, English, Rote-Learning
            </title>
            <meta
               name='description'
               content='Happy Giraffe Home Page: Interactive spelling and maths games. Rote learning made fun for kids.'
            />
            <link rel='canonical' href='/' />
         </Helmet>
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
               <div className='welcomeParagraph africanFont'>
                  <label>Welcome to Happy Giraffe:</label>
                  <ul style={{ paddingLeft: '2rem' }}>
                     <li>
                        A tool for teachers and parents to easily
                        create engaging exercises for{' '}
                        <u>
                           <i>primary-aged</i>
                        </u>{' '}
                        children.
                     </li>
                     <li>
                        Effortlessly configure spelling and maths
                        games for children. Make learning fun!
                     </li>
                     <li>
                        Use your <u>voice</u> or a{' '}
                        <i>
                           <b>
                              <u>text</u>
                           </b>
                        </i>{' '}
                        or{' '}
                        <b>
                           <u>csv</u>
                        </b>{' '}
                        file to make your own spelling game and
                        share it with others.
                     </li>
                     <li>
                        Share your custom-made games via QR code.
                     </li>

                     <li>
                        Edit and configure KeyStage templates to
                        elevate spelling proficiency.
                     </li>
                     <li>
                        Simplify the preparation and
                        customisation of educational activities.
                        Efficiently create rote-learning
                        exercises in minimal time.
                     </li>
                     <li>
                        Supports all learners, including children
                        with ADHD, providing fun and interactive
                        exercises that improve <u>focus</u> and
                        make mastering basic academic skills more
                        enjoyable.
                     </li>

                     <li>
                        No logins, no passwords, no cookies!
                     </li>
                  </ul>
               </div>

               <div
                  className='welcomeParagraph'
                  style={{ textAlign: 'center' }}
               >
                  <h2>What would you like to do?</h2>
                  <Link to='/ks-presets'>
                     <button>KeyStage Spelling PlayNow</button>
                  </Link>
                  <Link to='/ks'>
                     <button>
                        Configure KeyStage Spelling Game
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

                  <div
                     style={{
                        display: 'block',
                        textAlign: 'center',
                     }}
                  ></div>
                  <br />
                  <h2>Times Tables QuickStart:</h2>
                  <div>
                     {' '}
                     <Select
                        popupMatchSelectWidth={false}
                        placeholder='Times Table Presets'
                        width='100%'
                        onChange={(value) =>
                           (window.location.href = value)
                        }
                        options={timesTablePresets.TimesTables.map(
                           (item) => ({
                              value: item.url,
                              label: item.title,
                           })
                        )}
                     />
                     <br />
                  </div>
                  <br />
                  <h2>Multiple Choice QuickStart:</h2>
                  <div>
                     {' '}
                     <Select
                        popupMatchSelectWidth={false}
                        placeholder='Multiple Choice Presets'
                        width='100%'
                        onChange={(value) =>
                           (window.location.href = value)
                        }
                        options={multipleChoicePresets.MultipleChoice.map(
                           (item) => ({
                              value: item.url,
                              label: item.title,
                           })
                        )}
                     />
                     <br />
                  </div>
               </div>
               <br />
               <div
                  className='africanFont'
                  style={{
                     textAlign: 'center',
                     color: 'green',
                  }}
               >
                  {' '}
                  <p style={{ color: 'var(--myBrown)' }}>
                     {' '}
                     <span style={{ color: 'green' }}>
                        Optimised
                     </span>
                     <span style={{ color: 'red' }}> for </span>
                     <span style={{ color: 'yellow' }}>
                        Chrome
                     </span>
                     <span style={{ color: 'blue' }}>
                        {' '}
                        desktop.
                     </span>
                  </p>
                  <u style={{ color: 'var(--myWhite)' }}>
                     <span
                        style={{
                           textShadow: '0 0 1px brown',
                        }}
                     >
                        Detected:
                     </span>
                  </u>{' '}
                  <b style={{ color: 'var(--myBrown)' }}>
                     {' '}
                     {getOS()} {getBrowser()} {getDevice()}{' '}
                     {verdict()}
                  </b>
                  <br />
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
            </div>

            <br />
            <div>
               <Giraffe />
               <br />
               <br />
            </div>
            <br />
            <br />
         </div>

         <br />
         <br />
      </>
   )
}
