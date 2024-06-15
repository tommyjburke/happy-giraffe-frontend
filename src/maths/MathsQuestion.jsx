import React from 'react'

const activeRowStyle = {
   border: '2px ridge lime',
   outline: '3px ridge lime',
   borderRadius: '15px',
   zIndex: 1000,
}

export default function MathsQuestion({
   mathsObjects,
   mathsObject,
   rowIndex,
   handleUserInput,
   checkGuess,
   activeQuestion,
   disableAllInputs,
   handleRowClick,
   inputRefs,

   // handleChange,

   //    key = index,
}) {
   // console.log('~~~~ mathsObject', mathsObject)
   // const checkButton = (
   //    <button
   //       onClick={(rowIndex, key) => {
   //          // checkGuess(rowIndex)
   //          console.log('checkButton', rowIndex.target)
   //          console.log(key)
   //       }}
   //    >
   //       Check
   //    </button>
   // )

   const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
         let prevIndex = rowIndex - 1
         while (
            prevIndex >= 0 &&
            mathsObjects[prevIndex] &&
            mathsObjects[prevIndex].verdict !== ''
         ) {
            prevIndex--
         }
         if (prevIndex >= 0 && mathsObjects[prevIndex]) {
            handleRowClick(prevIndex)
         }
      } else if (event.key === 'ArrowDown') {
         let nextIndex = rowIndex + 1
         const totalQuestions = mathsObjects.length
         while (
            nextIndex < totalQuestions &&
            mathsObjects[nextIndex] &&
            mathsObjects[nextIndex].verdict !== ''
         ) {
            nextIndex++
         }
         if (
            nextIndex < totalQuestions &&
            mathsObjects[nextIndex]
         ) {
            handleRowClick(nextIndex)
         }
      }
   }

   return (
      <tr
         key={rowIndex}
         onKeyDown={handleKeyDown}
         tabIndex={0}
         rowIndex={rowIndex}
         onClick={() => {
            // console.log('index', index)
            // console.log('inputRefs', inputRefs)
            // console.log('rowIndex', rowIndex)
            handleRowClick(rowIndex)
         }}
         style={
            activeQuestion === rowIndex ? activeRowStyle : {}
         }
      >
         <td className='maths-index'>
            <span className='maths-index'>
               {rowIndex < 9 ? '0' : ''}
               {rowIndex + 1}
            </span>
         </td>
         {['a', 'op', 'b', 'equals', 'c'].map((key) => (
            <td key={key} className={`m2 maths-${key}`}>
               {typeof key === 'string' ? (
                  mathsObject.hiddenBox === key ? (
                     <input
                        ref={(ref) =>
                           (inputRefs.current[rowIndex] = ref)
                        }
                        disabled={
                           mathsObject.isDisabled ||
                           disableAllInputs
                        }
                        className='mathsInput'
                        type='number'
                        onChange={(e) =>
                           handleUserInput(e, rowIndex)
                        }
                        onKeyDown={(e) => {
                           if (
                              e.key === 'Enter' ||
                              e.key === 'NumpadEnter'
                           ) {
                              checkGuess(rowIndex)
                           }
                        }}
                     />
                  ) : key === 'equals' ? (
                     <span>=</span>
                  ) : (
                     mathsObject[key]
                  )
               ) : null}
            </td>
         ))}
         <td className='mButton'>
            {!mathsObject.isDisabled && !disableAllInputs ? (
               <button
                  style={{
                     margin: '0 5px',
                     backgroundColor: disableAllInputs
                        ? 'gray'
                        : 'green',
                  }}
                  disabled={
                     mathsObject.isDisabled || disableAllInputs
                  }
                  onClick={() => {
                     console.log(
                        'local disabled?: ',
                        mathsObject.isDisabled
                     )
                     checkGuess(rowIndex)
                  }}
               >
                  GO
               </button>
            ) : (
               ''
            )}

            {(mathsObject.isDisabled || disableAllInputs) && (
               <>
                  <span>{mathsObject.verdict}</span>{' '}
                  <span
                     style={{
                        color: 'red',
                        fontSize: '1.5rem',
                     }}
                  >
                     {mathsObject.verdict === '' ||
                     mathsObject.verdict === '❌'
                        ? mathsObject.correctAnswer
                        : ''}
                  </span>
               </>
            )}
         </td>
      </tr>
   )
}
