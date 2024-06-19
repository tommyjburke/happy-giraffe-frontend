import { Helmet } from 'react-helmet-async'
import ksData2 from '../data/ksData2.json'
import { cleanWords } from '../jsFunctions/jsFunctions.js'
import { useState, useEffect } from 'react'

export default function KsPresets() {
   const [selectedYear, setSelectedYear] = useState('')
   const [wordList, setWordList] = useState([])
   const [selectedWords, setSelectedWords] = useState([])

   useEffect(() => {
      if (selectedYear) {
         const wordsSet = new Set()
         const lessons = ksData2.year[selectedYear].lessons

         lessons.forEach((lesson) => {
            lesson.wordArray.forEach((word) => {
               wordsSet.add(word)
            })
         })

         // Convert Set to Array and update state
         setWordList(Array.from(wordsSet))
      }
   }, [selectedYear])

   const handleYearChange = (e) => {
      setSelectedYear(e.target.value)
      setSelectedWords([]) // Clear selected words when changing the year
   }

   const selectWords = () => {
      const shuffledWords = [...wordList].sort(
         () => 0.5 - Math.random()
      )
      const wordsToDisplay = shuffledWords.slice(0, 30)
      setSelectedWords(wordsToDisplay)
   }

   const renderYearButtons = () => {
      const years = Object.keys(ksData2.year)

      const selectWords = () => {
         const shuffledWords = [...wordList].sort(
            () => 0.5 - Math.random()
         )
         const wordsToDisplay = shuffledWords.slice(0, 30)
         setSelectedWords(wordsToDisplay)
      }

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

   return (
      <>
         <div className='mainContainer hero'>
            <Helmet>
               <title>
                  Happy Giraffe - KeyStage Spelling Game Presets
                  🦒
               </title>
               <meta
                  name='description'
                  content='Happy Giraffe - KeyStage Spelling Game'
               />
               {/* <link rel='canonical' href='/' /> */}
            </Helmet>
            {/* <Spin spinning={isProcessing} size='large' fullscreen /> */}
            <h1>Random KeyStage Presets</h1>
            <div>{renderYearButtons()}</div>
            <div>{selectedYear}</div>

            <div style={{ textAlign: 'center' }}>
               <h1>Unique Words from Selected Year</h1>
               <div>
                  <label htmlFor='year-select'>
                     Select Year:{' '}
                  </label>
                  <select
                     id='year-select'
                     onChange={handleYearChange}
                     value={selectedYear}
                  >
                     <option value=''>--Select a year--</option>
                     {Object.keys(ksData2.year).map((year) => (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     ))}
                  </select>
               </div>
               {wordList.length > 0 && (
                  <>
                     <ul>
                        {wordList.map((word, index) => (
                           <li key={index}>{word}</li>
                        ))}
                     </ul>
                     <button onClick={selectWords}>
                        Select 30 Words
                     </button>
                  </>
               )}
               {selectedWords.length > 0 && (
                  <div>
                     <h2>Selected Words</h2>
                     <div>
                        {selectedWords.map((word, index) => (
                           <p key={index}>{word}</p>
                        ))}
                     </div>
                  </div>
               )}
            </div>
            <br />
            <br />
            <br />
            <br />
         </div>
      </>
   )
}
