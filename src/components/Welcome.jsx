import React from 'react'
import './Welcome.css'

export default function Welcome() {
   return (
      <>
         <div className='activePageContainer'>
            <p>PAGE CONTAINER</p>
            <div className='pageHeader'>PAGE HEADER</div>
            <div className='scoreBoardTop'>SCORE BOARD</div>
            <div className='mainContentContainer'>
               MAIN CONTENT CONTAINER
               <br />
               <div className='contentDiv'>CONTENT DIV</div>
               <div className='contentDiv'>CONTENT DIV</div>
               <div className='contentDiv'>CONTENT DIV</div>
            </div>
         </div>
      </>
   )
}
