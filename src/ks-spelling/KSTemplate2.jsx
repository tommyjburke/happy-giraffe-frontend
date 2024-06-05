import { useParams } from 'react-router-dom'
import ksWords from '../data/ksWords.json'
import { Link } from 'react-router-dom'
import Error404 from '../components/Error404'

export default function KSTemplate2() {
   const params = useParams()
   console.log('PARAMS: ', params)
   const id = useParams().ksId
   console.log(id)

   const array = ksWords[id]

   if (!array) {
      return <Error404 />
   }

   function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
         // Generate a random index between 0 and i
         const j = Math.floor(Math.random() * (i + 1))

         // Swap elements at indices i and j
         const temp = array[i]
         array[i] = array[j]
         array[j] = temp
      }
      return array
   }

   let myStringedArray = ksWords[id]
      ? ksWords[id].toString()
      : null

   console.log(myStringedArray)

   let shuffled = array ? shuffle(array) : 'INVALID'

   return (
      <div className='main-page'>
         <h1>
            KSTemplate<p>{id}</p>
         </h1>
         {/* {JSON.stringify(ksWords)} */}
         <div
            style={{
               textAlign: 'center',
               // alignItems: 'center',
            }}
         >
            <p> {myStringedArray}</p>

            <p> {JSON.stringify(params)}</p>
         </div>
         <div>
            <h1>
               <Link to='/'>BACK TO HAPPY GIRAFFE</Link>
            </h1>
            {/* <h1>{shuffled}</h1> */}
         </div>
      </div>
   )
}
