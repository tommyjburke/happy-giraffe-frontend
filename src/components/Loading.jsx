import React, { useContext, useEffect, useState } from 'react'
import { LoadingContext } from './LoadingContext'
// import { createPortal } from 'react-dom'
import Modal from 'antd/es/modal/Modal'
import { ModalProps } from 'antd'

const customStyles = {
   header: {
      backgroundColor: 'yellow',
      textAlign: 'center',
      fontSize: '4rem',
      color: 'var(--myOrange)',
   },
   body: {
      backgroundColor: 'var(--myWhite)',
   },
   footer: {
      backgroundColor: 'navy',
   },
   mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
}

const modalStyle = {
   border: '20px solid var(--myYellow)',
   borderRadius: '20px',
   backgroundColor: 'var(--myWhite)',
}

const Loading = () => {
   const { isLoading } = useContext(LoadingContext)
   const [isModalOpen, setIsModalOpen] = useState(false)

   useEffect(() => {
      if (isLoading) {
         setIsModalOpen(true)
      } else {
         setIsModalOpen(false)
      }
   }, [isLoading])

   // const showModal = () => {
   //    setIsModalOpen(true)
   // }

   // const handleOk = () => {
   //    setIsModalOpen(false)
   // }

   const handleCancel = () => {
      setIsModalOpen(false)
   }

   return (
      isModalOpen && (
         <Modal
            // afterClose={setIsModalOpen(false)}
            style={modalStyle}
            title='LOADING ...'
            open={isModalOpen}
            width={'50%'}
            footer={null}
            centered={true}
            closeIcon={null}
            // onOk={handleOk}
            onCancel={handleCancel}
            styles={customStyles}
         >
            <div style={{ backgroundColor: 'var(--myWhite)' }}>
               <h2>WORKING . . .</h2>
            </div>
         </Modal>
      )
   )

   // return isLoading ? (
   //    <Modal
   //       style={modalStyle}
   //       title='LOADING ...'
   //       open={isModalOpen}
   //       width={'50%'}
   //       footer={null}
   //       centered={true}
   //       closeIcon={null}
   //       // onOk={handleOk}
   //       onCancel={handleCancel}
   //       styles={customStyles}
   //    >
   //       <div style={{ backgroundColor: 'var(--myWhite)' }}>
   //          <h2>WORKING . . .</h2>
   //       </div>
   //    </Modal>
   // ) : null
}

export default Loading
