import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpinnersComponent from '../Spinner';
import Avatar from '@mui/material/Avatar';
import ButtonComponent from '../button';
import Cookies from 'js-cookie';
import { LOGOUT } from '../../toolkit/users/slice';
import { NavLinks, type INavlink } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react'; // or use any icons you want
import type { AppDispatch, RootState } from '../../toolkit/store';

const ResponsiveNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoggedIn, isLoggedInLoading } = useSelector((state: RootState) => state.userSlice)
  const dispatch: AppDispatch = useDispatch();

  const logout = () => {
    Cookies.remove('token');
    dispatch(LOGOUT());
    window.location.href = '/login';
  };

  const userData = data?.data?.[0];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={clsx('relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 flex items-center justify-between border-b border-gray-200')}>
      <Link to={'/'} className='font-bold text-3xl'>
        Achive<span className='text-rose-600'>.Engine</span>
      </Link>

    
      <div className="flex md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-primaryColor hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    
      <div className="hidden md:flex items-center gap-4">
        {isLoggedInLoading ? (
          <SpinnersComponent loading={isLoggedInLoading} />
        ) : isLoggedIn && userData ? (
          <div className='flex items-center gap-5'>
            <Avatar sx={{ bgcolor: '#0070f3' }}>{userData.username[0].toUpperCase()}</Avatar>
            {NavLinks.map((link: INavlink) => {
              const hasRole = link.role === userData.role || link.role === 'guest';
              return hasRole && (
                <Link
                  key={link.path}
                  to={link.path}
                  className='text-sm min-w-fit hover:bg-primaryColor hover:text-white border border-primaryColor p-2 rounded-sm text-primaryColor'
                >
                  {link.label}
                </Link>
              );
            })}
            <ButtonComponent label='Logout' onClick={logout} />
          </div>
        ) : (
          <div>
            <Link to='/login' className='text-sm bg-primaryColor text-white rounded-sm p-2'>Sign in</Link>
            <Link to='/register' className='text-sm hover:bg-primaryColor hover:text-white border border-primaryColor p-2 rounded-sm text-primaryColor ml-3'>Sign up</Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50"
          >
            <div className="flex flex-col gap-4 p-4 border-t border-gray-200">
              {isLoggedInLoading ? (
                <SpinnersComponent loading={isLoggedInLoading} />
              ) : isLoggedIn && userData ? (
                <>
                  <div className='flex items-center gap-3 mb-2'>
                    <Avatar sx={{ bgcolor: '#0070f3' }}>{userData.username[0].toUpperCase()}</Avatar>
                    <span className='text-primaryColor font-medium'>{userData.username}</span>
                  </div>
                  {NavLinks.map((link: INavlink) => {
                    const hasRole = link.role === userData.role || link.role === 'guest';
                    return hasRole && (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className='text-sm border border-primaryColor p-2 rounded-sm text-primaryColor hover:bg-primaryColor hover:text-white'
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <ButtonComponent label='Logout' onClick={logout} />
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    onClick={() => setIsOpen(false)}
                    className='text-sm bg-primaryColor text-white rounded-sm p-2'
                  >
                    Sign in
                  </Link>
                  <Link
                    to='/register'
                    onClick={() => setIsOpen(false)}
                    className='text-sm hover:bg-primaryColor hover:text-white border border-primaryColor p-2 rounded-sm text-primaryColor'
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ResponsiveNavbar;
