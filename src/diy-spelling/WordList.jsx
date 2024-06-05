import { useState } from 'react'
import Word from './Word'
import BuildSpellingBoard from './BuildSpellingBoard'
import Slider1 from '../components/Slider1'

export default function WordList({
   words,
   reScrambleWord,
   onDeleteWord,
   onToggleWord,
   onClearList,
   speechSpeed,
   setSpeechSpeed,
}) {
   const [sortBy, setSortBy] = useState('input')
   const [showMenu, setShowMenu] = useState(true)

   let sortedWords = words

   // const readWord = (text) => {
   //    const synth = window.speechSynthesis
   //    const utterThis = new SpeechSynthesisUtterance(text)
   //    synth.speak(utterThis)
   // }

   // function handleSliderChange(event) {
   //    setSpeechSpeed(parseFloat(event.target.value))
   // }

   // function assembleBoard() {
   //    console.log('ASSEMBLE BOARD')
   //    setShowMenu(false)
   //    console.log('ALL WORDS: ', words)
   // }

   // if (sortBy === 'input') sortedWords = words

   // if (sortBy === 'spelling')
   //    sortedWords = words
   //       .slice()
   //       .sort((a, b) => a.spelling.localeCompare(b.spelling))

   // if (sortBy === 'packed')
   //    sortedWords = words
   //       .slice()
   //       .sort((a, b) => Number(a.packed) - Number(b.packed))

   // if (showMenu) {
   //    return (
   //       <>
   //          {words.length < 1 && (
   //             <div className='list'>
   //                Add word(s) above to begin
   //             </div>
   //          )}
   //          {words.length > 0 && (
   //             <>
   //                <div className='list'>
   //                   {/* <Slider1
   //                      value={speechSpeed}
   //                      onChange={setSpeechSpeed}
   //                   /> */}

   //                   <table style={{ width: '640px' }}>
   //                      <thead>
   //                         <tr>
   //                            <th></th>
   //                            <th colspan='8'>
   //                               <Slider1
   //                                  value={speechSpeed}
   //                                  onChange={setSpeechSpeed}
   //                               />
   //                            </th>
   //                         </tr>
   //                         <tr>
   //                            <th title='question number'> </th>
   //                            <th title='robot speech'>🤖</th>
   //                            <th title='human speech'>👩‍🦲</th>
   //                            <th title='Number of letter in word'>
   //                               #Letters
   //                            </th>
   //                            <th>word</th>
   //                            <th title='scrambled spelling'>
   //                               scrambled
   //                            </th>
   //                            <th title='Click to rescramble spelling'>
   //                               ReScramble
   //                            </th>
   //                            <th>Delete</th>
   //                         </tr>
   //                      </thead>

   //                   <button onClick={() => assembleBoard()}>
   //                      ASSEMBLE BOARD
   //                   </button>
   //                   {/* <div className='actions'>
   //                      <select
   //                         value={sortBy}
   //                         onChange={(e) =>
   //                            setSortBy(e.target.value)
   //                         }
   //                      >
   //                         <option value='input'>
   //                            Sort by input order
   //                         </option>
   //                         <option value='spelling'>
   //                            Sort by spelling
   //                         </option>
   //                         <option value='packed'>
   //                            Sort by packed status
   //                         </option>
   //                      </select>
   //                      <button onClick={onClearList}>
   //                         Clear list
   //                      </button>
   //                   </div> */}
   //                </div>
   //             </>
   //          )}
   //       </>
   //    )
   // } else {

   {
      /* <div className='list'>

                  &times;
               </button>{' '}
               {JSON.stringify(words)}{' '}
               {words.map((word) => (
                  <div>
                     {word.scrambled}{' '}
                     <input
                        type='text'
                        placeholder='fix spelling'
                        // value={word.usersGuess}
                        // onChange={(e) => setspelling(e.target.value)}
                        onChange={handleSpelling}
                     />
                  </div>
               ))}
            </div>
            <p></p> */
   }

   return (
      <>
         {/* <tbody>
            {sortedWords.map((word, index) => (
               <Word
                  index={index}
                  word={word}
                  onDeleteWord={onDeleteWord}
                  onToggleWord={onToggleWord}
                  key={word.id}
                  reScrambleWord={reScrambleWord}
                  speechSpeed={speechSpeed}
               />
            ))}
         </tbody> */}

         {/* <BuildSpellingBoard
            words={words}
            speechSpeed={speechSpeed}
            setSpeechSpeed={setSpeechSpeed}
            onDeleteWord={onDeleteWord}
            reScrambleWord={reScrambleWord}
         /> */}
      </>
   )
}
