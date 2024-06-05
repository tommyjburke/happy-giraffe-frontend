import React, { useState, useRef } from 'react'

export const CreateArray = () => {
   const [input, setInput] = useState('')
   const [wordArray, setWordArray] = useState([])

   const arrayStringRef = React.useRef(null)

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
            textAlign: 'center',
            // display: 'flex',
            // justifyContent: 'flexStart',
            // alignItems: 'flexStart',
            // height: '100vh',
         }}
      >
         <br />
         <div style={{ textAlign: 'center' }}>
            <textarea
               type='text'
               rows='20'
               cols='60'
               value={input}
               onChange={handleInputChange}
               placeholder='Enter words separated by spaces'
            />
            <br />
            <button onClick={createWordArray}>
               Create Word Array
            </button>
         </div>
         <br />
         <br />
         {/* <p
            style={{
               textAlign: 'center',
               width: '300px',
               border: '1px solid brown',
               padding: '10px',
            }}
         >
            {' '}
            [{wordArray.join(', ')}]
         </p> */}

         <p
            style={{
               textAlign: 'center',
               width: '300px',
               border: '1px solid brown',
               padding: '10px',
            }}
            ref={arrayStringRef}
         >
            [{wordArray.join(', ')}]
         </p>
         <button onClick={copyToClipboard}>
            Copy to Clipboard
         </button>
      </div>
   )
}
