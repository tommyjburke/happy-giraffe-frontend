import {
   useState,
   useRef,
   useEffect,
   useContext,
   createContext,
} from 'react'
import ksData2 from '../data/ksData2.json'
import KsSpellingConfigForm from './KsSpellingConfigForm'
import './KsSpellingConsole.css'
import useSound from 'use-sound'
import gunshot from '../media/gunshot.mp3'
import WordFilterLength from './LettersFilterLength'
import RandomWordSelector from './RandomWordSelector'
import TypewriterEffect from '../components/TypewriterEffect'
import { cleanWords } from '../jsFunctions/jsFunctions.js'
import { Helmet } from 'react-helmet-async'

export default function KsSpellingConsole({ children }) {
   const [shoot] = useSound(gunshot)
   const [selectedYear, setSelectedYear] = useState(null)
   const [selectedLesson, setSelectedLesson] = useState(null)
   const [wordArray, setWordArray] = useState([])
   const [filteredWords, setFilteredWords] = useState([])
   const [wordLengthConfirmed, setWordLengthConfirmed] =
      useState(false)
   const filteredWordsLengthRef = useRef(filteredWords.length)

   const [tempFilteredWords, setTempFilteredWords] = useState([])
   // const [formData, setFormData] = useState({
   //    lesson: '',
   //    customTitle: '',
   //    message: '',
   //    previewWords: false,
   //    usePreviewWordsTimer: false,
   //    useGameTimer: false,
   //    words: [],
   //    minWordLength: 0,
   //    maxWordLength: 12,
   // })

   useEffect(() => {
      document.title = 'Happy Giraffe: KS Spelling 🦒'
      setWordLengthConfirmed(false)
      // console.log('onload word array:', wordArray)
   }, [])

   const handleYearClick = (year) => {
      setWordLengthConfirmed(false)
      setSelectedYear(year)
      setSelectedLesson(null)
   }

   const handleLessonClick = (lesson) => {
      setWordLengthConfirmed(false)
      setSelectedLesson(lesson)
      // const words = lesson.wordArray
      const cleaned = cleanWords(lesson.wordArray)
      console.log('cleaned', cleaned)

      const words = [...new Set(cleaned)]

      setWordArray(words)
      setFilteredWords(words)
      setTempFilteredWords(words)
   }

   const renderYearButtons = () => {
      const years = Object.keys(ksData2.year)

      if (!selectedYear) {
         return (
            <div className='yearButtons buttonsContainer'>
               {years.map((year) => (
                  <button
                     className='menuButton'
                     key={year}
                     onClick={() => handleYearClick(year)}
                  >
                     {year}
                  </button>
               ))}
            </div>
         )
      }
      return null
   }

   const renderLessonButtons = () => {
      if (!selectedYear) return null
      const lessons = ksData2.year[selectedYear].lessons
      return (
         <div className='yearButtons buttonsContainer'>
            {lessons.map((lesson) => (
               <button
                  className='menuButton'
                  key={lesson.name}
                  onClick={() => {
                     setWordLengthConfirmed(false)
                     handleLessonClick(lesson)
                  }}
               >
                  {lesson.name}
               </button>
            ))}
            <button
               className='backButtonStyle'
               onClick={handleGoBack}
            >
               ⏎ Go Back
            </button>
         </div>
      )
   }

   const handleGoBack = () => {
      setWordLengthConfirmed(false)
      setSelectedYear(null)
      setSelectedLesson(null)
      setWordArray([])
      setWordLengthConfirmed(false)
      console.log('worldLengthConfirmed: ', wordLengthConfirmed)
   }

   const shootWord = (index, word) => {
      if (filteredWords.length < 2) return
      shoot()
      console.log(word, index)
      const tempArray = [...filteredWords]
      tempArray.splice(index, 1)
      setFilteredWords(tempArray)
      setTempFilteredWords(tempArray)
      console.log('NEW ARRAY: ', filteredWords)
   }

   return (
      <>
         <Helmet>
            <title>
               Happy Giraffe - KeyStage Spelling Console and Quiz
               Games for Kids/Children 🦒
            </title>
            <meta
               name='description'
               content='KS Spelling Console. Select key stage and lesson. Interactive Rote learning, spelling and maths made fun for kids. Filter words by length. Select random words.'
            />
            <link rel='canonical' href='/ks-spelling' />
         </Helmet>
         <div
            className='  mainContainer hero'
            style={{
               marginBottom: '100px',
               // paddingBottom: '100px',
            }}
         >
            <h1>KS Spelling Console </h1>
            <div
               style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                  alignContent: 'center',
               }}
            >
               {renderYearButtons()}
            </div>

            <div className='buttonsContainer'>
               {selectedYear && renderLessonButtons()}
            </div>

            <div
               className='doubleContainer'
               // style={{ border: '2px dotted pink' }}
               style={{ marginBottom: '100px' }}
            >
               {wordArray < 1 && (
                  <div
                     style={{
                        textAlign: 'center',
                        width: '100%',
                     }}
                  >
                     <br />
                     <h2>NO WORDS YET...</h2>
                     {/* <h2>☝️ Select KeyStage level.</h2> */}
                     <div style={{ fontFamily: 'Indie Flower' }}>
                        <span style={{ fontSize: '2rem' }}>
                           ☝️
                        </span>
                        <TypewriterEffect
                           text='Select KeyStage Level.........'
                           myFontSize='1.4rem'
                           isLooping
                        />
                     </div>
                  </div>
               )}
               <div className='leftFormBox'>
                  {wordArray?.length > 0 && (
                     <div>
                        <KsSpellingConfigForm
                           // setFormData={setFormData}
                           // formData={formData}
                           setWordLengthConfirmed={
                              setWordLengthConfirmed
                           }
                           lesson={selectedLesson}
                           wordArray={wordArray}
                           setWordArray={setWordArray}
                           filteredWords={filteredWords}
                           setFilteredWords={setFilteredWords}
                           tempFilteredWords={tempFilteredWords}
                           setTempFilteredWords={
                              setTempFilteredWords
                           }
                        >
                           <WordFilterLength
                              setWordLengthConfirmed={
                                 setWordLengthConfirmed
                              }
                              wordLengthConfirmed={
                                 wordLengthConfirmed
                              }
                              filteredWordsLengthRef={
                                 filteredWordsLengthRef
                              }
                              wordArray={wordArray}
                              setWordArray={setWordArray}
                              filteredWords={filteredWords}
                              setFilteredWords={setFilteredWords}
                              tempFilteredWords={
                                 tempFilteredWords
                              }
                              setTempFilteredWords={
                                 setTempFilteredWords
                              }
                           />

                           <div>
                              <RandomWordSelector
                                 wordLengthConfirmed={
                                    wordLengthConfirmed
                                 }
                                 wordArray={wordArray}
                                 setWordArray={setWordArray}
                                 filteredWords={filteredWords}
                                 setFilteredWords={
                                    setFilteredWords
                                 }
                                 tempFilteredWords={
                                    tempFilteredWords
                                 }
                                 setTempFilteredWords={
                                    setTempFilteredWords
                                 }
                              />
                           </div>
                        </KsSpellingConfigForm>
                        <div></div>
                     </div>
                  )}
               </div>

               {wordArray?.length > 0 && (
                  <div className='rightWordListBox'>
                     <div className='wordList'>
                        <h4
                           style={{
                              textDecoration: 'underline',
                              color: 'var(--myYellow)',
                              fontFamily: 'Permanent Marker',
                           }}
                        >
                           {selectedLesson.name} WORDS:{' '}
                           <span
                              style={{
                                 backgroundColor:
                                    'var(--myOrange)',
                                 color: 'brown',
                                 float: 'right',
                                 padding: '2px 5px',
                                 borderRadius: '10px',
                                 fontSize: '0.8rem',
                              }}
                           >
                              🔫 TO DELETE
                           </span>
                        </h4>{' '}
                        {filteredWords === tempFilteredWords && (
                           <p style={{ padding: '15px 15px' }}>
                              {filteredWords.map(
                                 (word, index) => (
                                    <span
                                       className='wordTarget'
                                       key={index}
                                       onClick={() => {
                                          shootWord(index, word)
                                       }}
                                    >
                                       {word}{' '}
                                    </span>
                                 )
                              )}
                              <br />
                              <span className='wordCount'>
                                 {filteredWords.length} words
                              </span>
                           </p>
                        )}
                        {filteredWords !== tempFilteredWords && (
                           <p>
                              {' '}
                              <span className='wordCount '>
                                 {tempFilteredWords.length} words
                              </span>{' '}
                              <div
                                 style={{
                                    fontFamily:
                                       'Permanent Marker',
                                    fontSize: '0.8rem',
                                 }}
                                 className='filteringTypewriter'
                              >
                                 {' '}
                                 ⛔️{' '}
                                 <TypewriterEffect
                                    color='red'
                                    myFontSize={'0.8rem'}
                                    text='Filtering........'
                                    isLooping
                                 />{' '}
                              </div>
                              {tempFilteredWords.map(
                                 (word, index) => (
                                    <span
                                       className='flashingText'
                                       style={{
                                          color: 'yellow',
                                       }}
                                       key={index}
                                       // onClick={() => {
                                       //    shootWord(index, word)
                                       // }}
                                    >
                                       {word}{' '}
                                    </span>
                                 )
                              )}
                              <br />
                           </p>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}
