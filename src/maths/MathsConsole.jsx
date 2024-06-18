import React, { useState, useEffect } from 'react'
import './MathsStyles.css'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
   Slider,
   Switch,
   Space,
   Col,
   InputNumber,
   Row,
   Checkbox,
} from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import useSound from 'use-sound'
import switchSound from '../media/switch.mp3'
import magicSound from '../media/magic.mp3'
import blipOn from '../media/blipOn.mp3'
import blipOff from '../media/blipOff.mp3'

const replaceSymbols = (expression) => {
   const symbolMap = {
      '/': '➗',
      '*': '✖️',
      '+': '➕',
      '-': '➖',
   }

   return expression.replace(
      /\/|\*|\+|-/g,
      (match) => symbolMap[match]
   )
}

function convertSecondsToMinutes(seconds) {
   const minutes = Math.floor(seconds / 60)
   const remainingSeconds = seconds % 60
   return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
   }${remainingSeconds}`
}

export default function MathsConsole() {
   const [title, setTitle] = useState('My Maths Game')
   const [aValues, setAValues] = useState([1, 12])
   const [bValues, setBValues] = useState([1, 12])
   const [numQuestions, setNumQuestions] = useState(10)
   const [hiddenBox, setHiddenBox] = useState(['c'])
   const [operators, setOperators] = useState(['*'])
   const [useTimer, setUseTimer] = useState(true)
   const [duration, setDuration] = useState(60)
   const [useMinus, setUseMinus] = useState(false)
   const navigate = useNavigate()

   const [playSwitch] = useSound(switchSound)
   const [playMagic] = useSound(magicSound)
   const [playBlipOn] = useSound(blipOn)
   const [playBlipOff] = useSound(blipOff)

   function handleAdditionSwitch(checked) {
      playSwitch()
      if (!checked) {
         setOperators(operators.filter((op) => op !== '+'))
      } else if (checked) {
         setOperators([...operators, '+'])
      }
   }

   function handleSubtractionSwitch(checked) {
      playSwitch()
      if (!checked) {
         setOperators(operators.filter((op) => op !== '-'))
      } else if (checked) {
         setOperators([...operators, '-'])
      }
   }
   function handleMultiplicationSwitch(checked) {
      playSwitch()
      if (!checked) {
         setOperators(operators.filter((op) => op !== '*'))
      } else if (checked) {
         setOperators([...operators, '*'])
      }
   }
   function handleDivisionSwitch(checked) {
      playSwitch()
      if (!checked) {
         setOperators(operators.filter((op) => op !== '/'))
      } else if (checked) {
         setOperators([...operators, '/'])
      }
   }

   const aCheckbox = (e) => {
      const checked = e.target.checked
      if (!checked) {
         setHiddenBox(hiddenBox.filter((box) => box !== 'a'))
         playBlipOff()
      } else if (checked) {
         setHiddenBox([...hiddenBox, 'a'])
         playBlipOn()
      }
   }
   const opCheckbox = (e) => {
      const checked = e.target.checked
      if (!checked) {
         setHiddenBox(hiddenBox.filter((box) => box !== 'op'))
      } else if (checked) {
         setHiddenBox([...hiddenBox, 'op'])
      }
   }
   const bCheckbox = (e) => {
      const checked = e.target.checked
      if (!checked) {
         setHiddenBox(hiddenBox.filter((box) => box !== 'b'))
         playBlipOff()
      } else if (checked) {
         setHiddenBox([...hiddenBox, 'b'])
         playBlipOn()
      }
   }

   const cCheckbox = (e) => {
      const checked = e.target.checked
      if (!checked) {
         setHiddenBox(hiddenBox.filter((box) => box !== 'c'))
         playBlipOff()
      } else if (checked) {
         setHiddenBox([...hiddenBox, 'c'])
         playBlipOn()
      }
   }

   const randomCheckbox = (e) => {
      const checked = e.target.checked
      if (!checked) {
         setHiddenBox(['c'])
         playBlipOff()
      } else if (checked) {
         setHiddenBox(['a', 'b', 'c'])
         playBlipOn()
      }
   }

   const handleMinusSwitch = (checked) => {
      playSwitch()
      setUseMinus(checked)
   }

   const compileMathsParams = () => {
      // let mathsData = {
      //    title: title,
      //    numQuestions: numQuestions,
      //    aValues: aValues,
      //    bValues: bValues,
      //    operators: operators,
      // }
      // console.log('mathsData: ', mathsData)
      const queryParams = new URLSearchParams({
         useTimer: useTimer,
         useMinus: useMinus,
         duration: duration,
         title: title,
         numQuestions: numQuestions,
         aValues: aValues,
         bValues: bValues,
         operators: operators,
         hiddenBox: hiddenBox,
      })

      // let uriString = queryParams.toString()

      navigate(`./data?${queryParams.toString()}`)
   }

   // useEffect(() => {
   //    console.log('operators state updated:', operators)
   // }, [operators])

   const handleTimerSwitch = (checked) => {
      playSwitch()
      setUseTimer(checked)
   }

   const handleDurationChange = (value) => {
      setDuration(value)
   }

   return (
      <>
         {/* {contextHolder} */}
         <Helmet>
            <title>
               Happy Giraffe - Maths Console - Fun Maths and
               Spelling Games for Kids/Children 🦒
            </title>
            <meta
               name='description'
               content='Maths Console. Create a quick and fun maths quiz for kids in seconds.'
            />
            <link rel='canonical' href='/maths' />
         </Helmet>
         {/* <Spin spinning={isProcessing} size='large' fullscreen /> */}
         <div className='mainContainer hero'>
            <h1>Maths Console</h1>
            <h4
               className='africanFont'
               style={{ color: 'green' }}
            >
               Create Maths Game
            </h4>

            <div
               className='main5ContentContainer'
               style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',

                  alignItems: 'center',
                  alignContent: 'center',
                  padding: '0.1rem',
                  fontFamily: 'Permanent Marker',
                  fontSize: '1.0rem',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '800px',
               }}
            >
               <fieldset>
                  <legend> Maths Config </legend>
                  <div className='configBox'>
                     <label>Custom Title: </label>
                     <input
                        type='text'
                        value={title}
                        onChange={(e) =>
                           setTitle(e.target.value)
                        }
                     />
                  </div>
                  <div className='configBox'>
                     <label> No. of questions:</label>
                     <Row>
                        <Col span={18}>
                           <Slider
                              min={1}
                              max={50}
                              onChange={(value) => {
                                 setNumQuestions(value)
                                 // console.log(numQuestions)
                              }}
                              value={numQuestions}
                           />
                        </Col>
                        <Col span={1}>
                           <InputNumber
                              controlWidth='20'
                              handleWidth={1}
                              readOnly={true}
                              min={1}
                              max={50}
                              style={{
                                 margin: '0 16px',
                              }}
                              value={numQuestions}
                              onChange={(value) =>
                                 setNumQuestions(value)
                              }
                           />
                        </Col>
                     </Row>
                  </div>
                  <div className='configBox'>
                     <label>Timer: </label>
                     <Switch
                        checkedChildren='on'
                        unCheckedChildren='off'
                        onChange={handleTimerSwitch}
                        defaultValue={useTimer}
                     />
                     {/* {useTimer ? 'Timer On' : 'Timer Off'} */}

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
                              backgroundColor: 'brown',
                           }}
                           defaultValue={duration}
                           // railStyle={{ backgroundColor: 'grey' }}
                           onChange={(value) => {
                              handleDurationChange(value)
                           }}
                        />
                        {convertSecondsToMinutes(duration)}
                     </div>
                  </div>
                  <div className='configBox'>
                     <Space>
                        <label>Hidden Answer Box:</label>
                        <span
                           colSpan='5'
                           style={{
                              textAlign: 'left',
                              verticalAlign: 'top',
                           }}
                        >
                           <Checkbox
                              checked={['a', 'b', 'c'].every(
                                 (el) => hiddenBox.includes(el)
                              )}
                              onChange={randomCheckbox}
                           />
                           <span
                              style={{
                                 fontSize: '0.9rem',
                              }}
                           >
                              Random
                           </span>
                        </span>
                     </Space>
                     <table
                        style={{
                           width: '100%',
                           padding: '0px',
                           background: 'none',
                           color: 'var(--myBrown)',
                        }}
                     >
                        <tbody>
                           <tr
                              style={{
                                 textAlign: 'left',
                                 padding: '0px',
                              }}
                           ></tr>
                           <tr
                              style={{
                                 padding: '10px',
                                 margin: '10px',
                              }}
                           >
                              <td>
                                 <Checkbox
                                    checked={hiddenBox.includes(
                                       'a'
                                    )}
                                    onChange={aCheckbox}
                                 />
                              </td>
                              <td>
                                 {/* <Checkbox
                                    checked={hiddenBox.includes('op')}
                                    onChange={opCheckbox}
                                 /> */}
                              </td>
                              <td>
                                 <Checkbox
                                    checked={hiddenBox.includes(
                                       'b'
                                    )}
                                    onChange={bCheckbox}
                                 />
                              </td>
                              <td></td>
                              <td>
                                 <Checkbox
                                    checked={hiddenBox.includes(
                                       'c'
                                    )}
                                    onChange={cCheckbox}
                                 />
                              </td>
                           </tr>
                           <tr
                              style={{
                                 padding: '10px',
                                 margin: '10px',
                              }}
                           >
                              <td
                                 style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    margin: '0px',
                                 }}
                              >
                                 {hiddenBox.includes('a')
                                    ? '❓'
                                    : aValues[1]}
                              </td>
                              <td
                                 style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    margin: '0px',
                                 }}
                              >
                                 {hiddenBox.includes('op')
                                    ? '❓'
                                    : '+'}
                              </td>
                              <td
                                 style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    margin: '0px',
                                 }}
                              >
                                 {hiddenBox.includes('b')
                                    ? '❓'
                                    : bValues[1]}
                              </td>
                              <td
                                 style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    margin: '0px',
                                 }}
                              >
                                 =
                              </td>
                              <td
                                 style={{
                                    textAlign: 'center',
                                    padding: '5px',
                                    margin: '0px',
                                 }}
                              >
                                 {hiddenBox.includes('c')
                                    ? '❓'
                                    : aValues[1] + bValues[1]}
                              </td>
                           </tr>
                        </tbody>
                        {/* <tr>
                           <td colSpan={5}>{hiddenBox}</td>
                        </tr>
                        <tr>
                           <td> </td>
                        </tr> */}
                     </table>
                  </div>
                  <div className='configBox'>
                     <label>Value Range:</label>
                     <div
                        style={{
                           display: 'flex',
                           paddingBottom: '20px',

                           // padding: '30px',
                        }}
                     >
                        <div
                           className=''
                           style={{
                              height: '120px',
                              width: '60px',
                           }}
                        >
                           <Slider
                              autofocus={true}
                              vertical
                              dots={true}
                              tooltip={{
                                 open: true,
                              }}
                              range
                              step={1}
                              min={1}
                              max={24}
                              defaultValue={[1, 12]}
                              onChange={(values) => {
                                 setAValues(values)
                                 // console.log(values)
                              }}
                           />
                        </div>
                        <div
                           style={{
                              backgroundColor: 'transparent',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              flex: '1 1 100%',
                           }}
                        >
                           {/* <div>
                              {operators.map((op) => (
                                 <span>{op} ,</span>
                              ))}
                           </div> */}
                           <br />
                           <Space>
                              <Switch
                                 checkedChildren={
                                    <CheckOutlined />
                                 }
                                 unCheckedChildren={
                                    <CloseOutlined />
                                 }
                                 defaultChecked={operators.includes(
                                    '+'
                                 )}
                                 // value={'+'}
                                 onChange={handleAdditionSwitch}
                                 // onClick={handlePlus(checked)}
                              />
                              ➕
                           </Space>

                           <Space>
                              <Switch
                                 checkedChildren={
                                    <CheckOutlined />
                                 }
                                 unCheckedChildren={
                                    <CloseOutlined />
                                 }
                                 defaultChecked={operators.includes(
                                    '-'
                                 )}
                                 onChange={
                                    handleSubtractionSwitch
                                 }
                              />
                              ➖
                           </Space>

                           <Space>
                              <Switch
                                 checkedChildren={
                                    <CheckOutlined />
                                 }
                                 unCheckedChildren={
                                    <CloseOutlined />
                                 }
                                 defaultChecked={operators.includes(
                                    '*'
                                 )}
                                 onChange={
                                    handleMultiplicationSwitch
                                 }
                              />
                              ✖️
                           </Space>

                           <Space>
                              <Switch
                                 checkedChildren={
                                    <CheckOutlined />
                                 }
                                 unCheckedChildren={
                                    <CloseOutlined />
                                 }
                                 defaultChecked={operators.includes(
                                    '/'
                                 )}
                                 onChange={handleDivisionSwitch}
                              />
                              ➗
                           </Space>
                        </div>
                        <div
                           style={{
                              height: '120px',
                              width: '60px',
                           }}
                        >
                           <Slider
                              autofocus={true}
                              vertical
                              dots={true}
                              tooltip={{
                                 open: true,
                              }}
                              range
                              step={1}
                              min={1}
                              max={24}
                              defaultValue={[1, 12]}
                              onChange={(values) => {
                                 setBValues(values)
                                 // console.log(values)
                              }}
                           />
                        </div>
                     </div>
                     <div style={{ marginTop: '5px' }}>
                        <span
                           style={{
                              color: 'green',
                              backgroundColor: 'var(--myWhite)',
                              margin: '4px',
                              padding: '0 3px 0 7px',
                              borderRadius: '5px',
                           }}
                        >
                           {aValues[0]} to {aValues[1]}
                        </span>
                        {operators.length > 0 ? (
                           <span
                              style={{
                                 border: '1px solid green',
                                 borderRadius: '10px',
                                 padding: '1px 1px 1px 5px',
                                 marginRight: '2px',
                                 backgroundColor:
                                    'var(--myWhite)',
                                 fontSize: '12px',
                              }}
                           >
                              {operators.map((op) => (
                                 <span
                                    key={op}
                                    style={{ color: 'blue' }}
                                 >
                                    {replaceSymbols(op)}{' '}
                                 </span>
                              ))}
                           </span>
                        ) : (
                           <span style={{ fontSize: '12px' }}>
                              ❓
                           </span>
                        )}{' '}
                        <span
                           style={{
                              color: 'green',
                              backgroundColor: 'var(--myWhite)',
                              margin: '4px',
                              padding: '0 3px 0 3px',
                              borderRadius: '5px',
                           }}
                        >
                           {bValues[0]} to {bValues[1]}
                        </span>
                     </div>
                  </div>
                  {operators.includes('-') && (
                     <div className='configBox'>
                        <label> Allow minus numbers:</label>
                        <Switch
                           checkedChildren={<CheckOutlined />}
                           unCheckedChildren={<CloseOutlined />}
                           defaultChecked={useMinus}
                           onChange={handleMinusSwitch}
                        />
                     </div>
                  )}
                  <div>
                     <button
                        style={{ float: 'right' }}
                        onClick={() => {
                           playMagic()
                           compileMathsParams()
                        }}
                     >
                        Save
                     </button>
                  </div>
               </fieldset>

               <br />
               <br />
               <br />
               <br />
               <br />
               <br />
            </div>
         </div>
      </>
   )
}
