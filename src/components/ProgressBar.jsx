import { Progress } from 'antd'

function ProgressBar({ percentage }) {
   return (
      <div style={{ margin: '0', padding: '0px' }}>
         <Progress
            showInfo={false}
            percent={percentage}
            type='line'
            trailColor={'#6f6f6f'}
            // size={68}
            size={['90%', 28]}
            strokeColor={{
               '0%': 'red',
               '15%': 'orange',
               '30%': 'yellow',
               '40%': 'green',
               '50%': 'blue',
               '60%': 'indigo',
               '70%': 'violet',
               '80%': 'rgb(205, 127, 50)',

               '100%': 'gold',
            }}
         />
      </div>
   )
}

export default ProgressBar
