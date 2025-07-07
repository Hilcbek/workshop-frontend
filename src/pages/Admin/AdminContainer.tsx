import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"
import clsx from "clsx"

const AdminContainer = () => {
  return (
    <div className={clsx('flex mt-6 flex-col gap-4')}>
      <AdminNavBar />
      <Outlet />
    </div>
  )
}

export default AdminContainer