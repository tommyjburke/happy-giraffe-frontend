import './Slider1.css'
import { Popover } from 'antd'

export default function Slider1({ value, onChange }) {
   const handleSliderChange = (event) => {
      onChange(parseFloat(event.target.value))
   }

   return (
      <div
         className='slider-container '
         style={{
            alignSelf: 'self-start',
            padding: '0 0px 0 0px',
         }}
      >
         <label>
            {' '}
            <span style={{ margin: '0 5px' }}>🤖</span>{' '}
         </label>

         <Popover
            content='change speed of robot voice'
            title='SPEED'
         >
            <input
               style={{ width: '5rem' }}
               type='range'
               min='0.1'
               max='1.4'
               step='0.1'
               value={value}
               onChange={handleSliderChange}
               className='slider rate-control'
               // style={{
               //    backgroundColor: 'brown',
               // }}
               // className='slider'
            />
         </Popover>
         <span className='slider-label'>
            <span>{(value * 100).toFixed(0)}%</span>
         </span>
      </div>
   )
}
