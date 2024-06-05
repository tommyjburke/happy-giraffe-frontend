import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PlaySpellingGame from '../components/PlaySpellingGame'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech'
import { Spin } from 'antd'
// import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

function useQuery() {
   return new URLSearchParams(useLocation().search)
}

// const gameData = [
//    { scrambled: 'yhapp', spelling: 'happy' },
//    { scrambled: 'hello', spelling: 'hello' },
//    { scrambled: 'yunnf', spelling: 'funny' },
// ]

export default function DiyPlayRoute() {
   const [isLoading, setIsLoading] = useState(false)
   const [gameWords, setGameWords] = useState([])
   const [isProcessing, setIsProcessing] = useState(false)
   const query = useQuery()
   console.log('query', query)
   const title = query.get('title')
   console.log(title)
   const timerSeconds = parseInt(query.get('timerSeconds'), 10)

   const encodedWordObjects = query.get('wordObjects')
   const wordObjects = JSON.parse(atob(encodedWordObjects))
   const buildGameWordObjects = async () => {
      console.log('BUILDING GAME OBJECTS COMMENCING...')
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
               }
            })
         )
         console.log('new game objs', newGameWords)
         setGameWords(newGameWords)
      } catch (error) {
         console.error(
            'Error building game word objects:',
            error
         )
      }
      setIsProcessing(false)

      console.log('BUILDING GAME OBJECTS COMPLETE!')
   }

   useEffect(() => {
      buildGameWordObjects()
   }, [])

   return (
      <div className='mainContainer hero'>
         <Spin spinning={isProcessing} size='large' fullscreen />
         <h1>{title ? title : 'DIY Spelling Game'}</h1>

         <PlaySpellingGame
            words={gameWords}
            buildGameWordObjects={buildGameWordObjects}
         />
      </div>
   )
}
