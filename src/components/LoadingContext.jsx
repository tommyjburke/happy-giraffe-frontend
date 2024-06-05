// LoadingContext.js
import React, { createContext, useState } from 'react'

export const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false)
   const [wordData, setWordData] = useState({}) // Initialize with an empty object

   const toggleLoading = () => {
      setIsLoading(!isLoading)
   }

   const updateWordData = (newWordData) => {
      setWordData(newWordData)
   }

   return (
      <LoadingContext.Provider
         value={{
            isLoading,
            toggleLoading,
            wordData,
            updateWordData,
         }}
      >
         {children}
      </LoadingContext.Provider>
   )
}
