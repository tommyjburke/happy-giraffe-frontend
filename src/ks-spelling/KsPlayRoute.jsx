import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { useLocation } from 'react-router-dom'
import PlaySpellingGame from '../components/PlaySpellingGame'
import { useEffect, useState } from 'react'
import { scrambleWord } from '../jsFunctions/jsFunctions'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet-async'

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}

// function shuffleWord(word) {
//    const array = word.split('')
//    for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1))
//       ;[array[i], array[j]] = [array[j], array[i]]
//    }
//    return array.join('')
// }

// function createWordObjects(words) {
//    const shuffledArray = shuffleArray(words)
//    return shuffledArray.map((word) => ({
//       originalWord: word,
//       shuffledWord: shuffleWord(word),
//       userInput: '',
//    }))
// }

function useQuery() {
   // console.log('query', useLocation().search)
   return new URLSearchParams(useLocation().search)
}

export default function KsPlayRoute() {
   const [gameWords, setGameWords] = useState([])
   const [isProcessing, setIsProcessing] = useState(false)

   const query = useQuery()
   // console.log('query', query)

   const customTitle = query.get('customTitle')
   const timerSeconds = query.get('timerSeconds')
   const useTimer = query.get('useTimer') === 'true'

   // console.log('KS BUILD useTimer: ', useTimer)
   const encodedWordArray = query.get('encodedWordArray')

   const tempWordArray = JSON.parse(atob(encodedWordArray))
   const wordArray = shuffleArray(tempWordArray)
   // console.log('wordArray', wordArray)
   const description = query.get('description')
   const lessonName = query.get('lessonName')

   const buildGameWordObjects = async () => {
      // console.log('BUILDING GAME OBJECTS COMMENCING...')
      setIsProcessing(true)
      try {
         const newGameWords = await Promise.all(
            wordArray.map(async (word, index) => {
               const apiResponse = await verifyHumanSpeech(word)
               return {
                  spelling: word,
                  scrambled: scrambleWord(word),
                  index,
                  userGuess: '',
                  hasHumanVoice: apiResponse.hasHumanVoice,
                  verdict: '',
                  showButton: true,
                  synonyms: apiResponse.synonyms,
                  voiceUrl: apiResponse.audioLink,
               }
            })
         )
         // console.log('new KS game objs', newGameWords)
         setGameWords(newGameWords)
      } catch (error) {
         console.error(
            'Error building game word objects:',
            error
         )
      }
      setIsProcessing(false)

      // console.log('BUILDING GAME OBJECTS COMPLETE!')
   }

   useEffect(() => {
      buildGameWordObjects()
   }, [])

   return (
      <div className='mainContainer hero'>
         <Helmet>
            <title>
               Happy Giraffe - {customTitle}: {lessonName} -
               KeyStage Spelling Game 🦒
            </title>
            <meta
               name='description'
               content='Happy Giraffe - KeyStage Spelling Game'
            />
            {/* <link rel='canonical' href='/' /> */}
         </Helmet>
         <Spin spinning={isProcessing} size='large' fullscreen />
         <h1>
            <span className='greenFont'>{lessonName}</span>{' '}
            KeyStage Spelling
         </h1>
         <div
            className='africanFont'
            style={{
               backgroundColor: 'var(--myOrange)',
               color: 'green',
               width: '100%',
               textAlign: 'center',
            }}
         >
            <h3>
               <span className='mathsDetailsHeaderSpan'>
                  {customTitle}
               </span>
               <span className='timerHeaderSpan'>
                  {' '}
                  Timer:{' '}
                  {useTimer ? `${timerSeconds} seconds` : 'off'}
               </span>
            </h3>
            <p>
               <span className='descriptionHeaderSpan'>
                  {description}
               </span>
               <span className='numQuestionsHeaderSpan'>
                  {gameWords.length}{' '}
                  {gameWords.length > 1 ? 'words' : 'word'}
               </span>
            </p>
         </div>

         <div>
            <PlaySpellingGame
               words={gameWords}
               setWords={setGameWords}
               buildGameWordObjects={buildGameWordObjects}
               duration={timerSeconds}
               useTimer={useTimer}
            />
         </div>
      </div>
   )
}
