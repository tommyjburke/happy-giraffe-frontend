import { useState, useRef } from 'react'
import { playHumanSpeech } from '../jsFunctions/humanSpeech.js'
// import ProgressBar from '../components/ProgressBar.jsx'
// import Rewards from '../components/Rewards.jsx'
import Slider1 from '../components/Slider1.jsx'
import {
   Popover,
   message,
   Popconfirm,
   Space,
   Row,
   Col,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import DragDrop from './DragDrop.jsx'
import TypewriterEffect from '../components/TypewriterEffect.jsx'
import { InboxOutlined, SoundOutlined } from '@ant-design/icons'
import useSound from 'use-sound'
import scramble from '../media/scramble.mp3'
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch, Slider } from 'antd'
import switchSound from '../media/switch.mp3'

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

   // const [score, setScore] = useState(0)
   const [useTimer, setUseTimer] = useState(true)
   const [duration, setDuration] = useState(60)
   const [title, setTitle] = useState('my spelling game')
   // const [newUri, setNewUri] = useState('')
   // console.log('userAnswers: ', userAnswers)

   // const pattern = /^[A-Za-z']*$/
   // const rewardsRef = useRef(null)
   const inputRefs = useRef([])

   const [playScramble] = useSound(scramble)
   const [playSwitch] = useSound(switchSound)

   // const handleDivClick = (index) => {
   //    inputRefs.current[index].focus()
   // }

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

   const playAudioFile = (audioUrl) => {
      // const fileLocation =
      //    'https://api.dictionaryapi.dev/media/pronunciations/en/clear-us.mp3'
      const audio = new Audio(audioUrl)
      audio.play()
      humanMessage()
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
      robotMessage()
   }

   function filterObjects(objects) {
      return objects.map((obj) => ({
         scrambled: obj.scrambled,
         spelling: obj.spelling,
      }))
   }

   function compileData(originalData) {
      const newWordObjects = filterObjects(originalData)

      const encodedWordObjects = btoa(
         JSON.stringify(newWordObjects)
      )

      const queryParams = new URLSearchParams({
         title: title,
         useTimer: useTimer,
         duration: duration,
         wordObjects: encodedWordObjects,
      })

      // const url = `http://localhost:3000/spelling-diy?${queryParams.toString()}`

      // let uriString = queryParams.toString()

      // setNewUri(uriString)

      navigate(`diy/?${queryParams.toString()}`)
   }

   function handleClearList() {
      // const confirmed = window.confirm(
      //    'Are you sure you want to delete all words?'
      // )
      // if (confirmed) setWords([])
      // console.log('deleted all')
   }

   // const confirm = (e) => {
   //    console.log(e)
   //    message.success('Click on Yes')
   // }
   // const cancel = (e) => {
   //    console.log(e)
   //    message.error('Click on No')
   // }

   if (words.length < 1) {
      return (
         <div
            // className='table-container '
            style={{ overflowY: 'auto', overflowX: 'hidden' }}
         >
            <br />
            <div className='africanFont'>
               <span
                  style={{
                     fontSize: '4rem',
                     // backgroundColor: 'var(--myBrown)',
                     borderRadius: '50px',
                  }}
               >
                  ☝️
               </span>
               <TypewriterEffect
                  text='Add YOUR words above........'
                  myFontSize='1.2rem'
                  isLooping
               />
            </div>
            <div>
               <h5
                  className='africanFont'
                  style={{ color: 'var(--myBrown)' }}
               >
                  Use your own words to create your own spelling
                  game.
               </h5>
            </div>

            <div
               style={{
                  flex: '2 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',

                  alignItems: 'center',
                  alignContent: 'center',
                  // height: '100vh',
                  // border: 'ridge 5px darkgray',
               }}
            >
               <div>
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
                           border: 'ridge 5px darkgray',
                           width: '200px',
                           height: '100px',
                           borderRadius: '10px',
                           animation: 'none !important',
                        }}
                     >
                        <InboxOutlined /> + Drop txt/csv file
                     </button>
                  </DragDrop>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div
         // className='newTableContainer'
         style={{ marginTop: '10px', overflowY: 'auto' }}
      >
         {contextHolder}

         <table
            className='responsive-table'
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
                        flexGrow: '1',
                        flexShrink: '3',
                        flexBasis: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        border: 'none',
                        alignSelf: 'flex-start',
                        backgroundColor: 'transparent',
                        color: 'var(--myBrown)',
                        position: 'relative',
                        top: '10px',
                     }}
                  >
                     <Slider1
                        value={speechSpeed}
                        onChange={setSpeechSpeed}
                     />
                  </th>

                  <th
                     style={{
                        flex: '1',
                        flexGrow: '1',
                        flexShrink: '3',
                        flexBasis: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        textAlign: 'right',
                        border: 'none',
                        alignSelf: 'flex-end',
                        backgroundColor: 'transparent',
                     }}
                  >
                     {/* <div className='right'>
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
                              // onClick={() => handleClearList()}
                              style={{
                                 padding: '0 10px 0 10px',
                                 border: 'red solid 1px',
                                 fontWeight: '500',
                              }}
                           >
                              Clear All
                           </button>
                        </Popconfirm>
                     </div> */}
                     <div>
                        <label>Title:</label>
                        <input
                           style={{
                              color: 'var(--myOrange)',
                              width: '140px',
                              fontSize: '1.2rem',
                              // fontFamily: 'Roboto',
                           }}
                           placeholder='optional title...'
                           // autoFocus
                           // width='1000px'
                           title='Your title'
                           // pattern='[a-zA-Z]*'
                           maxLength={20}
                           // className='centred'
                           type='text'
                           value={title}
                           onChange={(e) =>
                              setTitle(
                                 e.target.value.replace(
                                    /[^a-zA-Z'0-9 ]/g,
                                    ''
                                 )
                              )
                           }
                        />
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
                  <Popover content={'listen to word'}>
                     <th
                        className='c2'
                        title='robot voice'
                        colSpan='2'
                        style={{ flexBasis: '12%' }}
                     >
                        <SoundOutlined />
                     </th>
                  </Popover>

                  <th className='c5' title='Scrambled version'>
                     Scrambled
                  </th>
                  <th className='c4'>Word</th>
                  {/* <th>Your Guess</th> */}
                  <Popover content='Number of letters in each word'>
                     <th
                        className='c6'
                        title='Number of letters in each word'
                     >
                        #
                     </th>
                  </Popover>
                  {/* <th></th> */}
                  <th className='c7'>
                     <Popover content='Clear all words'>
                        <Popconfirm
                           title='Delete all words?'
                           // description='Delete all words?'
                           onConfirm={() => setWords([])}
                           // onCancel={cancel}
                           okText='Yes'
                           cancelText='No'
                        >
                           <span
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleClearList()}
                           >
                              ❌
                           </span>
                        </Popconfirm>
                     </Popover>
                  </th>
               </tr>
            </thead>
            <tbody>
               {words.map((word, index) => (
                  <tr
                     key={word.id}
                     onClick={() => {
                        // console.log('index', index)
                        // handleDivClick(index)
                     }}
                  >
                     <td className='c1'>
                        <span className=''>
                           {index < 10 ? `0${index + 1}` : index}
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
                                 // robotMessage()
                                 readWord(word.spelling)
                              }}
                           >
                              🤖
                           </span>
                        </Popover>
                        {/* <br /> */}
                        {/* </td>
                     <td className='c3'> */}
                        <Popover
                           content={
                              'Listen to human prounciation'
                           }
                        >
                           <span
                              // className='largeIcon'
                              onClick={() => {
                                 // humanMessage()
                                 playAudioFile(word.audioLink)
                                 console.log('word', word)
                                 // playHumanSpeech(word.spelling)
                              }}
                           >
                              {word.hasHumanVoice ? '👩‍🦲' : ' '}
                           </span>
                        </Popover>
                     </td>

                     <td className='c5'>
                        <Popover
                           content={
                              'SYNONYMS:  ' + word.synonyms
                           }
                        >
                           {word.scrambled
                              .split('')
                              .map((letter, i) => (
                                 <span
                                    key={i}
                                    className='letterBox'
                                    style={{
                                       // display: 'inline-block',
                                       // width: '20px',
                                       textAlign: 'right',
                                       border: 'dashed gray 1px',
                                       borderRadius: '3px',
                                       padding: '0 0px 0 1px',
                                       // letterSpacing: '6px',
                                    }}
                                 >
                                    {letter}
                                 </span>
                              ))}
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
                     <td className='c4'>{word.spelling}</td>
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
                              className='mediumIcon'
                              onClick={() =>
                                 onDeleteWord(word.id)
                              }
                           >
                              ❌
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
            <tbody>
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

                        alignItems: 'left',
                        flex: '2 1 50%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--myBrown)',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        // alignItems: 'center',
                     }}
                  >
                     <div className=''>
                        <div
                           className='left'
                           style={{
                              paddingLeft: '10px',
                              fontSize: '1rem',
                              fontFamily: 'Roboto',
                              color: 'green',
                           }}
                        >
                           <Space>
                              Timer:{' '}
                              <Switch
                                 checkedChildren='on'
                                 unCheckedChildren='off'
                                 defaultValue={useTimer}
                                 size='large'
                                 onChange={(checked) => {
                                    playSwitch()
                                    setUseTimer(checked)
                                 }}
                                 // defaultChecked
                              />{' '}
                              <span>
                                 {convertSecondsToMinutes(
                                    duration
                                 )}
                              </span>
                           </Space>
                        </div>
                        <br />
                        <div style={{ paddingLeft: '15px' }}>
                           <Slider
                              disabled={!useTimer}
                              step={30}
                              min={30}
                              max={600}
                              onChange={setDuration}
                              defaultValue={duration}
                           />
                        </div>
                     </div>
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
                  ></th>
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
                        <button
                           style={{ width: '120px' }}
                           onClick={() => compileData(words)}
                        >
                           Build Game
                        </button>
                     </div>
                  </th>
               </tr>
            </tbody>
         </table>

         <br />

         <br />

         <br />

         <br />

         <br />

         <br />

         {/* <button onClick={() => console.log(words)}>
            CL WORDS
         </button> */}
      </div>
   )
}

function convertSecondsToMinutes(seconds) {
   const minutes = Math.floor(seconds / 60)
   const remainingSeconds = seconds % 60
   return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
   }${remainingSeconds}`
}
