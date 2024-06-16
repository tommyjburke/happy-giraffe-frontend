import React, { useState, useEffect } from 'react'
import { Slider } from 'antd'

const RandomWordSelector = ({
   wordArray,
   setWordArray,
   filteredWords,
   setFilteredWords,
   tempFilteredWords,
   setTempFilteredWords,
   filteredWordsLength,
   wordLengthConfirmed,
}) => {
   const [selectedWords, setSelectedWords] = useState([])
   const [userNumber, setUserNumber] = useState()
   // const [tempFilteredWords, setTempFilteredWords] =
   //    useState(filteredWords)

   // useState(() => {
   //    setTempFilteredWords(filteredWords)
   // })

   useEffect(() => {
      setUserNumber(filteredWords.length)
   }, [filteredWords])

   const [randomWordsMax, setRandomWordsMax] = useState()

   // useEffect(() => {
   //    setRandomWordsMax(filteredWords.length)
   //    setTempFilteredWords(filteredWords)
   //    setUserNumber(filteredWords.length)
   //    console.log(
   //       'randomWordsMax: ',
   //       randomWordsMax,
   //       'userNumber: ',
   //       userNumber
   //    )
   // }, [filteredWords])

   const totalNoWords = tempFilteredWords.length

   const initialNumber = parseInt(
      totalNoWords >= 12 ? 12 : totalNoWords
   )

   const handleNumberChange = (value) => {
      // const userNumber = parseInt(e.target.value)
      setUserNumber(value)
   }

   const selectRandomWords = (userNumber) => {
      const randomWords = []

      const selectedIndices = []
      for (let i = 0; i < userNumber; i++) {
         let randomIndex
         do {
            randomIndex = Math.floor(
               Math.random() * filteredWords.length
            )
         } while (selectedIndices.includes(randomIndex))
         selectedIndices.push(randomIndex)
         randomWords.push(filteredWords[randomIndex])
      }

      setSelectedWords(randomWords)
      setTempFilteredWords(randomWords)
   }

   // useEffect(() => {
   //    const totalNoWords = filteredWords.length
   //    // const initialNumber = parseInt(
   //    //    totalNoWords >= 12 ? 12 : totalNoWords
   //    // )

   //    // selectRandomWords()
   // }, [filteredWords])

   useEffect(() => {
      setUserNumber(filteredWords.length)
   }, [filteredWords.length])

   function handleRandomSliderChange(value) {
      setUserNumber(value)
   }

   return (
      <div className='configBox'>
         <label>Select Random Words:</label>
         {/* <input
            type='number'
            value={userNumber}
            onChange={handleNumberChange}
         /> */}
         <div
            style={{
               display: 'flex',
               // justifyContent: 'center',
               width: '100%',
            }}
         >
            <Slider
               style={{
                  width: '200px',
                  margin: '10px 1.5rem 10px 1.5rem',
               }}
               // horizontal
               // range
               disabled={!wordLengthConfirmed}
               // dots={true}
               step={1}
               min={1}
               max={filteredWords.length}
               value={userNumber}
               // value={[lowerValue, upperValue]}
               // trackStyle={{
               //    backgroundColor: 'lightgreen',
               // }}
               // railStyle={{ backgroundColor: 'grey' }}
               onChange={(value) => {
                  selectRandomWords(value)
                  handleNumberChange(value)
               }}
            />
            {randomWordsMax || userNumber}
         </div>
         <div style={{ textAlign: 'right' }}>
            {wordLengthConfirmed && (
               <button
                  className='confirmBtn flashingBorder'
                  onClick={() =>
                     setFilteredWords(tempFilteredWords)
                  }
               >
                  Confirm {userNumber} Random Words
               </button>
            )}
         </div>
      </div>
   )
}

export default RandomWordSelector
