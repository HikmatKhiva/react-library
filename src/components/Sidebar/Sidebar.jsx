import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="md:flex flex-col md:flex-row h-full w-1/2 md:w-1/5 border-r-2">
            <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <NavLink to='/admin/add' className={(isActive) => isActive ? 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg' : 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-600 rounded-lg'} replace >Add book</NavLink>
                <NavLink to='/admin/books' className={(isActive) => isActive ? 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg' : 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-600 rounded-lg'} replace >Books</NavLink>
                <NavLink to='/admin/users' className={(isActive) => isActive ? 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-200 rounded-lg' : 'block px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-600 rounded-lg'} replace >Users</NavLink>
            </nav >
        </div >
    )
}

export default Sidebar