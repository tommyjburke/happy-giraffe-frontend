import Form from './Form'
import { useEffect, useState } from 'react'
import './SpellingDIY.css'
import DiySpellingConfigForm from './DiySpellingConfigForm'
import { Spin, message } from 'antd'
import { Helmet } from 'react-helmet-async'

export default function DiySpellingConsole() {
   const [words, setWords] = useState([])
   const [speechSpeed, setSpeechSpeed] = useState(0.7)
   const [messageApi, contextHolder] = message.useMessage()
   const [isProcessing, setIsProcessing] = useState(false)

   const reScrambleWord = (wordObj) => {
      // console.log('FIRST PART', wordObj)
      // console.log('WORDOBJ TO BE SCRAMBLED: ', wordObj)
      let word = wordObj.spelling
      const charArray = word.split('')

      for (let i = charArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[charArray[i], charArray[j]] = [
            charArray[j],
            charArray[i],
         ]
      }
      const scrambledWord = charArray.join('')

      const updatedWord = {
         ...wordObj,
         scrambled: scrambledWord,
      }
      // console.log('updated word obj:', updatedWord)
      setWords((prevwordObjs) => {
         const updatedwords = prevwordObjs.map((prevWordObj) =>
            prevWordObj === wordObj ? updatedWord : prevWordObj
         )
         // console.log('UPDATED WORDS', words)
         return updatedwords
      })
      // console.log('UPDATED WORDS', words)
   }

   // useEffect(() => {
   //    // console.log('UPDATED WORDS', words)
   // }, [words])

   useEffect(() => {
      document.title = 'Happy Giraffe: DIY Spelling 🦒'
   }, [])

   function handleAddword(word) {
      // console.log(word)
      setWords((words) => [...words, word])
   }

   function handleDeleteWord(id) {
      setWords((words) => words.filter((word) => word.id !== id))
   }

   function handleToggleWord(id) {
      setWords((words) =>
         words.map((word) =>
            word.id === id
               ? { ...word, packed: !word.packed }
               : word
         )
      )
   }

   function handleClearList() {
      const confirmed = window.confirm(
         'Are you sure you want to delete all words?'
      )

      if (confirmed) setWords([])
   }

   const duplicatesContent = (words) => {
      return (
         <div
            style={{
               color: 'var(--myBrown',
               fontFamily: 'Indie Flower',
               fontSize: '1.0rem',
            }}
         >
            <p>Duplicates (not added:):</p>
            <br />
            <h2 className='gameFont'> {words}</h2>
         </div>
      )
   }

   const duplicatesError = (value) => {
      // console.log('DUP ERROR VALUE', value)
      messageApi.open({
         type: 'warning',
         content: duplicatesContent(value),
         duration: 8,
      })
   }

   const longWordsError = () => {
      // console.log('DUP ERROR VALUE', value)
      messageApi.open({
         type: 'warning',
         content:
            'Excessively long words (>12) have been discarded. This is for kids!',
         duration: 4,
         style: {
            color: 'red',
            background: 'transparent',
            backgroundColor: 'transparent',
         },
      })
   }

   return (
      <>
         {contextHolder}
         <Helmet>
            <title>
               Happy Giraffe - DIY Spelling Console - Fun
               Spelling Games for Kids/Children 🦒
            </title>
            <meta
               name='description'
               content='KS Spelling Console. Select key stage and lesson. Filter words by length. Select random words. Interactive Rote learning, spelling and maths made fun for kids.'
            />
            <link rel='canonical' href='/diy-spelling' />
         </Helmet>
         <Spin spinning={isProcessing} size='large' fullscreen />
         <div className='mainContainer hero'>
            <h1>DIY Spelling Console</h1>
            <Form
               handleAddWord={handleAddword}
               setWords={setWords}
               words={words}
               duplicatesError={duplicatesError}
               longWordsError={longWordsError}
               setIsProcessing={setIsProcessing}
            />

            {/* <WordList
                  words={words}
                  onDeleteWord={handleDeleteWord}
                  // onToggleWord={handleToggleWord}
                  onClearList={handleClearList}
                  reScrambleWord={reScrambleWord}
                  speechSpeed={speechSpeed}
                  setSpeechSpeed={setSpeechSpeed}
               /> */}

            <div className='main5ContentContainer'>
               <DiySpellingConfigForm
                  words={words}
                  setWords={setWords}
                  speechSpeed={speechSpeed}
                  setSpeechSpeed={setSpeechSpeed}
                  onDeleteWord={handleDeleteWord}
                  reScrambleWord={reScrambleWord}
                  handleAddWord={handleAddword}
                  duplicatesError={duplicatesError}
                  longWordsError={longWordsError}
                  setIsProcessing={setIsProcessing}
               />
            </div>
         </div>
      </>
   )
}
