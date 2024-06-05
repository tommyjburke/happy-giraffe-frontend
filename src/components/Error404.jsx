import { Link } from 'react-router-dom'

export default function Error404() {
   return (
      <>
         <h1 className='main-page'>Error404</h1>
         <h1>It looks like you might be lost!</h1>

         <h1>
            <Link to='/'>BACK TO HAPPY GIRAFFE</Link>
         </h1>
      </>
   )
}
