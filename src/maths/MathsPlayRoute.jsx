import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
// import PlayMathsGame from './PlayMathsGame'
import MathsQuestion from './MathsQuestion'
import { QRCode, Popover, Space } from 'antd'
import background5 from '../media/background5.png'
import ScoreBoard from '../components/ScoreBoard'
import ResultsModal from '../components/ResultsModal'
import correctSound3 from '../media/correct3.mp3'
import wrongSound from '../media/wrong.mp3'
import useSound from 'use-sound'

function useQuery() {
   //    console.log('query', useLocation().search)
   return new URLSearchParams(useLocation().search)
}

export default function MathsPlayRoute() {
   const [mathsObjects, setMathsObjects] = useState([])
   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)
   const [showResultsModal, setShowResultsModal] =
      useState(false)
   const [disableAllInputs, setDisableAllInputs] =
      useState(false)

   const [activeQuestion, setActiveQuestion] = useState(0)

   const [playCorrectSound] = useSound(correctSound3)
   const [playWrongSound] = useSound(wrongSound)

   const query = useQuery()

   const customTitle = query.get('title')
   const numQuestions = query.get('numQuestions')
   let aValues = query.get('aValues')
   aValues = aValues.split(',')
   let bValues = query.get('bValues')
   bValues = bValues.split(',')
   let operators = query.get('operators')

   if (!operators) {
      operators = '+,-,*,/'
   }
   operators = operators.split(',')
   let hiddenBoxTemp = query.get('hiddenBox')
   hiddenBoxTemp = hiddenBoxTemp.split(',')
   let useTimer = query.get('useTimer') === 'true'
   const duration = query.get('duration')
   const useMinus = query.get('useMinus') === 'true'

   const [useTimerTemp, setUseTimerTemp] = useState(useTimer)

   let hiddenBox = ['c']

   if (hiddenBoxTemp < 1) {
      hiddenBox = ['c']
   } else {
      hiddenBox = hiddenBoxTemp
   }

   const hiddenBoxTempLength = hiddenBoxTemp.length

   // const topRef = useRef(null)
   const inputRefs = useRef([])
   const rewardsRef = useRef(null)

   const handleGenerateReward = () => {
      if (rewardsRef.current) {
         // console.log('rewardsRef.current: ', rewardsRef.current)
         rewardsRef.current.generateReward()
      } else {
         console.error('rewardsRef.current is null')
      }
   }

   const resetRewards = () => {
      if (rewardsRef.current) {
         rewardsRef.current.clearRewards()
      }
   }

   const handleRowClick = (index) => {
      if (index >= mathsObjects.length) {
         return
      }
      inputRefs.current[index].focus()
      setActiveQuestion(index)
   }

   const replaceSymbols = (expression) => {
      const symbolMap = {
         '/': '➗',
         '*': '✖️',
         '+': '➕',
         '-': '➖',
      }
      return expression.replace(
         /\/|\*|\+|-/g,
         (match) => symbolMap[match]
      )
   }

   useEffect(() => {
      const mathsQuestionObjects = buildMathsQuestionObjects()
      setMathsObjects(mathsQuestionObjects)
   }, [])

   const buildMathsQuestionObjects = () => {
      let mathsObjects = []

      const aRange = aValues[1] - aValues[0] + 1

      const bRange = bValues[1] - bValues[0] + 1

      for (let i = 0; i < numQuestions; i++) {
         let a =
            parseInt(aValues[0]) +
            Math.floor(Math.random() * aRange)

         let b =
            parseInt(bValues[0]) +
            Math.floor(Math.random() * bRange)

         const randomOpIndex = Math.floor(
            Math.random() * operators.length
         )

         let shuffledOperators = operators.sort(
            () => Math.random() - 0.5
         )

         let operator = shuffledOperators[randomOpIndex]

         if (operator === '/') {
            const tempA = parseInt(a) * parseInt(b)
            a = tempA
         }

         if (!useMinus && operator === '-' && a < b) {
            let tempA = b

            b = a
            a = tempA
         }

         const c = Math.round(eval(`${a} ${operator} ${b}`))

         const randomBoxIndex = Math.floor(
            Math.random() * hiddenBox.length
         )

         const hiddenBoxValue = hiddenBox[randomBoxIndex]

         const correctAnswer =
            hiddenBoxValue === 'a'
               ? a
               : hiddenBoxValue === 'b'
               ? b
               : hiddenBoxValue === 'c'
               ? c
               : null

         operator = replaceSymbols(operator)

         let userInput = ''
         let isDisabled = false

         const mathsQuestion = {
            key: i,
            a: a,
            op: operator,
            b: b,
            c: c,
            hiddenBox: hiddenBoxValue,
            userInput: userInput,
            correctAnswer: correctAnswer,
            verdict: '',
            isDisabled: isDisabled,
         }
         mathsObjects.push(mathsQuestion)
      }
      return mathsObjects
   }

   const handleUserInput = (event, rowIndex) => {
      setMathsObjects((prevMathsObjects) => {
         const newMathsObjects = [...prevMathsObjects]
         newMathsObjects[rowIndex].userInput = event.target.value
         return newMathsObjects
      })
   }

   const checkGuess = (rowIndex) => {
      const correctAnswer = parseInt(
         mathsObjects[rowIndex].correctAnswer
      )
      const userInput = parseInt(
         mathsObjects[rowIndex].userInput
      )

      const isCorrect = correctAnswer === userInput
      let verdict
      if (isCorrect) {
         playCorrectSound()
         verdict = '✅'
         setCorrect((prevCorrect) => prevCorrect + 1)
         handleGenerateReward()
      } else {
         playWrongSound()
         verdict = '❌'
         setIncorrect((prevIncorrect) => prevIncorrect + 1)
      }
      // handleRowClick(rowIndex + 1)

      let nextIndex = rowIndex + 1
      const totalQuestions = mathsObjects.length

      // Function to find the next index with verdict = ''
      function findNextAvailableIndex(startIndex) {
         for (let i = startIndex; i < totalQuestions; i++) {
            if (mathsObjects[i].verdict === '') {
               return i
            }
         }
         return -1 // Return -1 if not found
      }

      // Find the next index from current position
      nextIndex = findNextAvailableIndex(nextIndex)

      // If not found, wrap around and start from the beginning
      if (nextIndex === -1) {
         nextIndex = findNextAvailableIndex(0)
      }

      // If still not found, then all are completed, do nothing
      if (nextIndex !== -1) {
         handleRowClick(nextIndex)

         setTimeout(() => {
            if (
               inputRefs.current &&
               inputRefs.current[nextIndex]
            ) {
               inputRefs.current[nextIndex].scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
               })
            }
         }, 100)
      }

      // if (inputRefs.current && inputRefs.current[rowIndex]) {
      //    inputRefs.current[rowIndex].scrollIntoView({
      //       behavior: 'smooth',
      //    })
      // }

      setMathsObjects((prevMathsObjects) => {
         const newMathsObjects = [...prevMathsObjects]
         newMathsObjects[rowIndex] = {
            ...newMathsObjects[rowIndex],
            isDisabled: true,
            verdict: verdict,
            userInput: userInput.toString(),
         }
         return newMathsObjects
      })
   }

   const handleTimeUp = () => {
      setUseTimerTemp(false)
      setDisableAllInputs(true)
      setShowResultsModal(true)

      // setTimeUp(true)
      setShowResultsModal(true)
   }

   const clearMathsObjects = () => {
      setMathsObjects([])
   }

   const rebuildGame = (rowIndex) => {
      window.location.reload()
   }

   useEffect(() => {
      const numQuestions = mathsObjects?.length
      const answered = correct + incorrect
      if (answered === numQuestions && numQuestions > 0) {
         setShowResultsModal(true)
         setUseTimerTemp(false)
      }
   }, [correct, incorrect, mathsObjects])

   return (
      <div className='mainContainer hero'>
         <h1>{customTitle ? customTitle : 'Maths Play'}</h1>
         <div
            className='africanFont'
            style={{
               backgroundColor: 'var(--myOrange)',
               color: 'green',
               width: '100%',
               textAlign: 'center',
            }}
         >
            <div>
               <h3>
                  <>
                     <span className='numQuestionsHeaderSpan'>
                        {numQuestions}{' '}
                        {numQuestions > 1
                           ? 'Questions'
                           : 'Question'}
                     </span>
                     <span
                        style={{
                           backgroundColor: 'var(--myWhite)',
                           color: 'red',
                           marginLeft: '10px',
                           borderRadius: '5px',
                           padding: ' 0 5px 0 5px',
                        }}
                     >
                        {' '}
                        Timer:{' '}
                        {useTimer
                           ? `${duration} seconds`
                           : 'off'}
                     </span>
                  </>
               </h3>
            </div>
            <Space>
               <p className='mathsDetailsHeaderSpan'>
                  {aValues[0]} to {aValues[1]}{' '}
                  <span style={{ fontSize: '0.9rem' }}>
                     {operators.map((op) => replaceSymbols(op))}{' '}
                  </span>
                  {bValues[0]} to {bValues[1]}
               </p>
            </Space>
         </div>
         <div
            style={{
               position: 'sticky',
               top: '0px',
               width: '100%',
               opacity: '0.9',
               // marginTop: '-15px',
               zIndex: '1000',
            }}
         >
            {/* <Rewards ref={rewardsRef} /> */}
            <ScoreBoard
               duration={duration}
               useTimer={useTimerTemp}
               onTimeUp={handleTimeUp}
               rewardsRef={rewardsRef}
               resetRewards={resetRewards}
               percentage={(correct / mathsObjects.length) * 100}
               numQuestions={mathsObjects.length}
               correct={correct}
               incorrect={incorrect}
            />
         </div>{' '}
         <div className='maths-table-container'>
            <div
               style={
                  {
                     // maxWidth: '1000px',
                     // float: 'right',
                     // border: '1px solid white',
                  }
               }
            >
               {' '}
               <Popover
                  content={'Use ⬅️➡️ keyboard keys to navigate'}
               >
                  <span
                     style={{
                        marginLeft: '1rem',
                        fontSize: '1.6rem',
                        float: 'left',
                        marginBottom: '1rem',
                        // marginRight: '-0.2rem',
                     }}
                  >
                     ⌨️⬅️➡️
                  </span>
               </Popover>
               <Popover
                  overlayInnerStyle={{
                     padding: 0,
                  }}
                  content={
                     <QRCode
                        errorLevel='M'
                        value={window.location.href}
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
                        backgroundColor: 'var(--myOrange)',
                        outline: '1px solid lime',
                        marginBottom: '1rem',
                        // marginRight: '-0.2rem',
                     }}
                  >
                     {' '}
                     Share QR Code
                  </button>
               </Popover>
            </div>
            <br />
            <table className='maths-table'>
               {/* <thead>
                  <tr>
                     <th>*</th>
                     <th>A</th>
                     <th>Op</th>
                     <th>C</th>
                     <th>=</th>
                     <th>D</th>
                     <th>Check</th>
                  </tr>
               </thead> */}

               <tbody>
                  {mathsObjects.map((mathsObject, rowIndex) => (
                     <MathsQuestion
                        key={rowIndex}
                        mathsObjects={mathsObjects}
                        rowIndex={rowIndex}
                        mathsObject={mathsObject}
                        handleUserInput={handleUserInput}
                        checkGuess={checkGuess}
                        handleRowClick={handleRowClick}
                        inputRefs={inputRefs}
                        activeQuestion={activeQuestion}
                        disableAllInputs={disableAllInputs}
                        // numQuestions={mathsObjects.length}

                        // handleChange={handleChange}
                     />
                     //    <div>
                     //       {index + 1}:{mathsObject.a}
                     //       {mathsObject.operator}
                     //       {mathsObject.b} = {mathsObject.c}
                     //    </div>
                  ))}
               </tbody>
            </table>
            {(!useTimerTemp || disableAllInputs) && (
               <div style={{ textAlign: 'center' }}>
                  <br />
                  <button
                     onClick={() => {
                        rebuildGame()
                     }}
                     style={{
                        backgroundColor: 'var(--myOrange)',
                     }}
                  >
                     RESTART
                  </button>
               </div>
            )}
         </div>
         {showResultsModal && (
            <ResultsModal
               // words={words}
               // rewardsRef={rewardsRef}
               // resetRewards={resetRewards}
               percentage={(correct / mathsObjects.length) * 100}
               numQuestions={mathsObjects.length}
               correct={correct}
               incorrect={incorrect}
               setShowResultsModal={setShowResultsModal}
               title=''
               rebuildGame={rebuildGame}
               width={1000}
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
         <br />
         <br />
      </div>
   )
}
