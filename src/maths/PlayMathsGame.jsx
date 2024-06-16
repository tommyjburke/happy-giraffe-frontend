import correctSound3 from '../media/correct3.mp3'
import wrongSound from '../media/wrong.mp3'
import { Popover, message, QRCode } from 'antd'
import background5 from '../media/background5.png'
import ResultsModal from '../components/ResultsModal.jsx'
import Rewards from '../components/Rewards.jsx'
import { useState } from 'react'

export default function PlayMathsGame({ mathsObjects }) {
   const [gameData, setGameData] = useState(mathsObjects)
   const checkGuess = (event, rowIndex) => {
      const hiddenBoxValue = mathsObjects[rowIndex].hiddenBox
      mathsObjects[rowIndex].isDisabled = true
   }

   const handleUserInput = (event, rowIndex) => {
      setGameData((prevGameData) => {
         const newGameData = [...prevGameData]
         newGameData[rowIndex].userInput = event.target.value
         return newGameData
      })
   }

   return <div>PlayMathsGame</div>
}
