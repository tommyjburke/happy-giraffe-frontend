import { Slider, Space, Switch, Popconfirm, Popover } from 'antd'
// import RandomWordSelector from './RandomWordSelector'
// import WordFilterLength from './LettersFilterLength'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WarningOutlined } from '@ant-design/icons'
import useSound from 'use-sound'
import switchSound from '../media/switch.mp3'

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

   const currentDate = new Date()
   let todaysDate = currentDate
      .toLocaleDateString('zh-UK')
      .toString()

   const [useTimer, setUseTimer] = useState(true)
   const [timerSeconds, setTimerSeconds] = useState(60)
   const [customTitle, setCustomTitle] = useState(
      `KS ${todaysDate}`
   )
   const [newUri, setNewUri] = useState('')

   const [playSwitch] = useSound(switchSound)

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

      // const localHost = 'http://localhost:3000'

      // setQrCode(localHost + '/ks/?' + uriString)
      // setHasQrCode(true)

      navigate(`ks/?${queryParams.toString()}`)
      // navigate(`/?${queryParams.toString()}`)
   }

   const saveButton = () => {
      setFilteredWords(tempFilteredWords)
      compileData()
   }

   const tooManyWords = (
      <span
         style={{
            fontFamily: 'Roboto',
            fontSize: '1.0rem',
         }}
      >
         Too many words (over 40) may provide unreliable
         retrieval of (human) voice samples
      </span>
   )

   // useEffect(() => {
   //    setHasQrCode(false)
   // })

   const handleTimerSwitch = (checked) => {
      playSwitch()
      setUseTimer(checked)
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
               fontFamily: 'Roboto',
               fontWeight: '400',
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
                        style={{
                           fontFamily: 'Roboto',
                           color: 'brown',
                           fontSize: '1rem',
                        }}
                     />
                  </label>
               </div>

               <div className='configBox'>
                  <label>
                     Your Title:{' '}
                     <input
                        type='text'
                        name='customTitle'
                        value={customTitle}
                        onChange={handleTitleChange}
                        style={{
                           // fontColor: 'var(--myBrown)',
                           fontSize: '1rem',
                           fontFamily: 'Roboto',
                           color: 'var(--myBrown)',
                        }}
                     />
                  </label>
               </div>

               <div className='configBox'>
                  <Switch
                     defaultValue={useTimer}
                     checkedChildren='on'
                     unCheckedChildren='off'
                     onChange={handleTimerSwitch}
                  />
                  {/* {useTimer ? 'Timer On' : 'Timer Off'} */}
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
                        max={600}
                        // value={[lowerValue, upperValue]}
                        trackStyle={{
                           backgroundColor: 'lightgreen',
                        }}
                        defaultValue={timerSeconds}
                        // railStyle={{ backgroundColor: 'grey' }}
                        onChange={(value) => {
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
                  <Space>
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

                     {filteredWords.length > 40 ? (
                        <Popover content={tooManyWords}>
                           <Popconfirm
                              title='WARNING'
                              description={tooManyWords}
                              onConfirm={saveButton}
                              // onCancel={cancel}
                              okText='Continue'
                              cancelText='Back'
                           >
                              <button
                                 // onClick={() => {
                                 //    setFilteredWords(tempFilteredWords)
                                 //    compileData()
                                 // }}
                                 style={{
                                    float: 'right',
                                    backgroundColor: 'green',
                                 }}
                              >
                                 Build Game{' '}
                                 <span style={{ color: 'red' }}>
                                    <WarningOutlined />
                                 </span>
                              </button>
                           </Popconfirm>
                        </Popover>
                     ) : (
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
                           Build Game{' '}
                           <span style={{ color: 'red' }}></span>
                        </button>
                     )}
                     <span
                        style={{
                           float: 'right',
                           fontSize: '2rem',
                           color: 'red',
                        }}
                     ></span>
                  </Space>
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
