import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <nav
            className="flex items-center justify-between flex-wrap bg-white py-4 px-4 z-50 shadow border-solid ">
            <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
                    <Link to='/' className="font-semibold text-xl tracking-tight">My Library</Link>
                </div>
            </div>

            <div className="menu-header ">
                <div className="text-md font-bold text-blue-700 lg:flex-grow">
                    <Link to='/contact' href="#responsive-header"
                        className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                        Contact
                    </Link>
                </div>
                {/* <div className="flex ">
                    <Link to='/admin'
                        className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">admin</Link>
                </div> */}
            </div>

        </nav>
    )
}

export default Header