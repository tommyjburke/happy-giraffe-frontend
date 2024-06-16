import { useEffect, useRef, useState } from 'react'

// import { playHumanSpeech } from '../jsFunctions/humanSpeech.js'
import { SoundOutlined } from '@ant-design/icons'
import WordQuestion from './WordQuestion.jsx'
import ScoreBoard from './ScoreBoard.jsx'
import useSound from 'use-sound'
// import correctSound from '../media/correct.mp3'
// import correctSound1 from '../media/correct1.mp3'
// import correctSound2 from '../media/correct2.mp3'
import correctSound3 from '../media/correct3.mp3'
import wrongSound from '../media/wrong.mp3'
// import achievement from '../media/achievement.mp3'
import ResultsModal from './ResultsModal.jsx'
import Slider1 from './Slider1.jsx'
import { Popover, message, QRCode } from 'antd'
import background5 from '../media/background5.png'

export default function PlaySpellingGame({
   words,
   setWords,
   buildGameWordObjects,
   useTimer,
   duration,
}) {
   // console.log('PLAY SPELLING GAME TIMER: ', useTimer)
   const [speechSpeed, setSpeechSpeed] = useState(0.6)
   const [userAttempts, setUserAttempts] = useState(words)
   //    const [percentage, setPercentage] = useState(0)
   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)
   const [activeQuestion, setActiveQuestion] = useState(0)
   const [showResultsModal, setShowResultsModal] =
      useState(false)
   // const [questionsCompleted, setQuestionsCompleted] =
   //    useState(false)
   // const [mounted, setMounted] = useState(false)
   const [tempDuration, setTempDuration] = useState(duration)
   const [useTimerTemp, setUseTimerTemp] = useState(useTimer)
   const [questionsCompleted, setQuestionsCompleted] =
      useState(false)

   // const [useTimer, setUseTimer] = useState(false)
   // const [duration, setDuration] = useState()

   const [disableAllInputs, setDisableAllInputs] =
      useState(false)

   // const [playSound1] = useSound(correctSound1)
   // const [playSound2] = useSound(correctSound2)
   // const [playSound3] = useSound(correctSound3)

   // const [playSound4] = useSound(correctSound4)
   // const [playSound5] = useSound(correctSound)

   // const sounds = [
   //    playSound1,
   //    playSound2,
   //    playSound3,
   //    playSound4,
   //    playSound5,
   // ]

   // const playCorrectSound = () => {
   //    const randomIndex = Math.floor(
   //       Math.random() * sounds.length
   //    )
   //    sounds[randomIndex]()
   // }

   const [playCorrectSound] = useSound(correctSound3)
   const [playWrongSound] = useSound(wrongSound)

   // const handleGenerateReward = () => {
   //    console.log('rewardsRef.current: ', rewardsRef.current)
   //    rewardsRef.current.generateReward()
   // }
   const topRef = useRef(null)
   const rewardsRef = useRef(null)
   const inputRefs = useRef([])
   const handleGenerateReward = () => {
      if (rewardsRef.current) {
         // console.log('rewardsRef.current: ', rewardsRef.current)
         rewardsRef.current.generateReward()
      } else {
         console.error('rewardsRef.current is null')
      }
   }

   // useEffect(() => {
   //    console.log('rewardsRef after mount:', rewardsRef.current)
   //    const currentURL = window.location.href
   //    console.log('~~~~~~PlaySpellingGame URL: ', currentURL)
   // }, [])

   const [messageApi, contextHolder] = message.useMessage()
   const robotMessage = () => {
      messageApi.open({
         type: 'none',
         content: '🤖',
         style: { fontSize: '6rem', opacity: '0.7' },
         duration: '1.2',
      })
   }

   const randomHumanIcon = () => {
      let personArray = [
         '👩‍🦲',
         '👨‍🦲',
         '👩‍🦱',
         '👨‍🦱',
         '👨‍🦰',
         '🧑',
         '👴',
         '👵',
         '👧',
         '👦',
         '👨‍',
         '👨🏾‍🦰',
         '👩🏾‍🦰',
      ]

      return personArray[
         Math.floor(Math.random() * personArray.length)
      ]
   }

   const humanMessage = () => {
      messageApi.open({
         type: 'none',
         content: randomHumanIcon(),
         style: { fontSize: '6rem', opacity: '0.7' },
         duration: '1.2',
      })
   }

   const readWord = (text) => {
      robotMessage()
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      utterThis.rate = speechSpeed
      synth.speak(utterThis)
   }

   const playHumanSpeech = async (word) => {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      humanMessage()

      try {
         const result = await fetch(url).then((res) =>
            res.json()
         )
         const pronunciation =
            result[0]?.phonetics[0]?.audio ||
            result[0]?.phonetics[1]?.audio ||
            result[0]?.phonetics[2]?.audio ||
            result[0]?.phonetics[3]?.audio

         if (pronunciation) {
            const icon = '👩‍🦲'
            const audio = new Audio(pronunciation)
            // console.log('audio: ', audio)
            audio.play()
            return { hasHumanVoice: true, icon }
         } else {
            const icon = '❌'
            return { hasHumanVoice: false, icon }
         }
      } catch (error) {
         const icon = '❌'
         return { hasHumanVoice: false, icon }
      }
   }

   const resetRewards = () => {
      if (rewardsRef.current) {
         rewardsRef.current.clearRewards()
      }
   }

   const handleRowClick = (index) => {
      if (index >= words.length) {
         return
      }
      inputRefs.current[index].focus()
      setActiveQuestion(index)
   }

   const handleGuess = (index, guess) => {
      const newWords = [...words]
      newWords[index].userGuess = guess
      setWords(newWords)
   }

   // const handleKeyDown = (index, word) => {
   //    if (event.key === 'ArrowUp') {
   //       let prevIndex = index - 1
   //       while (
   //          prevIndex >= 0 &&
   //          words[prevIndex] &&
   //          words[prevIndex].verdict !== ''
   //       ) {
   //          prevIndex--
   //       }
   //       if (prevIndex >= 0 && words[prevIndex]) {
   //          handleRowClick(prevIndex)
   //       }
   //    } else if (event.key === 'ArrowDown') {
   //       let nextIndex = index + 1
   //       const totalQuestions = words.length
   //       while (
   //          nextIndex < totalQuestions &&
   //          words[nextIndex] &&
   //          words[nextIndex].verdict !== ''
   //       ) {
   //          nextIndex++
   //       }
   //       if (nextIndex < totalQuestions && words[nextIndex]) {
   //          handleRowClick(nextIndex)
   //       }
   //    }
   // }

   const checkGuess = (index, verdict) => {
      const word = words[index]

      word.showButton = false
      if (word.userGuess.toLowerCase() === word.spelling) {
         playCorrectSound()
         word.verdict = '✅'
         setCorrect((prevCorrect) => prevCorrect + 1)
         handleGenerateReward()
      } else {
         playWrongSound()
         setIncorrect((prevIncorrect) => prevIncorrect + 1)
         word.verdict = '❌'
      }

      // handleRowClick(index + 1)

      let nextIndex = index + 1
      const totalQuestions = words.length
      const firstNonCompletedIndex = words.findIndex(
         (word) => word.verdict === ''
      )
      if (nextIndex >= totalQuestions) {
         nextIndex =
            firstNonCompletedIndex === -1
               ? 0
               : words.findIndex((word) => word.verdict === '')
      }
      while (
         nextIndex < totalQuestions &&
         words[nextIndex] &&
         words[nextIndex].verdict !== ''
      ) {
         nextIndex++
      }
      if (nextIndex < totalQuestions && words[nextIndex]) {
         handleRowClick(nextIndex)
      }

      const numCorrect = words.filter(
         (word) => word.verdict === '✅'
      ).length
      const numIncorrect = words.filter(
         (word) => word.verdict === '❌'
      ).length
      if (words.length === numCorrect + numIncorrect) {
         setQuestionsCompleted(true)
      }
   }

   const renderGameData = () => {
      return (
         <div
            className='newTableContainer hero'
            style={{ marginTop: '10px' }}
         >
            <div ref={topRef}></div>
            <div className='spelling-table-container'>
               <table className='responsive-table'>
                  <thead>
                     <tr style={{}}>
                        <th
                           style={{
                              textAlign: 'center',
                              width: '40%',
                              padding: '0px 10px 0px 10px',
                              backgroundColor: 'var(--myYellow)',
                              color: 'var(--myBrown)',
                              fontSize: '1.8rem',
                           }}
                        >
                           <div>
                              {/* Robot Speed: */}
                              <Slider1
                                 value={speechSpeed}
                                 onChange={setSpeechSpeed}
                              />
                           </div>
                        </th>
                        <th
                           style={{
                              textAlign: 'center',
                              width: '20%',
                              padding: '0px 10px 0px 10px',
                              backgroundColor: 'var(--myYellow)',
                              color: 'var(--myBrown)',
                              fontSize: '1.6rem',
                              fontFamily: 'Indie Flower',
                           }}
                        >
                           <Popover
                              content={
                                 <p>
                                    Use ⬆️⬇️ keyboard keys to
                                    navigate
                                 </p>
                              }
                           >
                              ⌨️⬇️⬆️
                           </Popover>
                        </th>
                        <th
                           style={{
                              textAlign: 'center',
                              width: '40%',
                              padding: '0px 10px 0px 10px',
                              backgroundColor: 'var(--myYellow)',
                              color: 'var(--myBrown)',
                              fontSize: '1.8rem',
                           }}
                        >
                           {words.length <= 80 ? (
                              <Popover
                                 overlayInnerStyle={{
                                    padding: 0,
                                 }}
                                 content={
                                    <QRCode
                                       errorLevel='M'
                                       value={
                                          window.location.href
                                       }
                                       bordered={false}
                                       icon={background5}
                                       size={280}
                                    />
                                    // </div>
                                 }
                              >
                                 <button
                                    style={{
                                       float: 'right',
                                       backgroundColor:
                                          'var(--myOrange)',
                                       outline: '1px solid lime',
                                       // marginRight: '-0.2rem',
                                    }}
                                 >
                                    Share QR Code
                                 </button>
                              </Popover>
                           ) : (
                              <p
                                 style={{
                                    fontSize: '1.0rem',
                                    float: 'right',
                                 }}
                              >
                                 Too many words <br />
                                 for QR Code
                              </p>
                           )}
                        </th>
                     </tr>

                     <tr style={{ padding: '0px 0px 0px 0px' }}>
                        <th
                           className='g1'
                           title='question number'
                        >
                           *
                        </th>
                        <th className='g23' title='robot voice'>
                           <SoundOutlined />
                        </th>
                        <th
                           className='g4h'
                           title='Scrambled version'
                        >
                           Scrambled
                        </th>
                        <th className='g5'>Your Guess</th>
                        <Popover
                           content={
                              'Number of letters in each word'
                           }
                        >
                           <th
                              className='g6'
                              title='Number of letters in each word'
                           >
                              #
                           </th>
                        </Popover>
                        <th className='g7'>✅</th>
                     </tr>
                  </thead>
                  <tbody>
                     {words.map((wordObject, index) => (
                        <WordQuestion
                           // handleKeyDown={() =>
                           //    handleKeyDown(index, wordObject)
                           // }
                           disableAllInputs={disableAllInputs}
                           wordObject={wordObject}
                           key={index}
                           index={index}
                           id={index}
                           playHumanSpeech={playHumanSpeech}
                           readWord={readWord}
                           // hasHumanVoice={hasHumanVoice}
                           handleGuess={handleGuess}
                           handleRowClick={handleRowClick}
                           inputRefs={inputRefs}
                           checkGuess={checkGuess}
                           activeQuestion={activeQuestion}
                           numQuestions={words.length}
                           words={words}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )
   }

   const percentage = (correct / words.length) * 100

   useEffect(() => {
      // console.log('USE EFFECT CALLED')
      const numQuestions = words?.length
      // console.log('NumQuestions:', numQuestions)
      const answered = correct + incorrect
      if (
         // mounted &&
         answered === numQuestions &&
         numQuestions > 0
      ) {
         // console.log('answered same as length')
         setShowResultsModal(true)
         setUseTimerTemp(false)
      } else {
         // setMounted(true)
      }
   }, [correct, incorrect, words])

   useEffect(() => {
      if (inputRefs.current[0]) {
         inputRefs.current[0].focus()
      }
   }, [])

   const rebuildGame = () => {
      inputRefs.current[0].focus()
      setActiveQuestion(0)
      if (topRef.current) {
         topRef.current.scrollIntoView({
            behavior: 'smooth',
         })
      }
      setShowResultsModal(false)
      buildGameWordObjects()
      setCorrect(0)
      setIncorrect(0)
      resetRewards()
      setDisableAllInputs(false)
      setUseTimerTemp(useTimer)
      setTempDuration(duration)
   }

   const handleTimeUp = () => {
      setUseTimerTemp(false)
      setDisableAllInputs(true)
      setShowResultsModal(true)
      // console.log('TIME UP')
      // setTimeUp(true)
      // displayResults()
      // setDisableInputs(true)
   }

   return (
      <div>
         {contextHolder}

         <div
            style={{
               position: 'sticky',
               top: '0px',
               width: '100%',
               opacity: '0.9',
               zIndex: 2000,
               overflowY: 'visible',
               // padding: '0px 30px 0px 1px',
               // marginRight: '3px',
            }}
         >
            {/* <Rewards ref={rewardsRef} /> */}
            <ScoreBoard
               duration={tempDuration}
               useTimer={useTimerTemp}
               onTimeUp={handleTimeUp}
               rewardsRef={rewardsRef}
               resetRewards={resetRewards}
               percentage={percentage}
               numQuestions={words.length}
               correct={correct}
               incorrect={incorrect}
            />
         </div>

         <div
            style={{ padding: '0px 3px 0px 3px', zIndex: '-1' }}
         >
            {' '}
            {renderGameData()}
         </div>
         <div className='center'>
            {!useTimerTemp && (
               <button
                  style={{
                     backgroundColor: 'black',
                     opacity: '1.5',
                     margin: '15px 0px 15px 0px',
                     outline: '5px ridge red',
                  }}
                  onClick={() => {
                     rebuildGame()
                  }}
               >
                  🥵 START AGAIN 😫
               </button>
            )}
         </div>
         <br />
         <br />
         <br />
         <br />
         <br />
         {/* <button onClick={() => setShowResultsModal(true)}>
            SHOW Modal
         </button> */}
         {showResultsModal && (
            <ResultsModal
               words={words}
               rewardsRef={rewardsRef}
               resetRewards={resetRewards}
               percentage={percentage}
               numQuestions={words.length}
               correct={correct}
               incorrect={incorrect}
               setShowResultsModal={setShowResultsModal}
               title=''
               rebuildGame={rebuildGame}
               // width={1000}
               open={showResultsModal}
               // onOk={handleOk}
               // onCancel={handleCancel}
               footer={null}
               keyboard={true}
               style={{ padding: '0' }}
               //    onCancel={() =>  { setShowResultsModal(false)  }
               onCancel={() => {
                  setShowResultsModal(false)
               }}
               // style={{ border: 'var(--myBrown) 20px solid' }}
            />
         )}

         <br />
      </div>
   )
}
