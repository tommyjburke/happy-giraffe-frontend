import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import PlaySpellingGame from '../components/PlaySpellingGame'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet-async'

import useSound from 'use-sound'
import correctSound3 from '../media/correct3.mp3'
import wrongSound from '../media/wrong.mp3'
import ResultsModal from '../components/ResultsModal.jsx'
import ScoreBoard from '../components/ScoreBoard.jsx'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

export default function GrammarPlayRoute() {
   //    const [gameWords, setGameWords] = useState([])
   //    const [isProcessing, setIsProcessing] = useState(false)
   const query = useQuery()
   let queryQuestionObjects = query.get('grammarObjects')
   const tempQuestionObjects = JSON.parse(queryQuestionObjects)
   const rewardsRef = useRef(null)
   const inputRefs = useRef([])
   //    console.log('grammarObjects', grammarObjects)

   const [grammarObjects, setGrammarObjects] = useState(
      tempQuestionObjects
   )
   const [startStopWatch, setStartStopWatch] = useState(
      Date.now()
   )
   const [showResultsModal, setShowResultsModal] =
      useState(false)
   const [disableAllInputs, setDisableAllInputs] =
      useState(false)

   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)

   const customTitle = query.get('title')
   //    const encodedWordObjects = query.get('wordObjects')
   const useTimerTemp = query.get('useTimer') === 'true'
   const duration = parseInt(query.get('duration'), 10)
   //    const wordObjects = JSON.parse(atob(encodedWordObjects))
   //    console.log('wordObjects', wordObjects)
   const [useTimer, setUseTimer] = useState(useTimerTemp)

   const buildGameWordObjects = async () => {
      // console.log('BUILDING GAME OBJECTS COMMENCING...')
      setIsProcessing(true)
   }

   const handleTimeUp = () => {
      setUseTimer(false)
      setDisableAllInputs(true)
      setShowResultsModal(true)
      // console.log('TIME UP')
      // setTimeUp(true)
      // displayResults()
      // setDisableInputs(true)
   }

   const handleUserAnswer = (e, index) => {
      console.log('value: ', parseInt(e.target.value))
      console.log('index: ', index)
      const newGrammarObjects = [...grammarObjects]

      newGrammarObjects[index].userAnswer = parseInt(
         e.target.value
      )
      setGrammarObjects(newGrammarObjects)
      console.log('grammarObjects: ', grammarObjects)
   }

   const checkAnswer = (index) => {
      const newGrammarObjects = [...grammarObjects]

      newGrammarObjects[index].isDisabled = true
      setGrammarObjects(newGrammarObjects)
      console.log('grammarObjects: ', grammarObjects)
      const correctAnswer = parseInt(
         grammarObjects[index].correctAnswer
      )
      const userAnswer = grammarObjects[index].userAnswer

      if (correctAnswer === userAnswer) {
         setCorrect(correct + 1)
         handleGenerateReward()
      } else {
         setIncorrect(incorrect + 1)
      }
   }

   useEffect(() => {
      // buildGameWordObjects()
   }, [])

   const percentage = (correct / grammarObjects.length) * 100
   const handleGenerateReward = () => {
      if (rewardsRef.current) {
         // console.log('rewardsRef.current: ', rewardsRef.current)
         rewardsRef.current.generateReward()
      } else {
         console.error('rewardsRef.current is null')
      }
   }

   const rebuildGame = (rowIndex) => {
      window.location.reload()
   }

   useEffect(() => {
      const numQuestions = grammarObjects?.length
      const answered = correct + incorrect
      if (answered === numQuestions && numQuestions > 0) {
         setShowResultsModal(true)
         setUseTimer(false)
      } else {
         // setMounted(true)
      }
   }, [correct, incorrect, grammarObjects])

   return (
      <div className='mainContainer hero'>
         <Helmet>
            <title>
               Happy Giraffe - {customTitle} - Multiple Choice
               Quiz
            </title>
            <meta
               name='description'
               // content='Happy Giraffe - Customised Spelling Game'
               content={customTitle}
            />
            {/* <link rel='canonical' href='/' /> */}
         </Helmet>

         <h1>
            GRAMMAR PLAY ROUTE{' '}
            <span style={{ color: 'red' }}>BETA</span>
         </h1>
         <h2
            style={{
               backgroundColor: 'var(--myOrange)',
               width: '100%',
            }}
         >
            {customTitle}
         </h2>
         <div
            className='africanFont'
            style={{
               backgroundColor: 'var(--myOrange)',
               color: 'green',
               width: '100%',
               textAlign: 'center',
            }}
         >
            <h3>
               <span className='numQuestionsHeaderSpan'>
                  {grammarObjects.length}{' '}
                  {grammarObjects.length > 1
                     ? 'questions'
                     : 'question'}
               </span>
               <span className='timerHeaderSpan'>
                  {' '}
                  Timer:{' '}
                  {useTimer ? `${duration} seconds` : 'off'}
               </span>
            </h3>
         </div>
         <div
            // className='responsive-table'
            style={{
               position: 'sticky',
               top: '0px',
               width: '100%',
               // opacity: '0.9',
               zIndex: 1,
               // overflowY: 'visible',
               // padding: '0px 30px 0px 1px',
               // marginRight: '3px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               // maxWidth: '800px',
               position: 'sticky',
               top: '0',
               zIndex: 2,
            }}
         >
            {/* <Rewards ref={rewardsRef} /> */}
            <ScoreBoard
               duration={duration}
               useTimer={useTimer}
               onTimeUp={handleTimeUp}
               rewardsRef={rewardsRef}
               // resetRewards={resetRewards}
               percentage={percentage}
               numQuestions={grammarObjects.length}
               correct={correct}
               incorrect={incorrect}
            />
         </div>

         <div style={{}}>
            <div>
               {grammarObjects.map((questionObject, index) => (
                  <div key={index}>
                     <div className='multiQuestionDiv'>
                        <span
                           style={{
                              marginRight: '5px',
                              color: 'var(--myOrange)',
                           }}
                        >
                           {index < 9 ? '0' : ''}
                           {index + 1}.
                        </span>
                        {questionObject.question
                           .split('_')
                           .map((word, index) => (
                              <div key={index}>
                                 {word}
                                 {index <
                                    questionObject.question.split(
                                       '_'
                                    ).length -
                                       1 && (
                                    <>
                                       {' '}
                                       <select
                                          disabled={
                                             questionObject.isDisabled
                                          }
                                          onChange={(e) => {
                                             handleUserAnswer(
                                                e,
                                                index
                                             )
                                             console.log(
                                                e.target.value
                                             )
                                          }}
                                       >
                                          {questionObject.options.map(
                                             (
                                                answer,
                                                optionIndex
                                             ) => (
                                                <option
                                                   value={
                                                      optionIndex
                                                   }
                                                   key={
                                                      optionIndex
                                                   }
                                                >
                                                   {answer}
                                                </option>
                                             )
                                          )}
                                       </select>{' '}
                                    </>
                                 )}
                              </div>
                           ))}
                        {!questionObject.isDisabled &&
                           !disableAllInputs && (
                              <button
                                 disabled={
                                    questionObject.isDisabled
                                 }
                                 onClick={() =>
                                    checkAnswer(index)
                                 }
                              >
                                 Go
                              </button>
                           )}
                     </div>

                     {/* <p>
                        Correct answer:{' '}
                        {
                           questionObject.options[
                              questionObject.correctAnswer
                           ]
                        }
                     </p> */}
                  </div>
               ))}
            </div>
            <div style={{ textAlign: 'center' }}>
               {!useTimer && <button>Restart</button>}
            </div>
         </div>
         {showResultsModal && (
            <ResultsModal
               startStopWatch={startStopWatch}
               // words={words}
               rewardsRef={rewardsRef}
               // resetRewards={resetRewards}
               percentage={percentage}
               numQuestions={grammarObjects.length}
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
      </div>
   )
}
