import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../fireabse';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const { isAuthenticated } = useContext(AuthContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        signOut(auth)
        navigate('/')
    }
    return (
        <nav
            className="flex items-center justify-between flex-wrap bg-white py-1 w-full px-4  shadow border-solid ">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
                <Link to='/' className="text-xl tracking-tight">My Admin
                </Link>
            </div>
            <div className="menu">
                <div className="flex flex-col relative">
                    <IconButton aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                        <Avatar src={isAuthenticated && isAuthenticated.photoURL} sx={{ width: '35px', height: '35px' }} />
                    </IconButton>
                    <Menu
                        open={open}
                        id="account-menu"
                        className='shadow'
                        sx={{ top: '60px' }}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <MenuItem onClose={handleClose}>
                            <Avatar src={isAuthenticated && isAuthenticated.photoURL} /> <span className='px-2'>{isAuthenticated && isAuthenticated.displayName}</span>
                        </MenuItem>
                        <MenuItem onClick={logout} onClose={handleClose}>
                            <Avatar src={isAuthenticated && isAuthenticated.photoURL} /> <span className='px-2'>Profile Log out</span>
                        </MenuItem>
                        <MenuItem onClose={handleClose}>
                            <Link to='/'>Log out</Link>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}

export default AdminHeader