import { useState } from 'react'
import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom'
import { ConfigProvider } from 'antd'

import DiySpellingConsole from '../diy-spelling/DiySpellingConsole'
import Maths from './Maths'
import Error404 from './Error404'
import KSTemplate from '../ks-spelling/KSTemplate'
import KSTemplate2 from '../ks-spelling/KSTemplate2'
import SpellingPractice from './SpellingPractice'
import KsSpellingConsole from '../ks-spelling/KsSpellingConsole'
import Home from './Home'
import KsTest from '../ks-spelling/KsTest'
import DiyPlayRoute from '../diy-spelling/DiyPlayRoute'
import Welcome from './Welcome'
import KsPlayRoute from '../ks-spelling/KsPlayRoute'
import { CreateArray } from './CreateArray'

const router = createBrowserRouter([
   {
      path: '/',

      element: <Home />,

      errorElement: <Error404 />,
      children: [
         {
            path: '/',
            element: <KsSpellingConsole />,
            // element: <Welcome />,
         },
         {
            path: '/spelling-diy',
            element: <DiySpellingConsole />,
         },
         {
            path: '/spelling-diy/:data',
            element: <DiyPlayRoute />,
         },

         {
            path: '/ks',
            element: <KsSpellingConsole />,
         },
         {
            path: '/ks/:data',
            element: <KsPlayRoute />,
         },
         // {
         //    path: '/ks-test/:data',
         //    element: <KsTest />,
         // },
         {
            path: '/ks/:ksId/:level/:number',
            element: <KSTemplate2 />,
         },
         {
            path: '/spelling-list',
            element: <SpellingPractice />,
         },

         // {
         //    path: '/spelling-custom',
         //    element: <SpellingCustom />,
         // },
         {
            path: '/maths',
            element: <Maths />,
         },
         {
            path: 'create-array',
            element: <CreateArray />,
         },
      ],
   },
   // {
   //    path: '/ks/:ksId',
   //    element: <KSTemplate />,
   // },
])

export default function App() {
   return (
      <ConfigProvider
         theme={{
            token: {
               // fontFamily: 'Delicious Handrawn',
               // colorPrimary: '#654321',
               // backgroundAttachment: 'fixed',
               // backgroundColor: 'var(--myBrown)',
               fontFamily: 'Roboto',
            },
            components: {
               Switch: {
                  colorPrimary: '#654321',
                  colorPrimaryBorder: 'var(--myOrange)',
                  colorPrimaryActive: 'var(--myOrange)',
                  colorPrimaryHover: 'var(--myOrange)',
               },
               Button: {
                  // colorBgContainer: 'var(--myBrown)',
                  colorPrimary: '#654321',
                  // colorPrimaryActive: 'red',
                  colorPrimaryHover: 'var(--myOrange)',
               },
               PopConfirm: {
                  handleStyle: {
                     color: 'brown',
                     backgroundColor: 'brown',
                  },
                  colorPrimary: '#654321',
                  railStyle: {
                     backgroundColor: 'orange',
                  },
               },
               Slider: {
                  handleColor: 'var(--myOrange)',
                  dotActiveBorderColor: 'brown',
                  handleActiveColor: 'brown',
                  railBg: 'darkgray',
                  trackBg: 'var(--myBrown)',
                  trackHoverBg: 'brown',

                  // handleStyle: {
                  //    color: 'brown',
                  //    backgroundColor: 'brown',
                  // },
                  // colorPrimary: '#654321',
                  // railStyle: {
                  //    backgroundColor: 'orange',
                  // },
               },
            },
         }}
      >
         <RouterProvider router={router} />
      </ConfigProvider>
   )
}
