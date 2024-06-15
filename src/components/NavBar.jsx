import { NavLink, Link, Outlet } from 'react-router-dom'
import { Space } from 'antd'
import './NavBar.css'
import { LoadingProvider } from './LoadingContext'
import Loading from './Loading'
import background5 from '../media/background5.png'

const navigation = [
   {
      name: 'KeyStage Words',
      href: '/ks',
      background: background5,
   },
   // {
   //    name: 'Background 5',
   //    href: '/ks',
   //    background: background5,
   // },

   { name: 'DIY Spelling', href: '/spelling-diy' },
   { name: 'Maths', href: '/maths' },

   // { name: 'Maths', href: '/spelling-list' },
]

export default function NavBar() {
   return (
      <div className='navBarContainer'>
         <div className='navBar'>
            {navigation.map((item) => (
               <div key={item.name} className='navLink'>
                  <Space>
                     <NavLink
                        to={item.href}
                        className={({ isActive }) => {
                           return isActive
                              ? 'activeLink'
                              : 'inactiveLink'
                        }}
                     >
                        {item.background && (
                           <img
                              className='navLinkImg'
                              height={'15px'}
                              src={item.background}
                              alt={item.name}
                           />
                        )}
                        {item.name}
                     </NavLink>
                  </Space>
               </div>
            ))}
         </div>
         <>
            <LoadingProvider>
               <Loading />
               <Outlet />
            </LoadingProvider>
         </>

         <div className='footer'>
            <div
               className='content'
               style={{ fontFamily: 'Schoolbell' }}
            >
               {' '}
               <Link to='/create-array'>
                  {' '}
                  HappyGiraffe.co.uk © T.J. Burke{' '}
                  {new Date().getFullYear()}
               </Link>
            </div>
         </div>
      </div>
   )
}
