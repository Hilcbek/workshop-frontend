import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import NavBar from './Navbar/NavBar'

const Container = () => {
  return (
    <div className={clsx('w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 h-full font-manrope')}>
      <NavBar />
        <Outlet />
    </div>
  )
}

export default Container