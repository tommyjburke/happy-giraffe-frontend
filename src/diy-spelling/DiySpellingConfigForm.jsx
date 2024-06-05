import { useState, useRef } from 'react'
import { playHumanSpeech } from '../jsFunctions/humanSpeech.js'
// import ProgressBar from '../components/ProgressBar.jsx'
// import Rewards from '../components/Rewards.jsx'
import Slider1 from '../components/Slider1.jsx'
import { Popover, message, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import DragDrop from './DragDrop.jsx'
import TypewriterEffect from '../components/TypewriterEffect.jsx'
import { InboxOutlined, SoundOutlined } from '@ant-design/icons'
import useSound from 'use-sound'
import scramble from '../media/scramble.mp3'
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch, Slider } from 'antd'

export default function DiySpellingConfigForm({
   words,
   setWords,
   setShowMenu,
   setSpeechSpeed,
   speechSpeed,
   onDeleteWord,
   onToggleWord,
   reScrambleWord,
   handleAddWord,
   setIsProcessing,
   longWordsError,
   duplicatesError,
}) {
   const navigate = useNavigate()

   const [score, setScore] = useState(0)
   const [isTimer, setIsTimer] = useState(false)
   const [timerSeconds, setTimerSeconds] = useState(60)
   const [title, setTitle] = useState('')
   const [newUri, setNewUri] = useState('')
   // console.log('userAnswers: ', userAnswers)

   // const pattern = /^[A-Za-z']*$/
   // const rewardsRef = useRef(null)
   const inputRefs = useRef([])

   const [playScramble] = useSound(scramble)

   const handleDivClick = (index) => {
      inputRefs.current[index].focus()
   }

   const [messageApi, contextHolder] = message.useMessage()
   const robotMessage = () => {
      messageApi.open({
         type: 'none',
         content: '🤖',
         style: { fontSize: '6rem', opacity: '0.8' },
         duration: '1.2',
      })
   }

   const humanMessage = () => {
      messageApi.open({
         type: 'none',
         content: '🙋',
         style: { fontSize: '6rem', opacity: '0.8' },
         duration: '1.2',
      })
   }

   // const handleGenerateReward = () => {
   //    rewardsRef.current.generateReward()
   // }

   // function handleSliderChange(event) {
   //    setSpeechSpeed(parseFloat(event.target.value))
   // }

   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      utterThis.rate = speechSpeed
      synth.speak(utterThis)
   }

   function filterObjects(objects) {
      console.log('Filtering these objects: ', objects)
      return objects.map((obj) => ({
         scrambled: obj.scrambled,
         spelling: obj.spelling,
      }))
   }

   function compileData(originalData) {
      console.log('SAVE QUIZ: ', originalData)

      const newWordObjects = filterObjects(originalData)
      console.log('newWordObjects', newWordObjects)

      const encodedWordObjects = btoa(
         JSON.stringify(newWordObjects)
      )

      const queryParams = new URLSearchParams({
         title: title,
         timerSeconds: timerSeconds,
         wordObjects: encodedWordObjects,
      })

      // const url = `http://localhost:3000/spelling-diy?${queryParams.toString()}`

      let uriString = queryParams.toString()

      setNewUri(uriString)

      navigate(`diy/?${queryParams.toString()}`)
   }

   function handleClearList() {
      // const confirmed = window.confirm(
      //    'Are you sure you want to delete all words?'
      // )
      // if (confirmed) setWords([])
      // console.log('deleted all')
   }

   const confirm = (e) => {
      console.log(e)
      message.success('Click on Yes')
   }
   const cancel = (e) => {
      console.log(e)
      message.error('Click on No')
   }

   if (words.length < 1) {
      return (
         <div className='table-container list2'>
            <br />
            {/* <TypewriterEffect
               text='Filtering........'
               isLooping
            /> */}

            <div style={{ fontFamily: 'Indie Flower' }}>
               <span style={{ fontSize: '2rem' }}>☝️</span>
               <TypewriterEffect
                  text='ENTER WORDS ABOVE........'
                  myFontSize='1.4rem'
                  isLooping
               />
            </div>

            <br />
            <DragDrop
               handleAddWord={handleAddWord}
               setIsProcessing={setIsProcessing}
               longWordsError={longWordsError}
               duplicatesError={duplicatesError}
               words={words}
            >
               {/* <UploadLogo /> */}
               <button
                  className=''
                  style={{
                     backgroundColor: 'lightgray',
                     color: 'black',
                     border: 'dashed 2px darkgray',
                     width: '250px',
                     height: '150px',
                  }}
               >
                  <InboxOutlined /> + Drop txt/csv file
               </button>
            </DragDrop>
         </div>
      )
   }

   return (
      <div
         className='newTableContainer'
         style={{ marginTop: '10px' }}
      >
         {contextHolder}
         <table
            className='tableTitleBar responsive-table'
            style={{
               border: 'none',
               borderRadius: '50px',
               backgroundColor: 'transparent',
               margin: 'px 0 10px 0',
            }}
         >
            <thead>
               <tr
                  style={{
                     padding: '5px 0 5px 0',
                     borderRadius: '15px',
                     // border: '2px solid var(--myBrown)',
                     backgroundColor: 'var(--myYellow)',
                  }}
               >
                  <th
                     colSpan='4'
                     style={{
                        flex: '1',
                        flexGrow: '2',
                        flexBasis: '33%',
                        flexShrink: '0',
                        justifyContent: 'center',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--myBrown)',
                     }}
                  >
                     <Slider1
                        value={speechSpeed}
                        onChange={setSpeechSpeed}
                     />
                  </th>
                  <th
                     colSpan='2'
                     style={{
                        flex: '1',
                        flexGrow: '2',
                        flexBasis: '33%',
                        flexShrink: '1',
                        border: 'none',
                        backgroundColor: 'transparent',
                     }}
                  >
                     {/* <input
                        placeholder='your title...'
                        // autoFocus

                        title='Your title'
                        // pattern='[a-zA-Z]*'
                        maxLength={20}
                        // className='centred'
                        type='text'
                        value={title}
                        onChange={(e) =>
                           setTitle(
                              e.target.value.replace(
                                 /[^a-zA-Z' ]/g,
                                 ''
                              )
                           )
                        }
                     /> */}
                  </th>
                  <th
                     style={{
                        flex: '1',
                        flexGrow: '1',
                        flexShrink: '3',
                        flexBasis: '33%',
                        textAlign: 'right',
                        border: 'none',
                        alignSelf: 'flexEnd',
                        backgroundColor: 'transparent',
                     }}
                  >
                     <div className='right'>
                        <Popconfirm
                           title='Delete all words?'
                           // description='Delete all words?'
                           onConfirm={() => setWords([])}
                           // onCancel={cancel}
                           okText='Yes'
                           cancelText='No'
                        >
                           <button
                              className='cancelBtn'
                              onClick={() => handleClearList()}
                              style={{
                                 padding: '0 10px 0 10px',
                                 border: 'red solid 1px',
                                 fontWeight: '500',
                              }}
                           >
                              Clear All
                           </button>
                        </Popconfirm>
                     </div>
                  </th>
               </tr>
            </thead>
         </table>

         <table style={{}} className='responsive-table'>
            <thead>
               <tr>
                  <th title='question number' className='c1'>
                     *
                  </th>
                  <th
                     className='c2'
                     title='robot voice'
                     colSpan='2'
                     style={{ flexBasis: '12%' }}
                  >
                     <SoundOutlined />
                  </th>
                  {/* <th className='c3' title='human voice'>
                     👩‍🦲
                  </th> */}
                  <th className='c4'>Word</th>
                  <th className='c5' title='Scrambled version'>
                     Scrambled
                  </th>
                  {/* <th>Your Guess</th> */}
                  <th
                     className='c6'
                     title='Number of letters in each word'
                  >
                     #
                  </th>
                  {/* <th></th> */}
                  <th className='c7'>❌</th>
               </tr>
            </thead>
            <tbody>
               {words.map((word, index) => (
                  <tr
                     key={word.id}
                     onClick={() => {
                        console.log('index', index)
                        // handleDivClick(index)
                     }}
                  >
                     <td className='c1'>
                        <span className='gameFont'>
                           {index + 1}
                        </span>{' '}
                     </td>
                     <td className='c2'>
                        {' '}
                        <Popover
                           content={
                              'Listen to Robot pronunciation'
                           }
                        >
                           <span
                              // className='largeIcon'
                              title='LISTEN'
                              onClick={() => {
                                 robotMessage()
                                 readWord(word.spelling)
                              }}
                           >
                              🤖
                           </span>
                        </Popover>
                     </td>
                     <td className='c3'>
                        <Popover
                           content={
                              'Listen to human prounciation'
                           }
                        >
                           <span
                              // className='largeIcon'
                              onClick={() => {
                                 humanMessage()
                                 playHumanSpeech(word.spelling)
                              }}
                           >
                              {word.hasHumanVoice ? '👩‍🦲' : ' '}
                           </span>
                        </Popover>
                     </td>
                     <td className='c4'>{word.spelling}</td>
                     <td className='c5'>
                        <Popover
                           content={
                              'SYNONYMS:  ' + word.synonyms
                           }
                        >
                           {word.scrambled}
                        </Popover>
                        <Popover
                           content={'Re-Scramble this word'}
                        >
                           <span
                              className='scrambleIcon'
                              onClick={() => {
                                 playScramble()
                                 reScrambleWord(word)
                              }}
                           >
                              ♻️
                           </span>
                        </Popover>
                     </td>

                     <td
                        title='No.letters in this word'
                        className='c6'
                     >
                        <Popover
                           content={`${word.spelling.length} letters`}
                        >
                           <span className='letterCount'>
                              {word.spelling.length -
                                 word.usersGuess?.length}{' '}
                              {word.spelling.length -
                                 word.usersGuess?.length ===
                                 0 && '🤓'}
                              {word.spelling.length -
                                 word.usersGuess?.length <
                                 0 && '😩'}
                           </span>
                        </Popover>
                     </td>

                     <td className='c7'>
                        <Popover content={`Delete this word?`}>
                           <span
                              className='largeIcon'
                              onClick={() =>
                                 onDeleteWord(word.id)
                              }
                           >
                              <span className='mediumIcon'>
                                 ❌
                              </span>
                           </span>
                        </Popover>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* <p
            style={{ width: '100%', margin: '0 auto' }}
            className='longString'
         ></p> */}

         <table
            className='tableTitleBar responsive-table'
            style={{
               border: 'none',
               borderRadius: '50px',
               backgroundColor: 'transparent',
               margin: 'px 0 10px 0',
            }}
         >
            <tr
               style={{
                  padding: '5px 0 5px 0',
                  borderRadius: '15px',
                  // border: '2px solid var(--myBrown)',
                  backgroundColor: 'var(--myYellow)',
               }}
            >
               <th
                  style={{
                     textAlign: 'left',
                     justifyContent: 'flexStart',
                     alignItems: 'left',
                     flex: '1',
                     flexGrow: '1',
                     flexBasis: '50%',
                     flexShrink: '1',
                     border: 'none',
                     backgroundColor: 'transparent',
                     color: 'var(--myBrown)',
                  }}
               >
                  <div className='left'>
                     Timer:{' '}
                     <Switch
                        checkedChildren='on'
                        unCheckedChildren='off'
                        size='large'
                        onChange={(checked) => {
                           setIsTimer(!isTimer)
                           console.log(checked)
                        }}
                        // defaultChecked
                     />
                     <Slider
                        disabled={!isTimer}
                        step={30}
                        min={30}
                        max={300}
                        onChange={setTimerSeconds}
                     />
                  </div>
                  {isTimer && (
                     <div
                        className='left'
                        style={{ fontSize: '1.8rem' }}
                     >
                        {timerSeconds}s
                     </div>
                  )}
               </th>

               <th
                  style={{
                     // textAlign: 'center',
                     // justifyContent: 'center',
                     // alignItems: 'center',
                     flex: '1',
                     flexGrow: '3',
                     flexBasis: '35%',
                     flexShrink: '1',
                     border: 'none',
                     backgroundColor: 'transparent',
                  }}
               >
                  <div className='right'>
                     <input
                        placeholder='optional title...'
                        // autoFocus
                        width='1000px'
                        title='Your title'
                        // pattern='[a-zA-Z]*'
                        maxLength={20}
                        // className='centred'
                        type='text'
                        value={title}
                        onChange={(e) =>
                           setTitle(
                              e.target.value.replace(
                                 /[^a-zA-Z' ]/g,
                                 ''
                              )
                           )
                        }
                     />
                  </div>
               </th>
               <th
                  style={{
                     // textAlign: 'right',
                     // justifyContent: 'right',
                     // alignItems: 'right',
                     flex: '1',
                     flexGrow: '1',
                     flexShrink: '1',
                     flexBasis: '15%',
                     border: 'none',
                     // alignSelf: 'flexEnd',
                     backgroundColor: 'transparent',
                  }}
               >
                  <div className='right'>
                     <button onClick={() => compileData(words)}>
                        Save
                     </button>
                  </div>
               </th>
            </tr>
         </table>

         {/* <button onClick={() => console.log(words)}>
            CL WORDS
         </button> */}
      </div>
   )
}
