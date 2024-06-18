// import React, { useRef, useEffect } from 'react'
import { Popover } from 'antd'
import useSound from 'use-sound'
import zeroSound from '../media/ding1.mp3'
import '../diy-spelling/SpellingDIY.css'
import { useState } from 'react'

export default function WordQuestion(props) {
   const {
      wordObject,
      handleRowClick,
      inputRefs,
      index,
      readWord,
      playHumanSpeech,
      handleGuess,
      checkGuess,
      activeQuestion,
      words,
      disableAllInputs,
      playAudioFile,
      // handleKeyDown,
   } = props

   const [playZeroSound] = useSound(zeroSound)

   const activeRowStyle = {
      border: '2px ridge lime',
      outline: '3px ridge lime',
      borderRadius: '8px',
   }

   const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
         let prevIndex = index - 1
         while (
            prevIndex >= 0 &&
            words[prevIndex] &&
            words[prevIndex].verdict !== ''
         ) {
            prevIndex--
         }
         if (prevIndex >= 0 && words[prevIndex]) {
            handleRowClick(prevIndex)
         }
      } else if (event.key === 'ArrowDown') {
         let nextIndex = index + 1
         const totalQuestions = words.length
         while (
            nextIndex < totalQuestions &&
            words[nextIndex] &&
            words[nextIndex].verdict !== ''
         ) {
            nextIndex++
         }
         if (nextIndex < totalQuestions && words[nextIndex]) {
            handleRowClick(nextIndex)
         }
      }
   }

   return (
      <tr
         onKeyDown={handleKeyDown}
         tabIndex={0}
         index={index}
         onClick={() => {
            // console.log('index', index)
            // console.log('inputRefs', inputRefs)
            handleRowClick(index)
         }}
         style={activeQuestion === index ? activeRowStyle : {}}
      >
         <td className='g1'>
            {index < 9 && 0}
            {index + 1}
         </td>
         <td className='g23'>
            <div>
               <span
                  className='largeIcon'
                  title='LISTEN'
                  onClick={() => readWord(wordObject.spelling)}
               >
                  <Popover
                     content={'Listen to Robot pronunciation'}
                  >
                     {' '}
                     🤖
                  </Popover>
               </span>
               <br />
               {wordObject.hasHumanVoice ? (
                  <span
                     className='largeIcon'
                     onClick={() => {
                        // playHumanSpeech(wordObject.spelling)
                        playAudioFile(wordObject.voiceUrl)
                     }}
                  >
                     <Popover
                        content={'Listen to human prounciation'}
                     >
                        👩‍🦲
                     </Popover>
                  </span>
               ) : (
                  <span> </span>
               )}
            </div>
         </td>

         <Popover
            title='SYNONYMS:'
            content={wordObject.synonyms}
         >
            <td className='g4'>
               {wordObject.scrambled
                  .split('')
                  .map((letter, i) => (
                     <span
                        key={i}
                        className='letterBox'
                        style={{
                           paddingLeft: '0px',
                           border: 'dashed gray 1px',
                           borderRadius: '2px',
                        }}
                     >
                        {letter}
                     </span>
                  ))}
            </td>
         </Popover>
         <td className='g5'>
            <input
               style={{
                  height: '3.0rem',
                  width: '90%',
                  // fontSize: '2rem',
                  fontColor: 'green',
                  letterSpacing: '1px',
               }}
               placeholder={
                  !disableAllInputs
                     ? 'your guess'
                     : wordObject.spelling
               }
               ref={(ref) => (inputRefs.current[index] = ref)}
               title='your guess'
               maxLength={16}
               // className='centred'
               type='text'
               value={wordObject.userGuess
                  .toLowerCase()
                  .replace(/[^a-zA-Z']/g, '')}
               onChange={(e) =>
                  handleGuess(
                     index,
                     e.target.value.replace(/[^a-zA-Z']/g, '')
                  )
               }
               disabled={
                  wordObject.verdict === '✅' ||
                  wordObject.verdict === '❌' ||
                  disableAllInputs
               }
               onKeyDown={(e) => {
                  if (
                     e.key === 'Enter' ||
                     e.key === 'NumpadEnter'
                  ) {
                     checkGuess(index)
                  }
               }}
            />
         </td>
         <td className='g6 letterCount'>
            <Popover
               title='Number of letters:'
               content={wordObject.spelling.length}
            >
               <span
                  className={
                     wordObject.spelling.length -
                        wordObject.userGuess?.length ===
                     0
                        ? 'green'
                        : wordObject.spelling.length -
                             wordObject.userGuess?.length <
                          0
                        ? 'red'
                        : 'myOrange'
                  }
               >
                  {wordObject.spelling.length -
                     wordObject.userGuess?.length >
                     0 && '🙄'}
                  {wordObject.spelling.length -
                     wordObject.userGuess?.length ===
                     0 && '🤗'}
                  {wordObject.spelling.length -
                     wordObject.userGuess?.length <
                     0 && '😡'}
                  <br />
                  {wordObject.spelling.length -
                     wordObject.userGuess?.length}
                  {wordObject.spelling.length ===
                     wordObject.userGuess?.length &&
                  index === activeQuestion &&
                  wordObject.verdict === ''
                     ? playZeroSound()
                     : null}
               </span>
            </Popover>
         </td>
         <td className='g7'>
            <div>
               {wordObject.showButton && !disableAllInputs && (
                  <button
                     className='goButton'
                     onClick={() => checkGuess(index)}
                     disabled={disableAllInputs}
                  >
                     GO
                  </button>
               )}
               {wordObject.verdict && (
                  <span>{wordObject.verdict}</span>
               )}
               <br />
               {wordObject.verdict === '❌' && (
                  <>
                     <span className='correction'>
                        {wordObject.spelling}
                     </span>
                  </>
               )}
               {wordObject.verdict === '' &&
                  disableAllInputs && <p>🥵</p>}
            </div>
         </td>
      </tr>
   )
}
