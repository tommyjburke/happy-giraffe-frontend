import React, { useState } from 'react'
import spellingData from '../data//spellingLists.json'
// import WordFilterLength from '../ks-spelling/WordFilterLength'

const SpellingPractice = () => {
   const [selectedTheme, setSelectedTheme] = useState(null)
   const [allWords, setAllWords] = useState([])

   const handleThemeSelection = (theme) => {
      console.log('theme: ', theme)
      console.log('theme.words: ', theme.words)
      const chosenWords = theme.words
      console.log('CHOSEN-WORDS : ', chosenWords)
      if (theme === selectedTheme) {
         // setSelectedTheme((currentTheme) => !currentTheme)
         setAllWords([])
      } else {
         setSelectedTheme(theme)

         setAllWords(chosenWords)

         // console.log(selectedTheme.words)
         // setWords(selectedTheme.words)
      }
   }

   console.log('selectedTheme: ', selectedTheme)
   console.log('All words: ', allWords)

   // console.log('WORDS: ', selectedTheme.words)

   return (
      <div
         style={{
            alignItems: 'center',
            textAlign: 'center',
            margin: '2rem',
         }}
      >
         <h2 style={{ color: 'var(--myOrange)' }}>
            Select a Spelling Theme:
         </h2>
         <div>
            {spellingData.Y2P3.map((item, index) => (
               <button
                  key={index}
                  onClick={() => handleThemeSelection(item)}
               >
                  {item.theme}
               </button>
            ))}
         </div>
         <hr />
         <br />
         <hr />
         <div>
            <h3>
               Selected Theme:{' '}
               {selectedTheme ? selectedTheme.theme : 'None'}
            </h3>
            <p>
               {selectedTheme &&
                  selectedTheme.words.map((word, index) => (
                     <span key={index}>{word} </span>
                  ))}
            </p>

            {/* <ul>
               {words &&
                  words.map((word, index) => (
                     <li key={index}>{word}</li>
                  ))}
            </ul> */}
         </div>
         <hr />
         <div>
            {' '}
            allWords Length:{' '}
            {allWords.length > 0 && <p>{allWords.length}</p>}
            {allWords.length >= 1 && (
               <div>
                  <h1>WORD FILTER LENGTH</h1>
                  {/* <WordFilterLength
                     key={selectedTheme.theme}
                     allWords={allWords}
                     // words={selectedTheme.words}
                  /> */}
               </div>
            )}
         </div>
         <hr />
      </div>
   )
}

export default SpellingPractice
