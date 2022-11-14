import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Admin from './Admin/Admin'
import { AuthContext } from './context/AuthContext'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Page404 from './Pages/Page404'
import Register from './Pages/Register'
const useRoutes = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useContext(AuthContext);
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return navigate('/admin/login')
        }
        return children
    }
    return (
        <>
            <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='*' element={<Page404 />} />
                <Route path='/admin/*' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path='/admin/register' element={<Register />} />
                <Route path='/admin/login' element={<Login />} />
            </Routes>
        </>
    )
}

export default useRoutes