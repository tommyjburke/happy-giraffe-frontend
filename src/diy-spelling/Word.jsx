import { getHumanSpeech } from '../jsFunctions/humanSpeech.js'
import { playHumanSpeech } from '../jsFunctions/humanSpeech.js'
import { Popover } from 'antd'

export default function Word({
   word,
   scrambled,
   onDeleteWord,
   onToggleWord,
   reScrambleWord,
   index,
   speechSpeed,
   handleGuess,
   inputRefs,
   checkGuess,
}) {
   const readWord = (text) => {
      const synth = window.speechSynthesis
      const utterThis = new SpeechSynthesisUtterance(text)
      utterThis.rate = speechSpeed
      synth.speak(utterThis)
   }

   return (
      // <div key={index}>

      <tr key={index}>
         <td>{index + 1}.</td>

         <td
            className='largeIcon'
            onClick={() => readWord(word.spelling)}
         >
            <span className='largeIcon'>⏯️</span>
         </td>
         {word.hasHumanVoice ? (
            <td
               className='largeIcon'
               onClick={() => playHumanSpeech(word.spelling)}
            >
               <span className='largeIcon'>⏯️</span>
            </td>
         ) : (
            <td className=''>␀</td>
         )}

         {/* <td>
               <span
                  className='largeIcon'
                  onClick={() =>
                     handleHumanSpeech(word.spelling)
                  }
               >
                  <span className='largeIcon'>👩‍🦲</span>
               </span>
            </td> */}
         <Popover
            content={`This word has ${word.spelling.length} letters`}
         >
            <td>{word.spelling.length}</td>
         </Popover>
         <td
            style={
               word.packed
                  ? { textDecoration: 'line-through' }
                  : {}
            }
         >
            {word.spelling} {'  '}
         </td>

         <td>
            {' '}
            <Popover content={word.synonyms} title='Synonyms'>
               {word.scrambled}
            </Popover>
         </td>

         {/* <td>
            <input
               // autoFocus
               ref={(ref) => (inputRefs.current[index] = ref)}
               title='your guess'
               className='centred'
               type='text'
               value={word.usersGuess}
               onChange={(e) =>
                  handleGuess(index, e.target.value)
               }
               // placeholder='Write here'
               disabled={
                  word.verdict === '✅' || word.verdict === '❌'
               }
               onKeyUp={(e) => {
                  if (
                     e.code === 'Enter' ||
                     e.code === 'NumpadEnter'
                  ) {
                     checkGuess(index)
                  }
               }}
            />
         </td> */}

         <td title='No.letters in this word'>
            <span
               style={{
                  fontFamily: 'Orbitron',
                  fontSize: '1.2rem',
               }}
            >
               {word.spelling.length - word.usersGuess?.length}{' '}
               {word.spelling.length -
                  word.usersGuess?.length ===
                  0 && '🤓'}
               {word.spelling.length - word.usersGuess?.length <
                  0 && '😩'}
            </span>
         </td>

         <td>
            {' '}
            <span
               className='largeIcon'
               onClick={() => reScrambleWord(word)}
            >
               ♻️
            </span>
         </td>

         <td>
            {' '}
            <button
               className='largeIcon'
               onClick={() => onDeleteWord(word.id)}
            >
               <span className='largeIcon'>❌</span>
            </button>
         </td>
      </tr>
      // </div>
   )
}
