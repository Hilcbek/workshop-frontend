import { lazy, Suspense, useCallback, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import clsx from 'clsx'

import { Toaster } from 'sonner'
import type { AppDispatch } from './toolkit/store'
import { useDispatch } from 'react-redux'
import { userThunk } from './toolkit/users/thunk'
import SpinnersComponent from './components/Spinner'
import RoleBasedRoute from './hooks/RoleBasedRoute'
import AdminContainer from './pages/Admin/AdminContainer'
import AnalyticsPage from './pages/Admin/AnalyticsPage'
import AllBooking from './pages/Admin/AllBooking'
import AllTimeSlot from './pages/Admin/AllTimeSlot'
import UpdateTimeSlot from './pages/Admin/UpdateTimeSlot'
import MyBooking from './pages/MyBooking'
const CreateBookings = lazy(() => import('./pages/CreateBookings'))
const Container = lazy(() => import('./components/Container'))
const Home = lazy(() => import('./pages/Home'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
import AddWorkShop from './pages/Admin/AddWorkShop'
import AddTimeSlot from './pages/Admin/AddTimeSlot'
import AllWorkShop from './pages/Admin/AllWorkShop'
import UpdateBooking from './pages/UpdateBooking'
import UpdateWorkShop from './pages/Admin/UpdateWorkShop'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/create-booking',
        element: <RoleBasedRoute auth='must' component={CreateBookings} requiredRoles={['user']} />
      },
      {
        path: '/update-booking',
        element: <RoleBasedRoute auth='must' component={UpdateBooking} requiredRoles={['user']} />
      },
      {
        path: "register",
        element: <RoleBasedRoute
          component={Register}
          auth={'mustnot'}
        />
      },
      {
        path: "login",
        element: <RoleBasedRoute
          component={Login}
          auth={'mustnot'}
        />
      },
      {
        path: "admin",
        element: <RoleBasedRoute auth='must' component={AdminContainer} requiredRoles={['admin']} />,
        children: [
          {
            index: true,
            element: <AnalyticsPage />
          },
          {
            path: 'all-workshops',
            element: <RoleBasedRoute auth='must' component={AllWorkShop} requiredRoles={['admin']} />
          },
          {
            path: 'all-bookings',
            element: <RoleBasedRoute auth='must' component={AllBooking} requiredRoles={['admin']} />
          },{
            path: 'add-workshop',
            element: <RoleBasedRoute auth='must' component={AddWorkShop} requiredRoles={['admin']} />
          },
          {
            path: 'add-timeslot',
            element: <RoleBasedRoute auth='must' component={AddTimeSlot} requiredRoles={['admin']} />
          },
          {
            path: 'all-timeslots',
            element: <RoleBasedRoute auth='must' component={AllTimeSlot} requiredRoles={['admin']} />
          },
          {
            path: 'update-timeslot',
            element: <RoleBasedRoute auth='must' component={UpdateTimeSlot} requiredRoles={['admin']} />
          },
          {
            path: 'update-workshop',
            element: <RoleBasedRoute auth='must' component={UpdateWorkShop} requiredRoles={['admin']} />
          }
        ]
      },
      {
        path :'my-bookings',
        element: <RoleBasedRoute auth='must' component={MyBooking} requiredRoles={['user']} />
      }
    ]
  }
])
function App() {
  const dispatch: AppDispatch = useDispatch()
  const fetchLoggedInUser = useCallback(async () => {
    await dispatch(userThunk.getLoggedInUserThunk())
  }, [dispatch])
  useEffect(() => {
    fetchLoggedInUser()
  }, [fetchLoggedInUser])
  return (
    <>
      <Toaster closeButton position='top-right' toastOptions={{ duration: 3000, }} />
      <Suspense fallback={<div className={clsx(`w-full h-screen flex justify-center items-center`)}>
        <SpinnersComponent loading={true} size={60} />
      </div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
