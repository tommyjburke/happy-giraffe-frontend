import Slider1 from '../components/Slider1'

export default function TableHeader({
   speechSpeed,
   setSpeechSpeed,
}) {
   return (
      <thead>
         <tr>
            <th colSpan='4'>
               <Slider1
                  value={speechSpeed}
                  onChange={setSpeechSpeed}
               />
            </th>
         </tr>
         <tr>
            <th title='question number'>*</th>
            <th title='robot voice'>🤖</th>
            <th title='human voice'>👩‍🦲</th>
            <th title='Scrambled version'>Scrambled</th>
            <th>Your Guess</th>
            <th title='Number of letters in each word'>
               Letters
            </th>
            <th></th>
         </tr>
      </thead>
   )
}
