import { Link } from 'react-router-dom'
import background5 from '../media/background5.png'

export default function Error404() {
   return (
      <>
         <div>
            <h1 className='main-page'>Error404</h1>
            <h1>It looks like you might be lost!</h1>

            <h1 style={{ color: 'var(--myWhite)' }}>
               <Link to='/'>🔙 BACK TO HAPPY GIRAFFE</Link>
            </h1>
         </div>
         <div>
            <img src={background5} alt='happy giraffe' />
         </div>
      </>
   )
}
