export interface INavlink {
    path: string
    label: string,
    role : 'user' | 'admin' | 'guest'
}
export const NavLinks: INavlink[] = [
    {
        path: '/my-bookings',
        label: 'My Bookings',
        role : 'user'
    },
    {
        path: '/admin',
        label: 'Admin',
        role : 'admin'
    },
    {
        path: '/create-booking',
        label: 'Create Booking',
        role : 'user'
    }
]