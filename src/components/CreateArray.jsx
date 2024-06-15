import React, { useState, useRef } from 'react'

export const CreateArray = () => {
   const [input, setInput] = useState('')
   const [wordArray, setWordArray] = useState([])

   const arrayStringRef = useRef(null)

   const handleInputChange = (e) => {
      setInput(e.target.value)
   }

   const createWordArray = () => {
      const cleanedInput = input.replace(/[^\w\s]/gi, '') // Remove non-word characters
      const words = cleanedInput.split(/\s+/) // Split by whitespace
      const quotedWords = words.map((word) => `"${word}"`) // Surround each word with double quotes
      setWordArray(quotedWords)
   }

   const copyToClipboard = () => {
      const arrayString = arrayStringRef.current.textContent
      navigator.clipboard.writeText(arrayString)
   }

   return (
      <div
         className='mainContainer hero'
         style={{
            // textAlign: 'center',
            // alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '94vh',
            justifyContent: 'center',
            // justifyContent: 'flexStart',
            // alignItems: 'flexStart',
            // height: '100vh',
         }}
      >
         <div
            style={{
               flex: '1 ',
               textAlign: 'center',
               alignSelf: 'center',
            }}
         >
            <br />
            <div style={{ textAlign: 'center' }}>
               <textarea
                  type='text'
                  rows='20'
                  cols='50'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Enter words ...'
               />
            </div>
            <div>
               <button onClick={createWordArray}>
                  Create Word Array
               </button>
            </div>
         </div>

         {wordArray.length > 0 && (
            <div style={{ textAlign: 'center', flex: ' 1 ' }}>
               <div
                  style={{ backgroundColor: 'var(--myWhite)' }}
               >
                  <p
                     style={{
                        textAlign: 'center',
                        width: '300px',
                        border: '5px ridge brown',
                        padding: '10px',
                     }}
                     ref={arrayStringRef}
                  >
                     [{wordArray.join(', ')}]
                  </p>
               </div>
               <div>
                  <button
                     onClick={copyToClipboard}
                     style={{ backgroundColor: 'blue' }}
                  >
                     Copy to Clipboard
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}
