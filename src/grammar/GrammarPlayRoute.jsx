import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlaySpellingGame from '../components/PlaySpellingGame'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet-async'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

export default function GrammarPlayRoute() {
   //    const [gameWords, setGameWords] = useState([])
   //    const [isProcessing, setIsProcessing] = useState(false)
   const query = useQuery()
   let queryQuestionObjects = query.get('grammarObjects')
   const tempQuestionObjects = JSON.parse(queryQuestionObjects)
   //    console.log('grammarObjects', grammarObjects)

   const [grammarObjects, setGrammarObjects] = useState(
      tempQuestionObjects
   )

   const [correct, setCorrect] = useState(0)
   const [incorrect, setIncorrect] = useState(0)

   //    const title = query.get('title')
   //    const encodedWordObjects = query.get('wordObjects')
   //    const useTimer = query.get('useTimer') === 'true'
   //    const duration = parseInt(query.get('duration'), 10)
   //    const wordObjects = JSON.parse(atob(encodedWordObjects))
   //    console.log('wordObjects', wordObjects)

   const buildGameWordObjects = async () => {
      // console.log('BUILDING GAME OBJECTS COMMENCING...')
      setIsProcessing(true)
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
      } else {
         setIncorrect(incorrect + 1)
      }
   }

   useEffect(() => {
      // buildGameWordObjects()
   }, [])

   return (
      <div className='mainContainer hero'>
         <Helmet></Helmet>

         <h1>
            GRAMMAR PLAY ROUTE{' '}
            <span style={{ color: 'red' }}>BETA</span>
         </h1>
         <div>
            Correct: {correct} Incorrect: {incorrect}
         </div>
         <div style={{ border: '1px dotted black' }}>
            <div>
               {grammarObjects.map((questionObject, index) => (
                  <div key={index}>
                     <div className='multiQuestionDiv'>
                        {index + 1}
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
                        {!questionObject.isDisabled && (
                           <button
                              disabled={
                                 questionObject.isDisabled
                              }
                              onClick={() => checkAnswer(index)}
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
            <div></div>
         </div>
      </div>
   )
}
