import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../fireabse';
const Users = () => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        const getAllUsers = async () => {
            const querySnap = await getDocs(collection(db, "users"));
            setUsers(querySnap.docs)
        }
        getAllUsers()
    }, [])
    return (
        <div className='users'>
            {users && users.map(user => (
                <div key={user.data().uid} className="bg-white shadow-md w-44 border border-gray-200 rounded-lg  dark:bg-gray-600">
                    <img className="rounded-t-lg w-full h-1/2" src={user.data() && user.data().photoURL} alt={user?.data().displayName} />
                    <div className="p-5 flex flex-col">
                        <span className='text-white'>{user?.data().displayName}</span>
                        <span className='text-white'>{user?.data().email}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users