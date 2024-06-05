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
   // console.log('RANDOM STARTING', wordArray)
   const [selectedWords, setSelectedWords] = useState([])
   const [userNumber, setUserNumber] = useState()

   useState(() => {
      setTempFilteredWords(filteredWords)
   })

   useEffect(() => {
      setUserNumber(filteredWords.length)
   }, [filteredWords])

   console.log(
      'RandomWordSelector length: ',
      filteredWords.length
   )
   console.log('UserNumber: ', userNumber)
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
      // const wordCount = Math.min(
      //    userNumber,
      //    filteredWords.length
      // )

      for (let i = 0; i < userNumber; i++) {
         const randomIndex = Math.floor(
            Math.random() * filteredWords.length
         )
         randomWords.push(filteredWords[randomIndex])
         // filteredWords.splice(randomIndex, 1)
      }

      console.log('randomWords: ', randomWords)

      // const shuffledWords = filteredWords.sort(
      //    () => Math.random() - 0.5
      // )

      // for (let i = 0; i < userNumber; i++) {
      //    randomWords.push(shuffledWords[i])
      // }

      setSelectedWords(randomWords)
      setTempFilteredWords(randomWords)
      console.log('tempFilteredWords: ', tempFilteredWords)
   }

   // useEffect(() => {
   //    const totalNoWords = filteredWords.length
   //    // const initialNumber = parseInt(
   //    //    totalNoWords >= 12 ? 12 : totalNoWords
   //    // )

   //    // selectRandomWords()
   // }, [filteredWords])

   useEffect(() => {
      console.log(
         'filteredWords.length in RANDOM: ',
         filteredWords.length
      )
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
               dots={true}
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
                  console.log('VALUE: ', value)
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
         {/* <button
            onClick={() => {
               console.log('filteredWORDS: ', filteredWords)
               console.log(
                  'tempFilteredWords: ',
                  tempFilteredWords
               )
            }}
         ></button> */}
         {/* {selectedWords !== filteredWords && (
            <button>CONFIRM</button>
         )} */}
         {/* <h2>Selected Words:</h2> */}
         {/* <ul>
            {selectedWords.map((word, index) => (
               <li key={index}>{word}</li>
            ))}
         </ul> */}
      </div>
   )
}

export default RandomWordSelector
