import { Flex, Progress } from 'antd'

function ProgressBar({ percentage }) {
   return (
      <div style={{ margin: '0', padding: '0' }}>
         <Progress
            showInfo={false}
            percent={percentage}
            type='line'
            trailColor={'#6f6f6f'}
            // size={68}
            size={['90%', 28]}
            strokeColor={{
               '0%': 'red',
               // '25%': 'purple',
               // '30%': 'blue',
               '50%': 'yellow',
               // '70%': 'yellow',

               '100%': 'green',
            }}
         />
      </div>
   )
}

export default ProgressBar
