import { useEffect, useState } from 'react'

const TypewriterEffect = ({
   text,
   delay = 100,
   isLooping = false,
   myColour,
   myFontSize,
   children,
}) => {
   const [displayText, setDisplayText] = useState('')
   const [currentIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
      let timeout

      if (currentIndex < text.length) {
         timeout = setTimeout(() => {
            setDisplayText(
               (prevText) => prevText + text[currentIndex]
            )
            setCurrentIndex((prevIndex) => prevIndex + 1)
         }, delay)
      } else if (isLooping) {
         // Reset the state to start the animation again
         setDisplayText('')
         setCurrentIndex(0)
      }

      return () => {
         clearTimeout(timeout)
      }
   }, [currentIndex, delay, text, isLooping])

   return (
      <span style={{ color: myColour, fontSize: myFontSize }}>
         {displayText}
      </span>
   )
}

export default TypewriterEffect
