import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}

function shuffleWord(word) {
   const array = word.split('')
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array.join('')
}

function createWordObjects(words) {
   const shuffledArray = shuffleArray(words)
   return shuffledArray.map((word) => ({
      originalWord: word,
      shuffledWord: shuffleWord(word),
      userInput: '',
   }))
}

export default function KsTest() {
   const { data } = useParams()
   let gameData

   // const [newWords, setNewWords] = useState([])

   if (data) {
      try {
         // const decrypted = atob(data)
         const decodedData = decodeURIComponent(data)
         gameData = JSON.parse(decodedData)
      } catch (error) {
         console.error('Error decoding URI:', error)
      }
   }

   console.log('gameData', gameData)
   console.log('words', gameData.newWords)

   const newWords = gameData.newWords

   const wordObjects = createWordObjects(newWords)

   // function renderQuestions(newWords) {
   //    shuffleArray(newWords)
   //    return (
   //       <ol>
   //          {newWords.map((word, index) => (
   //             <li>
   //                {index + 1}.{word}
   //                <input />
   //                <button>CHECK</button>
   //             </li>
   //          ))}
   //       </ol>
   //    )
   // }

   // if (uri) {
   //    try {
   //       const decodedUri = decodeURIComponent(uri)
   //       gameData = JSON.parse(decodedUri)
   //    } catch (error) {
   //       console.error('Error decoding URI:', error)
   //    }
   // }

   console.log('gameData', gameData)

   return (
      <div>
         <h3>{gameData.lesson}</h3>
         <h5>{gameData.customTitle}</h5>
         <h6>{gameData.timerSeconds} seconds</h6>
         <div>KsTest</div>
         <h1>URI</h1>
         {/* <div>{uri}</div> */}
         <h1>STRING</h1>
         <div> {JSON.stringify(gameData)}</div>
         <br />
         <div>{gameData.customTitle}</div>
         <div>{gameData?.name}</div>
         <div>
            <ul>
               {wordObjects.map((wordObj, index) => (
                  <li key={index}>
                     Original: {wordObj.originalWord}, Shuffled:{' '}
                     {wordObj.shuffledWord}, User Input:{' '}
                     <input />
                     {wordObj.userInput}
                  </li>
               ))}
            </ul>
         </div>
         {/* <div>{renderQuestions(newWords)}</div> */}
         {/* <div>{JSON.stringify(newData)}</div> */}
         {/* <div>{JSON.stringify(decoded)}</div> */}
         {/* <div>{decoded}</div> */}
      </div>
   )
}
