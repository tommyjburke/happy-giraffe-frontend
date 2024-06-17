import './Welcome.css'
import background5 from '../media/background5.png'
import { Link } from 'react-router-dom'

export default function Welcome() {
   return (
      <>
         <div className='welcomeContainer'>
            <h1>HAPPY GIRAFFE</h1>
            <div style={{ textAlign: 'center' }}>
               <span className='welcomeTitle africanFont'>
                  Automated Rote Learning, Saving Time,
                  Effortless Exercises
               </span>
            </div>

            <div className='flexVerticalContainer'>
               <div
                  style={{
                     textAlign: 'center',
                  }}
               >
                  <img
                     src={background5}
                     width='160px'
                     alt='happy giraffe'
                  />
               </div>
               <div className='welcomeParagraph'>
                  <label>Welcome to Happy Giraffe:</label>
                  <ul style={{ paddingLeft: '2rem' }}>
                     <li>
                        A tool for teachers and parents to easily
                        create engaging exercises for
                        primary-aged children.
                     </li>
                     <li>
                        Simplifies the preparation and
                        customization of educational activities,
                        eliminating the hassle of rote-learning
                        tasks.
                     </li>
                     <li>
                        Supports all learners, including children
                        with ADHD, providing fun and interactive
                        exercises that improve <u>focus</u> and
                        make mastering basic academic skills more
                        enjoyable.
                     </li>
                     <li>
                        Transforms the way young learners engage
                        with their education.
                     </li>
                  </ul>
               </div>

               <div
                  className='welcomeParagraph'
                  style={{ textAlign: 'center' }}
               >
                  <Link to='/ks'>
                     <button>
                        Create KeyStage Spelling Game
                     </button>
                  </Link>
                  <Link to='/spelling-diy'>
                     <button>
                        Create Customised Spelling Game
                     </button>
                  </Link>
                  <br />
                  <Link to='/maths'>
                     <button>Create Maths Game</button>
                  </Link>
                  <br />
                  <br />
               </div>
            </div>
         </div>
      </>
   )
}
