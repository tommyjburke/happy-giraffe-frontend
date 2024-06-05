import { createContext, useState } from 'react'
import NavBar from './NavBar'

export const Context = createContext()

export default function Home({ children }) {
   return <NavBar>{children}</NavBar>
}
