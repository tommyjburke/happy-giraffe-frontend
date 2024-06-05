import React, { useState, useEffect } from 'react'

const Poo = () => {
   const [showLetter, setShowLetter] = useState(false)
   const [timeoutId, setTimeoutId] = useState(null)

   useEffect(() => {
      return () => {
         clearTimeout(timeoutId)
      }
   }, [timeoutId])

   const handleButtonClick = () => {
      setShowLetter(true)
      const id = setTimeout(() => {
         setShowLetter(false)
      }, 1000)
      setTimeoutId(id)
   }

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
         }}
      >
         <button onClick={handleButtonClick}>Click me</button>
         {showLetter && <h1>A</h1>}
      </div>
   )
}

export default Poo
