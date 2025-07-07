export interface adminNavProps {
    path: string;
    label: string;
}
export const adminNav: adminNavProps[] = [
    {
        path: '/admin/all-workshops',
        label: 'All Workshops'
    },
    {
        path: '/admin/add-workshop',
        label: 'Add Workshop'
    },
    {
        path: '/admin/all-timeslots',
        label: 'All Time Slots'
    },
    {
        path: '/admin/add-timeslot',
        label: 'Add Time Slot'
    },
    {
        path: '/admin/all-bookings',
        label: 'All Bookings'
    },
]