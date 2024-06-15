import { Slider, Switch } from 'antd'
// import RandomWordSelector from './RandomWordSelector'
// import WordFilterLength from './LettersFilterLength'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function convertSecondsToMinutes(seconds) {
   const minutes = Math.floor(seconds / 60)
   const remainingSeconds = seconds % 60
   return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
   }${remainingSeconds}`
}

export default function KsSpellingConfigForm({
   children,
   formData,
   setFormData,
   lesson,
   wordArray,
   setWordArray,
   filteredWords,
   setFilteredWords,
   tempFilteredWords,
   setTempFilteredWords,
   wordLengthConfirmed,
   setWordLengthConfirmed,
}) {
   const navigate = useNavigate()
   // console.log('LESSON TO FORM: ', lesson)
   const currentDate = new Date()
   let todaysDate = currentDate
      .toLocaleDateString('zh-UK')
      .toString()

   const [useTimer, setUseTimer] = useState(false)
   const [timerSeconds, setTimerSeconds] = useState(60)
   const [customTitle, setCustomTitle] = useState(todaysDate)
   const [newUri, setNewUri] = useState('')

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setFormData({
         ...formData,
         [name]: type === 'checkbox' ? checked : value,
      })
   }

   const handleTitleChange = (e) => {
      setCustomTitle(e.target.value)
   }

   const compileData = (e) => {
      // e.preventDefault()
      console.log('SUBMITTED')
      const gameDataObjects = {
         timerSeconds: timerSeconds,
         lessonName: lesson.name,
         description: lesson.description,
         customTitle: customTitle,
         newWords: filteredWords,
      }

      const encodedWordArray = btoa(
         JSON.stringify(filteredWords)
      )

      // console.log('gameDataObjects: ', gameDataObjects)

      const queryParams = new URLSearchParams({
         customTitle: customTitle,
         timerSeconds: timerSeconds,
         useTimer: useTimer,
         encodedWordArray: encodedWordArray,
         description: lesson.description,
         lessonName: lesson.name,
      })

      // const uriString = encodeURIComponent(
      //    JSON.stringify(gameDataObjects)
      // )

      let uriString = queryParams.toString()

      setNewUri(uriString)

      console.log('uriString: ', uriString)

      // const localHost = 'http://localhost:3000'

      // setQrCode(localHost + '/ks/?' + uriString)
      // setHasQrCode(true)

      navigate(`ks/?${queryParams.toString()}`)
      // navigate(`/?${queryParams.toString()}`)
   }

   // useEffect(() => {
   //    setHasQrCode(false)
   // })

   const handleTimerSwitch = (checked) => {
      console.log('checked: ', checked)
      setUseTimer(checked)
      console.log('useTimer: ', useTimer)
   }

   return (
      <div>
         <div
            // onSubmit={compileData}
            style={{
               padding: '0.3rem',
               // display: 'block',
               flexDirection: '',
               alignContent: '',
               fontFamily: 'Permanent Marker',
               fontSize: '1.0rem',
               // width: '35rem',
               // margin: '0 0 1rem 0',
            }}
         >
            <fieldset>
               <legend>KS Console</legend>

               <div className='configBox'>
                  <label>
                     Lesson:
                     <input
                        type='text'
                        name='Lesson'
                        value={lesson?.name}
                        onChange={handleChange}
                        disabled={true}
                     />
                  </label>
               </div>

               <div className='configBox'>
                  <label>
                     Custom Title:{' '}
                     <input
                        type='text'
                        name='customTitle'
                        value={customTitle}
                        onChange={handleTitleChange}
                        style={{
                           // fontColor: 'var(--myBrown)',
                           fontSize: '1rem',
                           fontColor: 'red !important',
                        }}
                     />
                  </label>
               </div>

               <div className='configBox'>
                  <Switch
                     checkedChildren='on'
                     unCheckedChildren='off'
                     onChange={handleTimerSwitch}
                  />
                  {useTimer ? 'Timer On' : 'Timer Off'}
                  <label>Timer (seconds): </label>
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
                           margin: '10px 1.2rem 10px 1.2rem',
                        }}
                        step={30}
                        min={30}
                        max={360}
                        // value={[lowerValue, upperValue]}
                        trackStyle={{
                           backgroundColor: 'lightgreen',
                        }}
                        defaultValue={timerSeconds}
                        // railStyle={{ backgroundColor: 'grey' }}
                        onChange={(value) => {
                           console.log('VALUE: ', value)
                           setTimerSeconds(value)
                        }}
                     />
                     {convertSecondsToMinutes(timerSeconds)}
                  </div>
               </div>
               <div>{children}</div>
               <div style={{ marginBottom: '1rem' }}>
                  <span
                     style={{
                        backgroundColor: 'yellow',
                        padding: '0 1rem 0 1rem',
                        border: 'orange 1px',
                        borderRadius: '1rem',
                        color: 'red',
                        float: 'right',
                        fontSize: '1rem',
                     }}
                  >
                     {filteredWords.length} words
                  </span>
               </div>
               <br />
               <div>
                  <button
                     className='cancelBtn'
                     style={
                        {
                           // position: 'relative',
                           // bottom: '5px',
                           // float: 'right',
                        }
                     }
                     onClick={() => {
                        // setUseTimerTimer(false)
                        setFilteredWords(wordArray)
                        setTempFilteredWords(wordArray)
                        setWordLengthConfirmed(false)
                     }}
                  >
                     Re-Load Words
                  </button>

                  <button
                     onClick={() => {
                        setFilteredWords(tempFilteredWords)
                        compileData()
                     }}
                     style={{
                        float: 'right',
                        backgroundColor: 'green',
                     }}
                  >
                     Save
                  </button>
               </div>
               {/* {newUri && (
               <Link to={`/ks-test/${newUri}`}>
                  Go to Your Component
               </Link>
            )} */}
            </fieldset>
         </div>
      </div>
   )
}
