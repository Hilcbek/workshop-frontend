import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // optional
import type { AppDispatch, RootState } from '../../toolkit/store';
import SpinnersComponent from '../Spinner';
import Avatar from '@mui/material/Avatar';
import ButtonComponent from '../button';
import Cookies from 'js-cookie';
import { LOGOUT } from '../../toolkit/users/slice';
import { NavLinks, type INavlink } from './types';

const ResponsiveNavbar: React.FC = () => {
  const { data, isLoggedIn, isLoggedInLoading } = useSelector((state: RootState) => state.userSlice)
  const dispatch: AppDispatch = useDispatch()
  const logout = () => {
    Cookies.remove('token');
    dispatch(LOGOUT())
    window.location.href = '/login'
  }
  return (
    <nav className={clsx('px-4 transition-all ease-in-out duration-200 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between py-4')}>
      <Link to={'/'} className='font-bold text-3xl'>
        Achive<span className='text-rose-600'>.Engine</span>
      </Link>
      <div className={clsx('flex w-fit items-center gap-3')}>
        
        {
          isLoggedInLoading ? <SpinnersComponent loading={isLoggedInLoading} /> : isLoggedIn && data?.data && data?.data?.length > 0 ? <div className='flex items-center gap-5'>
            <Avatar sx={{ bgcolor: '#0070f3' }}>{data.data[0].username[0].toUpperCase()}</Avatar>
            {
              NavLinks.map((link: INavlink) => {
                const hasRole = link.role === data?.data[0].role || link.role === 'guest'
                return (
                  hasRole && <Link key={link.path} to={link.path} className='text-sm min-w-fit hover:bg-primaryColor hover:text-white border border-primaryColor p-2 rounded-sm text-primaryColor'>{link.label}</Link>
                )
              })
            }
            <ButtonComponent label='Logout' onClick={logout} />
          </div> : <div>
            <Link to={'/login'} className='text-sm bg-primaryColor text-white rounded-sm p-2'>Sign in</Link>
            <Link to={'/register'} className='text-sm hover:bg-primaryColor hover:text-white border border-primaryColor p-2 rounded-sm text-primaryColor ml-3'>Sign up</Link>
          </div>
        }
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;


