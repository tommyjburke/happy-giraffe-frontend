import { Helmet } from 'react-helmet-async'
import ksData2 from '../data/ksData2.json'
import { cleanWords } from '../jsFunctions/jsFunctions.js'
import { useState, useEffect } from 'react'
import PlaySpellingGame from '../components/PlaySpellingGame.jsx'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { Spin, Alert } from 'antd'
import { useLocation } from 'react-router-dom'
import { scrambleWord } from '../jsFunctions/jsFunctions'
import { DeleteOutlined } from '@ant-design/icons'
import TypewriterEffect from '../components/TypewriterEffect.jsx'
import background5 from '../media/background5.png'
import { Dropdown, Space, Select, message } from 'antd'
import useSound from 'use-sound'
import error from '../media/error.mp3'

export default function KsPresets() {
   const [selectedYear, setSelectedYear] = useState('')
   const [wordList, setWordList] = useState([])
   const [wordArray, setWordArray] = useState([])
   const [useTimer, setUseTimer] = useState(true)
   const [duration, setDuration] = useState(6)
   const [gameWords, setGameWords] = useState([])
   const [isProcessing, setIsProcessing] = useState(false)
   const [startStopWatch, setStartStopWatch] = useState(null)
   const [selectedLanguage, setSelectedLanguage] = useState(null)

   const [messageApi, contextHolder] = message.useMessage()

   const [errorSound] = useSound(error)
   const newWords = () => {
      const tempYear = selectedYear
      setGameWords([])
      setDuration(600)
      setUseTimer(false)
      setSelectedYear('')
      setTimeout(() => {
         setSelectedYear(tempYear)
      }, 200)
   }

   useEffect(() => {
      if (selectedYear) {
         const wordsSet = new Set()
         const lessons = ksData2.year[selectedYear].lessons

         lessons.forEach((lesson) => {
            lesson.wordArray.forEach((word) => {
               wordsSet.add(word)
            })
         })

         // Convert Set to Array and update state
         setWordList(Array.from(wordsSet))
      }
   }, [selectedYear])

   useEffect(() => {
      const shuffledWords = [...wordList].sort(
         () => 0.5 - Math.random()
      )
      const randomWords = shuffledWords.slice(0, 30)
      setWordArray(randomWords)
   }, [wordList])

   const handleYearChange = (e) => {
      setSelectedYear(e.target.value)
      setWordArray([]) // Clear selected words when changing the year
   }

   const selectYear = (value) => {
      setSelectedYear(value)
   }

   const clearWords = () => {
      setWordArray([])
      setSelectedYear('')
   }

   const warning = () => {
      errorSound()
      messageApi.open({
         type: 'error',
         duration: 2,
         content: (
            <h4 className='africanFont'>
               INVALID LANGUAGE. PLEASE SELECT A VALID LANGUAGE
            </h4>
         ),
      })
   }

   useEffect(() => {
      if (selectedYear) {
         buildGameWordObjects()
      } else {
         setGameWords([])
      }
   }, [wordArray])

   // useEffect(() => {
   //    console.log('selectedYear: ', selectedYear)
   //    console.log('dropdownPlaceholder: ', dropdownPlaceholder)
   // }, [selectedYear])

   const buildGameWordObjects = async () => {
      setUseTimer(false)
      setIsProcessing(true)

      try {
         const newGameWords = await Promise.all(
            wordArray.map(async (word, index) => {
               const apiResponse = await verifyHumanSpeech(word)
               return {
                  spelling: word,
                  scrambled: scrambleWord(word),
                  index,
                  userGuess: '',
                  hasHumanVoice: apiResponse.hasHumanVoice,
                  verdict: '',
                  showButton: true,
                  synonyms: apiResponse.synonyms,
                  voiceUrl: apiResponse.audioLink,
               }
            })
         )

         setGameWords(newGameWords)
      } catch (error) {
         console.error(
            'Error building game word objects:',
            error
         )
      }
      setIsProcessing(false)
      setStartStopWatch(Date.now())
      setUseTimer(true)
      setDuration(600)

      // console.log('BUILDING GAME OBJECTS COMPLETE!')
   }

   const dropdownPlaceholder = selectedYear
      ? selectedYear
      : '--Select a Year--'

   return (
      <>
         <div className='mainContainer hero'>
            {contextHolder}
            <Spin
               spinning={isProcessing}
               size='large'
               fullscreen
            />
            <Helmet>
               <title>
                  Happy Giraffe - KeyStage Spelling Game Presets
                  🦒
               </title>
               <meta
                  name='description'
                  content='Happy Giraffe - KeyStage Spelling Game'
               />
               {/* <link rel='canonical' href='/' /> */}
            </Helmet>
            {/* <Spin spinning={isProcessing} size='large' fullscreen /> */}
            <h1> KeyStage Presets</h1>
            {/* <div>{renderYearButtons()}</div>
            <div>{selectedYear}</div> */}

            <div
               className='africanFont'
               style={{
                  textAlign: 'center',
                  backgroundColor: 'var(--myOrange)',
                  width: '100%',
                  paddingBottom: '0.3rem',
               }}
            >
               <div>30 Random Words: 10 Minutes</div>
               <div>
                  {!selectedLanguage && (
                     <>
                        Select Language:{' '}
                        <span
                           className='largeIcon'
                           onClick={() =>
                              setSelectedLanguage('English')
                           }
                        >
                           🇬🇧
                        </span>
                        <span
                           className='largeIcon'
                           onClick={() => warning()}
                        >
                           🇺🇸
                        </span>
                     </>
                  )}{' '}
                  {selectedLanguage && (
                     <>
                        Select Year:{' '}
                        <Select
                           placeholder={dropdownPlaceholder}
                           onChange={selectYear}
                           value={dropdownPlaceholder}
                           // style={{ width: 120 }}
                           // size='large'

                           className='africanFont'
                           options={Object.keys(
                              ksData2.year
                           ).map((year) => ({
                              value: year,
                              label: year,
                           }))}
                        />
                     </>
                  )}
                  {selectedYear && (
                     <span
                        style={{
                           fontSize: '1.3rem',

                           // marginTop: '-3.3rem',
                        }}
                     >
                        <DeleteOutlined onClick={clearWords} />{' '}
                        <span
                           style={{
                              marginLeft: '0.5rem',
                              cursor: 'pointer',
                           }}
                           // className='largeIcon'

                           onClick={() => newWords()}
                        >
                           ♽
                        </span>
                     </span>
                  )}
               </div>
            </div>

            {!selectedYear && (
               <div
                  className='africanFont'
                  style={{
                     alignContent: 'center',
                     textAlign: 'center',

                     // fontFamily: 'Indie Flower',
                     fontWeight: '800',
                     // fontSize: '2.8rem',
                     flex: '1 1 0',
                     color: 'green',
                  }}
               >
                  <TypewriterEffect
                     text='Select Year.........'
                     myFontSize='1.1rem'
                     isLooping
                  />
                  <span style={{ fontSize: '4rem' }}>☝️</span>
                  <br />
                  <div className='flexVerticalContainer'>
                     <h2>KEYSTAGE SPELLING PRESETS</h2>
                  </div>
               </div>
            )}

            {gameWords.length > 0 && (
               <PlaySpellingGame
                  words={gameWords}
                  setWords={setGameWords}
                  buildGameWordObjects={buildGameWordObjects}
                  duration={duration}
                  useTimer={useTimer}
               />
            )}

            <br />
            <br />
            <br />
            <br />
         </div>
      </>
   )
}
