import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlaySpellingGame from '../components/PlaySpellingGame'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { Spin } from 'antd'
import { Helmet } from 'react-helmet-async'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

export default function DiyPlayRoute() {
   const [gameWords, setGameWords] = useState([])
   const [isProcessing, setIsProcessing] = useState(false)
   const query = useQuery()
   const title = query.get('title')
   const encodedWordObjects = query.get('wordObjects')
   const useTimer = query.get('useTimer') === 'true'
   const duration = parseInt(query.get('duration'), 10)
   const wordObjects = JSON.parse(atob(encodedWordObjects))
   console.log('wordObjects', wordObjects)

   const buildGameWordObjects = async () => {
      // console.log('BUILDING GAME OBJECTS COMMENCING...')
      setIsProcessing(true)

      try {
         const newGameWords = await Promise.all(
            wordObjects.map(async (obj, index) => {
               const apiResponse = await verifyHumanSpeech(
                  obj.spelling
               )
               return {
                  spelling: obj.spelling,
                  scrambled: obj.scrambled,
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
         // console.log('new game objs', newGameWords)
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
               Happy Giraffe - {title} (Custom Spelling Game)
            </title>
            <meta
               name='description'
               // content='Happy Giraffe - Customised Spelling Game'
               content={title}
            />
            {/* <link rel='canonical' href='/' /> */}
         </Helmet>
         <Spin spinning={isProcessing} size='large' fullscreen />
         <h1>{title ? title : 'DIY Spelling Game'}</h1>
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
               <span className='numQuestionsHeaderSpan'>
                  {gameWords.length}{' '}
                  {gameWords.length > 1 ? 'words' : 'word'}
               </span>
               <span className='timerHeaderSpan'>
                  {' '}
                  Timer:{' '}
                  {useTimer ? `${duration} seconds` : 'off'}
               </span>
            </h3>
         </div>

         <PlaySpellingGame
            useTimer={useTimer}
            duration={duration}
            words={gameWords}
            setWords={setGameWords}
            buildGameWordObjects={buildGameWordObjects}
         />
      </div>
   )
}
