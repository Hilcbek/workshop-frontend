import { adminNav, type adminNavProps } from './types';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import type { JSX } from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';

const iconMap: Record<string, JSX.Element> = {
    admin: <DashboardIcon fontSize="small" className="mr-2" />,
    'all-workshops': <ListAltIcon fontSize="small" className="mr-2" />,
    'all-bookings': <EventNoteIcon fontSize="small" className="mr-2" />,
    'add-workshop': <AddBoxIcon fontSize="small" className="mr-2" />,
    'add-timeslot': <AddBoxIcon fontSize="small" className="mr-2" />,
    'all-timeslots': <ScheduleIcon fontSize="small" className="mr-2" />,
    'update-timeslot': <UpdateIcon fontSize="small" className="mr-2" />,
};

const AdminNavBar = () => {
    const location = useLocation();

    return (
        <nav className="mt-6 px-4">
            <ul className="
        flex flex-col gap-2
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3
      ">
                {adminNav.map((link: adminNavProps) => {
                    const isActive = location.pathname === link.path;
                    const key = link.path.split('/').pop() || 'dashboard';

                    return (
                        <li key={link.path} className="w-full sm:w-auto">
                            <Link
                                to={link.path}
                                className={clsx(
                                    'w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-md border transition-colors duration-200',
                                    isActive
                                        ? 'bg-primaryColor text-white border-primaryColor'
                                        : 'text-primaryColor border border-primaryColor hover:bg-primaryColor hover:text-white'
                                )}
                            >
                                {iconMap[key]}
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default AdminNavBar;
