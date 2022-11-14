import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../fireabse';
import toast from 'react-hot-toast';
import { IoLogIn } from 'react-icons/io5';
import {FcHome} from 'react-icons/fc';
const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.email.length === 0) {
            toast.error("Email kiritmadingiz");
            return
        }
        if (user.password.length === 0) {
            toast.error("Password kiritmadingiz");
            return
        }
        else {
            try {
                await signInWithEmailAndPassword(auth, user.email, user.password);
                toast.success(`Succssessfylly ${user.email} Sign In`)
                navigate('/admin')
            } catch (e) { toast.error('something went wrong ' + e.message) }
        }
    }
    return (
        <div className='flex w-full items-center bg-blue-500 h-screen justify-center'>
            <div className="bg-white w-96 shadow-md  rounded px-8 pt-6 pb-4 flex flex-col">
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none"
                        id="email"
                        name='email'
                        onChange={handleChange}
                        type="email"
                        placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 outline-none"
                        name='password'
                        id="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="******************" />
                    <p className="text-red text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={handleSubmit} className="bg-blue hover:bg-blue-dark text-black border font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300" type="button">
                        Sign In
                    </button>
                </div>
                <span className='text-lg flex gap-2 items-center'>If you haven't an account
                    <Link className='text-blue-500 flex items-center gap-2' to='/admin/register'>Register <IoLogIn size={'22px'} /></Link>
                </span>
                <Link to='/' className='text-xl self-center flex items-center gap-2 hover:text-blue-500 transition duration-300'>
                    Home
                    <FcHome />
                </Link>
            </div>
        </div>
    )
}
export default Login