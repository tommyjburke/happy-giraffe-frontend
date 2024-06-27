import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GrammarConsole.css'
import { Spin, message, Popover } from 'antd'
import { Helmet } from 'react-helmet-async'
import {
   MinusCircleOutlined,
   PlusOutlined,
} from '@ant-design/icons'

export default function GrammarConsole() {
   const navigate = useNavigate()
   const [words, setWords] = useState([])
   const [speechSpeed, setSpeechSpeed] = useState(0.7)
   const [isProcessing, setIsProcessing] = useState(false)
   const [showForm, setShowForm] = useState(false)
   const [questionObjects, setQuestionObjects] = useState([])
   const [numInputs, setNumInputs] = useState(2)
   const [tempOptions, setTempOptions] = useState(['', ''])
   const [tempQuestion, setTempQuestion] = useState('')
   const [tempCorrectAnswer, setTempCorrectAnswer] = useState(0)

   const [messageApi, contextHolder] = message.useMessage()

   const optionsMessage = () => {
      messageApi.open({
         type: 'error',
         content: (
            <div>
               <p>2 options minimum</p>
               <p>4 options maximum</p>
            </div>
         ),
         style: {
            fontSize: '0.9rem',
            fontWeight: '600',
            opacity: '0.9',
         },
         duration: '2.0',
      })
   }

   const invalidDataMessage = () => {
      messageApi.open({
         type: 'error',
         content: 'Please fill out all fields',
         style: {
            fontSize: '0.9rem',
            fontWeight: '600',
            opacity: '0.9',
         },
         duration: '2.0',
      })
   }

   const handleTempOptions = (e, index) => {
      const newTempOptions = [...tempOptions]
      newTempOptions[index] = e.target.value
      console.log('newTempOptions: ', newTempOptions)
      setTempOptions(newTempOptions)
   }

   const compileQuestion = () => {
      if (
         tempQuestion.length === 0 ||
         tempOptions.some((option) => option === '')
      ) {
         invalidDataMessage()
         return
      }
      const filteredTempOptions = tempOptions.filter(
         (option) => option !== ''
      )
      setTempOptions(filteredTempOptions)

      let newQuestion = tempQuestion
      let firstUnderscoreIndex = newQuestion.indexOf('_')
      if (firstUnderscoreIndex !== -1) {
         newQuestion =
            newQuestion.substring(0, firstUnderscoreIndex + 1) +
            newQuestion
               .substring(firstUnderscoreIndex + 1)
               .replace(/_/g, '')
      }

      if (newQuestion.indexOf('_') === -1) {
         newQuestion += '_'
      }

      const newQuestionObjects = [...questionObjects]
      newQuestionObjects.push({
         question: newQuestion,
         options: tempOptions,
         correctAnswer: tempCorrectAnswer,
      })
      setQuestionObjects(newQuestionObjects)
      setTempOptions(['', ''])
      setTempQuestion('')
      setTempCorrectAnswer(0)
      setShowForm(false)
      setNumInputs(2)
      console.log('newQuestionObjects: ', newQuestionObjects)
   }

   const compileGrammarParams = () => {
      console.log('questionObjects: ', questionObjects)
      const queryParams = new URLSearchParams({
         grammarObjects: JSON.stringify(questionObjects),
      })
      console.log('query params: ', queryParams.toString())
      navigate(`./data?${queryParams.toString()}`)
   }

   const removeOption = () => {
      if (tempOptions.length === 2) {
         optionsMessage()
         return
      }
      setTempOptions((prev) => prev.slice(0, -1))
   }

   const addOption = () => {
      if (tempOptions.length === 4) {
         optionsMessage()
         return
      }
      setTempOptions([...tempOptions, ''])
   }

   const removeQuestion = () => {
      setQuestionObjects((prev) => prev.slice(0, -1))
   }

   return (
      <>
         {contextHolder}
         <div className='mainContainer '>
            <h1>
               DIY Grammar Console{' '}
               <span style={{ color: 'red' }}>BETA</span>
            </h1>
            <h2> Build a Multiple Choice Quiz</h2>
            {/* <div>
               <button>Add Question</button>
            </div> */}
            <div>
               <b>
                  Use a single underscore to position the answer
                  box. E.g. A triangle has _ sides.
               </b>
            </div>
            <br />
            <div>
               <label>Add Question:</label>
            </div>
            <div>
               <input
                  value={tempQuestion}
                  onChange={(e) =>
                     setTempQuestion(e.target.value)
                  }
                  type='text'
                  className='question !important'
                  style={{
                     width: '90vw',
                     padding: '10px 0px 10px 0px',
                     textAlign: 'center',
                  }}
               ></input>
            </div>
            {/* <div>Options:</div> */}
            <div
               style={{
                  textAlign: '',
                  //   display: 'flex',
                  //   flex: 'row',
                  justifyContent: 'center',
               }}
            >
               <div style={{ textAlign: 'center' }}>
                  <label>Options: </label>
                  <button
                     //  onClick={() => setNumInputs(numInputs - 1)}
                     onClick={() => removeOption()}
                  >
                     ➖
                  </button>
                  <button
                     //  onClick={() => setNumInputs(numInputs + 1)}
                     onClick={() => addOption()}
                  >
                     ➕
                  </button>
               </div>

               <div>
                  {tempOptions.map((option, i) => (
                     <div
                        key={i}
                        style={{
                           textAlign: '',
                           display: 'flex',
                           flex: 'row',
                           justifyContent: 'center',
                        }}
                        index={i}
                     >
                        <input
                           value={tempOptions[i]}
                           key={i}
                           onChange={(e) =>
                              handleTempOptions(e, i)
                           }
                           type='text'
                           className='question !important'
                           style={{
                              // width: '90vw',
                              padding: '10px 0px 10px 0px',
                              textAlign: 'center',
                              border: '1px dotted black',
                              //    width: '200px',
                           }}
                        />
                        <input
                           checked={i === tempCorrectAnswer}
                           value={i}
                           onChange={() => {
                              setTempCorrectAnswer(i)
                              console.log('radio:', i)
                           }}
                           type='radio'
                           //    key={i}
                           id={i}
                           // id='css'
                           name='correctAnswer'
                           // value='CSS'
                        />
                        {tempCorrectAnswer === i && (
                           <div
                              style={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <span style={{ margin: '0 auto' }}>
                                 ✅
                              </span>
                           </div>
                        )}
                        {tempCorrectAnswer != i && (
                           <div
                              style={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <span style={{ margin: '0 auto' }}>
                                 ❓
                              </span>
                           </div>
                        )}
                        <br />
                     </div>
                  ))}
               </div>
               <br />
               <div style={{ textAlign: 'right' }}>
                  <Popover
                     content={
                        'Do not forget to choose the correct answer'
                     }
                  >
                     <button onClick={compileQuestion}>
                        + question
                     </button>
                  </Popover>
               </div>

               <br />

               <div style={{ border: '1px dotted black' }}>
                  <div>
                     {questionObjects.map(
                        (questionObject, i) => (
                           <div key={i}>
                              <div className='multiQuestionDiv'>
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
                                                <select>
                                                   {questionObject.options.map(
                                                      (
                                                         option
                                                      ) => (
                                                         <option
                                                            key={
                                                               option
                                                            }
                                                         >
                                                            {
                                                               option
                                                            }
                                                         </option>
                                                      )
                                                   )}
                                                </select>{' '}
                                             </>
                                          )}
                                       </div>
                                    ))}
                                 <span
                                    onClick={() =>
                                       removeQuestion(i)
                                    }
                                    style={{
                                       color: 'red',
                                       cursor: 'pointer',
                                       marginLeft: '10px',
                                    }}
                                 >
                                    ❌
                                 </span>
                              </div>
                              <div
                                 style={{ textAlign: 'right' }}
                              >
                                 {' '}
                                 <span className='correctOption'>
                                    Correct:{' '}
                                    {
                                       questionObject.options[
                                          questionObject
                                             .correctAnswer
                                       ]
                                    }
                                 </span>
                              </div>
                           </div>
                        )
                     )}
                  </div>
                  <div></div>
               </div>
               <br />
               {questionObjects.length > 0 && (
                  <div style={{ textAlign: 'right' }}>
                     <button
                        onClick={() => compileGrammarParams()}
                     >
                        BUILD GAME
                     </button>
                     <br />
                  </div>
               )}
            </div>
            <br />
         </div>
      </>
   )
}
