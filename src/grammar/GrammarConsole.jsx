import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GrammarConsole.css'
import {
   Spin,
   message,
   Popover,
   Switch,
   Slider,
   Collapse,
} from 'antd'
import { Helmet } from 'react-helmet-async'
// import {
//    MinusCircleOutlined,
//    PlusOutlined,
// } from '@ant-design/icons'
import switchSound from '../media/switch.mp3'
import blipOn from '../media/blipOn.mp3'
import blipOff from '../media/blipOff.mp3'
import magicSound from '../media/magic.mp3'
import ding from '../media/ding1.mp3'
import useSound from 'use-sound'

import {
   DownCircleOutlined,
   RightCircleOutlined,
   DeleteOutlined,
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
   const [customTitle, setCustomTitle] = useState(
      'My Custom Title'
   )
   const [useTimer, setUseTimer] = useState(false)
   const [duration, setDuration] = useState(120)
   const [showEditTitle, setShowEditTitle] = useState(false)

   const [messageApi, contextHolder] = message.useMessage()

   const [playSwitch] = useSound(switchSound)
   const [playMagic] = useSound(magicSound)
   const [playBlipOn] = useSound(blipOn)
   const [playBlipOff] = useSound(blipOff)
   const [playDing] = useSound(ding)
   const handleTimerSwitch = (checked) => {
      playSwitch()
      setUseTimer(checked)
   }

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
      playDing()
      setQuestionObjects(newQuestionObjects)
      setTempOptions(['', ''])
      setTempQuestion('')
      setTempCorrectAnswer(0)
      setShowForm(false)
      // setNumInputs(2)
      // console.log('newQuestionObjects: ', newQuestionObjects)
   }

   const compileGrammarParams = () => {
      // console.log('questionObjects: ', questionObjects)
      const queryParams = new URLSearchParams({
         useTimer: useTimer,
         duration: duration,
         title: customTitle,
         grammarObjects: JSON.stringify(questionObjects),
      })
      // console.log('query params: ', queryParams.toString())
      playMagic()
      navigate(`./data?${queryParams.toString()}`)
   }

   const removeOption = () => {
      // console.log('arrayLength: ', tempOptions.length)
      // console.log('tempCorrectAnswer: ', tempCorrectAnswer)
      const arrayLength = tempOptions.length

      if (tempOptions.length === 2) {
         optionsMessage()
         return
      }
      playBlipOff()
      setTempOptions((prev) => prev.slice(0, -1))

      if (tempCorrectAnswer > tempOptions.length - 2) {
         setTempCorrectAnswer(tempCorrectAnswer - 1)
      }
   }

   const addOption = () => {
      if (tempOptions.length === 4) {
         optionsMessage()
         return
      }
      playBlipOn()
      setTempOptions([...tempOptions, ''])
   }

   const removeQuestion = () => {
      setQuestionObjects((prev) => prev.slice(0, -1))
      playBlipOff()
   }

   return (
      <>
         {contextHolder}
         <div className='mainContainer '>
            <Helmet>
               <title>
                  Happy Giraffe Grammar - Build Your Own Multiple
                  Choice Game
               </title>
               <meta
                  name='description'
                  // content='Happy Giraffe - Customised Spelling Game'
                  content='Happy Giraffe Grammar - Build Your Own Multiple Choice Game'
               />
               {/* <link rel='canonical' href='/' /> */}
            </Helmet>
            <h1>
               DIY Grammar Console{' '}
               <span style={{ color: 'red' }}>BETA</span>
            </h1>
            <h2> Build a Multiple Choice Quiz</h2>
            <fieldset>
               <legend style={{ textAlign: 'center' }}>
                  Create Question
               </legend>
               <div className='configBox'>
                  <span
                     onClick={() =>
                        setShowEditTitle(!showEditTitle)
                     }
                     style={{ cursor: 'pointer' }}
                  >
                     {showEditTitle ? (
                        <DownCircleOutlined />
                     ) : (
                        <RightCircleOutlined />
                     )}

                     {/*
                      */}
                  </span>

                  {showEditTitle ? (
                     <input
                        maxLength={36}
                        value={customTitle}
                        onChange={(e) =>
                           setCustomTitle(
                              e.target.value.replace(
                                 /[^a-zA-Z'0-9 ]/g,
                                 ''
                              )
                           )
                        }
                     />
                  ) : (
                     <span
                        style={{
                           fontSize: '1.2rem',
                           fontFamily: 'Schoolbell',
                           color: 'green',
                        }}
                     >
                        {' '}
                        {customTitle}
                     </span>
                  )}
               </div>

               <div className='configBox'>
                  <label>Timer: </label>
                  <Switch
                     defaultValue={useTimer}
                     checkedChildren='on'
                     unCheckedChildren='off'
                     onChange={handleTimerSwitch}
                  />
                  {/* {useTimer ? 'Timer On' : 'Timer Off'} */}

                  <div
                     style={{
                        display: 'flex',
                        // justifyContent: 'center',
                        width: '100%',
                     }}
                  >
                     <Slider
                        disabled={!useTimer}
                        style={{
                           width: '200px',
                           margin: '10px 1.2rem 10px 1.2rem',
                        }}
                        step={30}
                        min={30}
                        max={600}
                        // value={[lowerValue, upperValue]}
                        trackStyle={{
                           backgroundColor: 'lightgreen',
                        }}
                        defaultValue={duration}
                        // railStyle={{ backgroundColor: 'grey' }}
                        onChange={(value) => {
                           setDuration(value)
                        }}
                     />
                     {convertSecondsToMinutes(duration)}
                  </div>
               </div>
               {/* <div>
                        <button>Add Question</button>
                     </div> */}

               <br />
               <div>
                  <label>Add Question:</label>
               </div>
               <div>
                  <p>
                     Use a single underscore to position the
                     answer box. E.g. A triangle has _ sides.
                  </p>
               </div>
               <div>
                  <input
                     placeholder='Question: use _ to position answer box'
                     value={tempQuestion}
                     maxLength={200}
                     onChange={(e) =>
                        setTempQuestion(e.target.value)
                     }
                     type='text'
                     className='multiQuestion !important'
                     style={{
                        width: '90vw',
                        padding: '10px 0px 10px 0px',
                        textAlign: 'center',
                        border: '2px solid lime',
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
                              placeholder={`Option ${i + 1}`}
                              value={tempOptions[i]}
                              key={i}
                              onChange={(e) => {
                                 handleTempOptions(e, i)
                              }}
                              maxLength={24}
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
                                 playBlipOn()
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
                                 <span
                                    style={{ margin: '0 auto' }}
                                 >
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
                                 <span
                                    style={{ margin: '0 auto' }}
                                 >
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
                           'Do not forget to choose the correct answer ✅'
                        }
                     >
                        <button onClick={compileQuestion}>
                           + question
                        </button>
                     </Popover>
                  </div>
               </div>
            </fieldset>

            <br />

            {questionObjects.length > 0 && (
               <div
                  style={{
                     border: ' 0px ridge var(--myOrange)',
                     padding: '10px',
                     borderRadius: '25px',
                     backgroundColor: 'var(--myWhite)',
                  }}
               >
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
                                 <div
                                    onClick={() =>
                                       removeQuestion(i)
                                    }
                                    style={{
                                       color: 'red',
                                       cursor: 'pointer',
                                       marginLeft: '10px',
                                       float: 'right',
                                    }}
                                 >
                                    <DeleteOutlined />
                                 </div>
                              </div>
                              <div
                                 style={{
                                    textAlign: 'right',
                                 }}
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
               </div>
            )}
            <br />
            {questionObjects.length > 0 && (
               <div style={{ textAlign: 'right' }}>
                  <button onClick={() => compileGrammarParams()}>
                     BUILD GAME
                  </button>
                  <br />
               </div>
            )}
         </div>
         <br />
      </>
   )
}

function convertSecondsToMinutes(seconds) {
   const minutes = Math.floor(seconds / 60)
   const remainingSeconds = seconds % 60
   return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
   }${remainingSeconds}`
}
