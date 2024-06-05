import React, { useState } from 'react'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import './sliderStyle.css'

const SliderInputAnt = ({
   min = 0.1,
   max = 1.4,
   value = 1,
   setValue,
}) => {
   // const { max, min } = props
   const [sliderValue, setSliderValue] = useState(value)
   const mid = Number(((max - min) / 2).toFixed(5))
   const preColorCls = value >= mid ? '' : 'icon-wrapper-active'
   const nextColorCls = value >= mid ? 'icon-wrapper-active' : ''
   console.log(value, mid, preColorCls, nextColorCls)

   return (
      <div>
         <div className='icon-wrapper'>
            <FrownOutlined className={preColorCls} />
            <Slider
               label='speed'
               onChange={setSliderValue}
               value={sliderValue}
               step={0.1}
               min={min}
               max={max}
               // vertical={true}
            />
            <SmileOutlined className={nextColorCls} />
         </div>
      </div>
   )
}
export default SliderInputAnt
