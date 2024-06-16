import { FileUploader } from 'react-drag-drop-files'
import { scrambleWord } from '../jsFunctions/jsFunctions.js'
import { message } from 'antd'
import { verifyHumanSpeech } from '../jsFunctions/humanSpeech.js'

const fileTypes = ['TXT', 'CSV']
// const myStyle = { backgroundColor: 'black' }

function DragDrop({
   children,
   handleAddWord,
   setIsProcessing,
   longWordsError,
   duplicatesError,
   words,
}) {
   // const [file, setFile] = useState(null)
   // const [words, setWords] = useState([])

   // function cleanWords(textContent) {
   //    return textContent.map((word) =>
   //       word.replace(/[^a-z]/g, '')
   //    )
   // }

   const [messageApi, contextHolder] = message.useMessage()
   const invalidFileMessage = () => {
      messageApi.open({
         type: 'none',
         content: '⛔️ Only txt or csv files',
         className: 'custom-class',
         style: {
            marginTop: '10vh',
            fontSize: '2rem',
            fontFamily: 'Schoolbell',
         },
      })
   }

   // const invalidSizeMessage = () => {
   //    messageApi.open({
   //       type: 'none',
   //       content: '⛔️ File size too large',
   //       className: 'custom-class',
   //       style: {
   //          marginTop: '10vh',
   //          fontSize: '2rem',
   //          fontFamily: 'Schoolbell',
   //       },
   //    })
   // }

   const handleChange = (file) => {
      //   setFile(file)
      console.log('FILE: ', file)
      // console.log('CURRENT WORDS ARRAY: ', words)
      const reader = new FileReader()

      reader.onload = async () => {
         const fileContent = reader.result
         //  let userInput = fileContent.split(',')
         setIsProcessing(true)
         const cleanedWords = Array.from(
            new Set(
               fileContent
                  .replace(/\//g, ' ') // Replace / with space
                  .replace(/[()]/g, '') // Remove ( and )
                  .split(/\r?\n/) // Split by line breaks
                  .flatMap((line) => line.split(' ')) // Split each line by spaces
                  .map(
                     (word) =>
                        word
                           .toLowerCase()
                           .trim()
                           .replace(/[^a-z ]/g, '') // Remove non-alphabetic characters except spaces
                  )
                  .filter((word) => word !== '')
            )
         )

         const spellingArray = cleanedWords

         if (!spellingArray) return

         if (spellingArray.length > 40) {
            messageApi.open({
               type: 'none',
               content:
                  '⛔️  Only the first 40 words will seek a human voice!',
               className: 'custom-class',
               style: {
                  marginTop: '10vh',
                  fontSize: '1.2rem',
                  fontFamily: 'Schoolbell',
               },
            })
         }

         let duplicatesFound = []
         let count = 0
         for (let i = 0; i < spellingArray.length; i++) {
            if (spellingArray[i].length > 12) {
               // console.log('TOO LONG: ', spellingArray[i])
               longWordsError()
               continue
            }

            const doesWordExist = words.some(
               (word) =>
                  word.spelling.toLowerCase() ===
                  spellingArray[i].toLowerCase()
            )

            if (doesWordExist) {
               // console.log('DUPLICATE: ', spellingArray[i])
               duplicatesFound.push(spellingArray[i])
               // duplicatesError()
               continue
            }
            count++
            // console.log('COUNT: ', count)

            let synonyms
            let hasHumanVoice

            // console.log('i: ', i, 'word: ', spellingArray[i])
            if (count < 40) {
               const {
                  hasHumanVoice: humanVoiceCheck,
                  synonyms: synonymsCheck,
               } = await verifyHumanSpeech(spellingArray[i])
               hasHumanVoice = humanVoiceCheck
               synonyms = synonymsCheck
            } else {
               hasHumanVoice = false
               synonyms = []
            }

            // console.log('icon: ', icon)
            // console.log('hasHumanVoice: ', hasHumanVoice)
            // console.log('OBJECT SYNONYMS: ', synonyms)

            const scrambled = scrambleWord(spellingArray[i])

            const newWord = {
               synonyms,
               hasHumanVoice,
               // icon,
               id: `${Date.now()}+${i}`,
               spelling: spellingArray[i],
               scrambled,
               // quantity,
               usersGuess: '',
               // packed: false,
               verdict: null,
               showButton: true,
            }

            // handleAddWord(newWord)
            // const isWordExists = words.some(
            //    (word) =>
            //       word.spelling.toLowerCase() ===
            //       newWord.spelling.toLowerCase()
            // )

            // if (!isWordExists) {
            //    handleAddWord(newWord)
            // } else {
            //    duplicatesFound.push(newWord.spelling)
            //    // console.log(`${newWord.spelling} is a duplicate`)
            // }

            handleAddWord(newWord)
         }

         let allDuplicates = duplicatesFound.join(', ')
         // setDuplicates(allDuplicates)
         if (allDuplicates) {
            // console.log('ALL DUPLICATES:', duplicates)
            // console.log('STATE duplicates:', duplicates)
            duplicatesError(allDuplicates)
         }

         duplicatesFound = []
         setIsProcessing(false)
      }

      reader.readAsText(file)
   }

   // const smallFont = { fontSize: '0.6rem' }

   return (
      <>
         {contextHolder}
         <span
            style={{
               padding: '0px',
               margin: '0',
               backgroundColor: 'gray',
            }}
         >
            <FileUploader
               handleChange={handleChange}
               multiple={false}
               name='usersFile'
               types={fileTypes}
               classes='dropBox !important'
               minSize={0}
               maxSize={1}
               //  dropMessageStyle={myStyle}
               hoverTitle='Drop here'
               label='ADD file'
               onSizeError={() => invalidFileMessage()}
               onTypeError={
                  () => invalidFileMessage()
                  // alert(
                  //    'Invalid file type. CSV or Text files only.'
                  // )
               }
            >
               {/* <p>Drag txt/csv file here</p> */}
               {children}
            </FileUploader>
         </span>
      </>
   )
}

export default DragDrop
