import React from 'react'

const activeRowStyle = {
   border: '0px ridge lime',
   outline: '5px groove lime',
   borderRadius: '15px',
   zIndex: 10,
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
}) {
   const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
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
      } else if (event.key === 'ArrowRight') {
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
         // rowIndex={rowIndex}
         onClick={() => {
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
                        style={{
                           color:
                              mathsObject.verdict === '❌'
                                 ? 'red'
                                 : 'green',
                        }}
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
                              console.log(mathsObject)
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
                  <span style={{ fontSize: '1.3rem' }}>
                     {mathsObject.verdict}
                  </span>{' '}
                  <span
                     style={{
                        color: 'red',
                        fontSize: '1.5rem',
                     }}
                  >
                     {mathsObject.verdict === '' ||
                     mathsObject.verdict === '❌' ? (
                        <span
                           style={{
                              fontFamily: 'Schoolbell',
                              marginLeft: '2px',
                           }}
                        >
                           {' '}
                           {mathsObject.correctAnswer}
                        </span>
                     ) : (
                        ''
                     )}
                  </span>
               </>
            )}
         </td>
      </tr>
   )
}
