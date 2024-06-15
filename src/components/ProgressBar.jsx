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
               '0%': 'brown',
               '5%': 'darkRed',
               '20%': 'red',

               '30%': 'orange',

               '60%': 'yellow',

               '100%': 'green',
            }}
         />
      </div>
   )
}

export default ProgressBar
