import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHeader from './AdminHeader';
import Sidebar from '../components/Sidebar/Sidebar'
import Add from './Add'
import AdminBooks from './AdminBooks';
import Update from './Update';
import Users from './Users';

const Admin = () => {
    return (
        <>
        <AdminHeader />
            <div style={{height:`calc(${100}vh - ${59}px )`}} className='admin-panel flex'>
                <Sidebar />
                <main  className='w-full p-2'>
                    <Routes>
                        <Route path='/add' element={<Add />} />
                        <Route path='/books' element={<AdminBooks />} />
                        <Route path='/update/:id' element={<Update />} />
                        <Route path='/users' element={<Users />} />
                    </Routes>
                </main>
            </div>
        </>
    )
}

export default Admin