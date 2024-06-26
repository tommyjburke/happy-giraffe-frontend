import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import DiySpellingConsole from '../diy-spelling/DiySpellingConsole'
import Error404 from './Error404'
import KSTemplate2 from '../ks-spelling/KSTemplate2'
import SpellingPractice from './SpellingPractice'
import KsSpellingConsole from '../ks-spelling/KsSpellingConsole'
import Home from './Home'
import DiyPlayRoute from '../diy-spelling/DiyPlayRoute'
import KsPlayRoute from '../ks-spelling/KsPlayRoute'
import { CreateArray } from './CreateArray'
import MathsConsole from '../maths/MathsConsole'
import MathsPlayRoute from '../maths/MathsPlayRoute'
import Welcome from './Welcome'
import KsPresets from '../ks-spelling/KsPresets'
import GrammarConsole from '../grammar/GrammarConsole'
import GrammarPlayRoute from '../grammar/GrammarPlayRoute'

const router = createBrowserRouter([
   {
      path: '/',

      element: <Home />,

      errorElement: <Error404 />,
      children: [
         {
            path: '/',
            // element: <KsSpellingConsole />,
            element: <Welcome />,
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
            element: <MathsConsole />,
         },
         {
            path: '/maths/:data',
            element: <MathsPlayRoute />,
         },
         {
            path: 'ks-presets',
            element: <KsPresets />,
         },
         {
            path: 'create-array',
            element: <CreateArray />,
         },
         {
            path: '/grammar',
            element: <GrammarConsole />,
         },
         {
            path: '/grammar/:data',
            element: <GrammarPlayRoute />,
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
               Select: {
                  fontFamily: 'Schoolbell',
                  // colorTextDescription: 'var(--myBrown)',
                  // colorTextPlaceholder: 'var(--myBrown)',
                  // colorBgContainer: 'var(--myBrown)',
                  // colorBgElevated: 'var(--myBrown)',
                  // colorPrimary: 'var(--myBrown)',
                  // colorText: 'var(--myOrange)',
               },
               Switch: {
                  colorPrimary: 'green',
                  colorPrimaryBorder: 'var(--myOrange)',
                  colorPrimaryActive: 'var(--myBrown)',
                  colorPrimaryHover: 'var(--myBrown)',
                  // trackHeight: 32,
                  // handleSize: 26,
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
               Checkbox: {
                  colorPrimary: 'var(--myOrange)',
                  colorPrimaryBorder: 'var(--myYellow)',
                  colorPrimaryActive: 'var(--mYellow)',
                  colorPrimaryHover: 'var(--myYellow)',
               },
               InputNumber: {
                  controlWidth: 42,
               },
               Slider: {
                  handleColor: 'var(--myOrange)',
                  dotActiveBorderColor: 'brown',
                  handleActiveColor: 'orange',
                  railBg: 'darkgray',
                  trackBg: 'var(--myBrown)',
                  trackHoverBg: 'brown',
                  handleSize: 24,
                  railSize: 8,
                  handleSizeHover: 28,
                  handleColor: 'brown',

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
