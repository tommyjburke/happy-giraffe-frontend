import { useState, useEffect } from 'react'
// import { getHumanSpeech } from '../jsFunctions/humanSpeech.js'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech.js'
import DragDrop from './DragDrop.jsx'
import { message } from 'antd'

import { Popover } from 'antd'

import {
   LoadingOutlined,
   FileAddOutlined,
   DeleteOutlined,
} from '@ant-design/icons'
// import { LoadingContext } from '../components/LoadingContext'
// import Loading from '../components/Loading.jsx'
// import { message } from 'antd'

export default function Form({
   handleAddWord,
   speechSpeed,
   setSpeechSpeed,
   setWords,
   words,
   longWordsError,
   duplicatesError,
   setIsProcessing,
}) {
   const [messageApi, contextHolder] = message.useMessage()
   // const [messageApi, contextHolder] = message.useMessage()
   // const { isLoading, toggleLoading, wordData, updateWordData } =
   //    useContext(LoadingContext)
   const [spelling, setSpelling] = useState('')
   const [showWarning, setShowWarning] = useState('')
   // const [loading, setLoading] = useState(false)
   // const [error, setError] = useState(null)

   // const [duplicates, setDuplicates] = useState()
   const [transcript, setTranscript] = useState('')
   const [isListening, setIsListening] = useState(false)
   // console.log(transcript)
   // function handleSliderChange(event) {
   //    setSpeechSpeed(parseFloat(event.target.value))
   // }

   // const SpeechRecognition =
   //    window.SpeechRecognition || window.webkitSpeechRecognition
   // const recognition = SpeechRecognition
   //    ? new SpeechRecognition()
   //    : null

   // useEffect(() => {
   //    if (isListening) {
   //       recognition.start()
   //    } else {
   //       recognition.stop()
   //    }
   //    const handleSpeechResult = (event) => {
   //       setTranscript(event.results[0][0].transcript)
   //       setSpelling(event.results[0][0].transcript)
   //    }
   //    recognition.addEventListener('result', handleSpeechResult)
   //    return () => {
   //       recognition.removeEventListener(
   //          'result',
   //          handleSpeechResult
   //       )
   //    }
   // }, [isListening, recognition])

   const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

   let recognition = null

   if (SpeechRecognition) {
      recognition = new SpeechRecognition()
   }

   useEffect(() => {
      if (isListening && recognition) {
         recognition.start()
      } else if (recognition) {
         recognition.stop()
      }

      const handleSpeechResult = (event) => {
         setTranscript(event.results[0][0].transcript)
         setSpelling(event.results[0][0].transcript)
      }

      if (recognition) {
         recognition.addEventListener(
            'result',
            handleSpeechResult
         )
      }

      return () => {
         if (recognition) {
            recognition.removeEventListener(
               'result',
               handleSpeechResult
            )
         }
      }
   }, [isListening, recognition])

   const handleListening = () => {
      setIsListening((prevState) => !prevState)
   }

   const scrambleWord = (word) => {
      // Convert the word to an array of characters
      const charArray = word.split('')

      // Shuffle the array using the Fisher-Yates shuffle algorithm
      for (let i = charArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[charArray[i], charArray[j]] = [
            charArray[j],
            charArray[i],
         ]
      }
      // Convert the shuffled array back to a string
      const scrambledWord = charArray.join('')

      return scrambledWord
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!spelling) return

      const userWords = spelling

      const spellingArray = cleanWords(userWords)

      if (spellingArray.length > 40) {
         messageApi.open({
            type: 'none',
            content:
               '⛔️  Only the first 40 words will seek a human voice!',
            className: 'custom-class',
            style: {
               marginTop: '10vh',
               fontSize: '1.2rem',
               fontFamily: 'Schoolbell',
            },
         })
      }

      // console.log('spelling array', spellingArray)

      setIsProcessing(true)

      let duplicatesFound = []

      let count = 0

      for (let i = 0; i < spellingArray.length; i++) {
         // console.log('now processing:', spellingArray[i])

         if (spellingArray[i].length > 12) {
            // console.log('TOO LONG: ', spellingArray[i])
            longWordsError()
            continue
         }

         const doesWordExist = words.some(
            (word) =>
               word.spelling.toLowerCase() ===
               spellingArray[i].toLowerCase()
         )

         if (doesWordExist) {
            // console.log('DUPLICATE: ', spellingArray[i])
            duplicatesFound.push(spellingArray[i])
            // duplicatesError()
            continue
         }
         count++
         // console.log('COUNT: ', count)

         let synonyms
         let hasHumanVoice

         // console.log('i: ', i, 'word: ', spellingArray[i])
         if (count < 40) {
            const {
               hasHumanVoice: humanVoiceCheck,
               synonyms: synonymsCheck,
            } = await verifyHumanSpeech(spellingArray[i])
            hasHumanVoice = humanVoiceCheck
            synonyms = synonymsCheck
         } else {
            hasHumanVoice = false
            synonyms = []
         }

         // const { hasHumanVoice, synonyms } =
         //    await verifyHumanSpeech(spellingArray[i])

         // console.log('icon: ', icon)
         // console.log('hasHumanVoice: ', hasHumanVoice)
         // console.log('OBJECT SYNONYMS: ', synonyms)

         const scrambled = scrambleWord(spellingArray[i])

         const newWord = {
            synonyms,
            hasHumanVoice,
            // icon,
            id: `${i}-${Date.now()}`,
            spelling: spellingArray[i],
            scrambled,
            // quantity,
            usersGuess: '',
            // packed: false,
            verdict: null,
            showButton: true,
         }
         // console.log('newWord id: ', newWord.id)

         // handleAddWord(newWord)
         // const isWordExists = words.some(
         //    (word) =>
         //       word.spelling.toLowerCase() ===
         //       newWord.spelling.toLowerCase()
         // )

         // if (!isWordExists) {
         //    handleAddWord(newWord)
         // } else {
         //    duplicatesFound.push(newWord.spelling)
         //    // console.log(`${newWord.spelling} is a duplicate`)
         // }

         handleAddWord(newWord)
      }

      let allDuplicates = duplicatesFound.join(', ')
      // setDuplicates(allDuplicates)

      if (allDuplicates) {
         // console.log('ALL DUPLICATES:', duplicates)
         // console.log('STATE duplicates:', duplicates)
         duplicatesError(allDuplicates)
      }

      setTranscript('')
      setSpelling('')
      setIsProcessing(false)
      // setDuplicates('')
   }

   function handleChange(e) {
      const inputValue = e.target.value.toLowerCase()

      // const pattern = /^[A-Za-z']*$/
      const pattern = /^[A-Za-z ()']*$/

      if (pattern.test(inputValue)) {
         setSpelling(inputValue)
      } else {
         setShowWarning(true)
      }
   }

   useEffect(() => {
      let timeoutId
      if (showWarning) {
         timeoutId = setTimeout(() => {
            setShowWarning(false)
         }, 5000) // 5 seconds
      }
      return () => clearTimeout(timeoutId)
   }, [showWarning])

   const cleanWords = (content) => {
      return Array.from(
         new Set(
            content
               .replace(/\//g, ' ') // Replace / with space
               .replace(/[()]/g, '') // Remove ( and )
               .split(/\r?\n/) // Split by line breaks
               .flatMap((line) => line.split(' ')) // Split each line by spaces
               .map(
                  (word) =>
                     word
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z ]/g, '') // Remove non-alphabetic characters except spaces
               )
               .filter((word) => word !== '')
         )
      )
   }

   return (
      <div>
         {contextHolder}

         {/* <div className='formBar'>
            <FormContainer>
               <InputButtonsRow>
                  <Input
                     type='text'
                     placeholder='Enter something...'
                  />
                  <Button
                     style={{
                        backgroundColor: 'green',
                        marginLeft: '-40',
                     }}
                  >
                     +
                  </Button>
                  <Button>🎙️</Button>
               </InputButtonsRow>
               <Button>C</Button>
               <Button>D</Button>
            </FormContainer>
         </div> */}
         {/* {loading && <p>Loading...</p>}
         {error && <p>{error}</p>} */}
         <div className='formBar'>
            <form
               className='form-container'
               onSubmit={handleSubmit}
            >
               <Popover content={spelling}>
                  <div style={{ flexBasis: '' }}>
                     <input
                        style={{
                           flex: '1 2 0',
                           width: '240px',
                           marginLeft: '1.5rem',
                        }}
                        type='text'
                        placeholder='add word(s) here...'
                        value={spelling}
                        // onChange={(e) => setSpelling(e.target.value)}
                        onChange={handleChange}
                     />{' '}
                  </div>
               </Popover>

               <DeleteOutlined
                  onClick={() => setSpelling('')}
                  style={{
                     position: 'relative',
                     top: '0px',
                     left: '-36px',
                  }}
               />

               <Popover content={addWordsContent}>
                  <button
                     style={{
                        marginLeft: -42,
                        height: '2.4rem',

                        backgroundColor: 'green',
                        cursor: 'cell',
                     }}
                  >
                     ➕
                  </button>
               </Popover>

               <Popover content={voiceContent}>
                  <button
                     disabled={!SpeechRecognition}
                     onClick={handleListening}
                     style={{
                        height: '2.4rem',
                        marginLeft: -16,
                        backgroundColor: SpeechRecognition
                           ? 'var(--myBrown)'
                           : 'lightgray',
                        cursor: 'cell',
                        fontSize: '1.3rem',
                     }}
                  >
                     {!isListening ? (
                        '🎙️'
                     ) : (
                        <span>
                           ⏹️ <LoadingOutlined />
                        </span>
                     )}
                  </button>
               </Popover>

               <Popover content={dragDropContent}>
                  <div>
                     <DragDrop
                        handleAddWord={handleAddWord}
                        handleSubmit={handleSubmit}
                        setIsProcessing={setIsProcessing}
                        longWordsError={longWordsError}
                        duplicatesError={duplicatesError}
                        words={words}
                     >
                        {/* <UploadLogo /> */}
                        <button
                           className=''
                           style={{
                              // height: '2.4rem',
                              backgroundColor: 'lightgray',
                              color: 'black',
                              border: 'dashed 2px darkgray',
                              fontSize: '0.8rem',
                              marginLeft: '-20px',
                           }}
                        >
                           <FileAddOutlined />
                           txt/csv
                        </button>
                     </DragDrop>
                  </div>
               </Popover>

               {/* <button
                     className='cancelBtn'
                     style={{ backgroundColor: 'lightGray' }}
                     onClick={() => setWords([])}
                  >
                     Clear All
                  </button> */}
            </form>

            {/* <button onClick={() => setIsProcessing(true)}>
               START
            </button>
            <button onClick={() => setIsProcessing(false)}>
               STOP
            </button>
            <button
               onClick={() => console.log('WORDS: ', words)}
            >
               WORDS
            </button>
            <button
               onClick={() => {
                  duplicatesError()
               }}
            >
               DUPLS
            </button> */}
         </div>
         <div className='formBar'>
            {showWarning && <p className='warning'>{warning}</p>}
         </div>
         {/* <div className='formBar'>
            {transcript && (
               <div className='transcriptBar'>
                  <p>{transcript}</p>
               </div>
            )}
         </div> */}
         <div className='formBar'>
            {spelling && (
               <div className='transcriptBar'>
                  <p>{spelling}</p>
               </div>
            )}
         </div>
      </div>
   )
}

const addWordsContent = (
   <div
      style={{
         color: 'var(--myBrown)',
         fontFamily: 'Indie Flower',
         fontSize: '1.2rem',
      }}
   >
      <h3>ADD WORD(S)</h3>
   </div>
)

const warning = (
   <p
      style={{
         fontSize: '1.0rem',
         margin: '-8px 0px -2px 0px',
      }}
   >
      Alphabetical characters only!
   </p>
)

const dragDropContent = (
   <div
      style={{
         color: 'var(--myBrown',
         fontFamily: 'Indie Flower',
         fontSize: '1.2rem',
      }}
   >
      <h3>DRAG AND DROP</h3>
      <p>
         Drag and Drop or Click here to add <b>.CSV</b> or{' '}
         <b>.TXT</b> files.
      </p>
      <br />
      <p>
         CSV = basic spreadsheet format.
         <br />
         TXT = basic text format.
      </p>
   </div>
)

const voiceContent = (
   <div
      style={{
         color: 'var(--myBrown',
         fontFamily: 'Indie Flower',
         fontSize: '1.2rem',
      }}
   >
      <h3>SPEAK TO ADD WORD(S)</h3>
      <p
         className='gameFont'
         style={{
            color: 'red',
         }}
      >
         <b>Not</b> supported in all browsers. <br />
         Firefox and Opera do not support Speech recognition.
      </p>
      <p>
         Feel free to use your in-built{' '}
         <b>system Speech recognition</b> instead.
      </p>
   </div>
)
