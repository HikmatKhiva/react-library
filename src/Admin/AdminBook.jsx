import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../fireabse';
import toast from 'react-hot-toast';
const showBtnClass = 'border-red-500  shadow-red-500 bg-red-600 hover:bg-red-700';
const hiddenBtnClass = 'border-blue-500  shadow-blue-500 bg-blue-600 hover:bg-blue-700';
const AdminBook = ({ book }) => {
    const [showDesc, setDesc] = useState(false);
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "books", id));
            toast.success('Book delete successfully')
        } catch (e) {
            toast.error('something went error ' + e.message)
        }
    }
    return (
        <div className={`book border w-80 flex flex-col  rounded shadow`}>
            {book.image && <img className='w-full rounded-t h-60' src={book.image} alt={book.title} />}
            <div className='book-desc flex flex-col p-2'>
                <h2 className='text-center mt-2 text-xl'>{book.title}</h2>
                <p className={`w-full text-center transition duration-300 ${!showDesc && 'text-ellipsis overflow-hidden whitespace-nowrap'}`}>{book.desc}</p>
                <span className='self-center text-2xl'>{book.price}</span>
                <button
                    onClick={() => setDesc(prev => !prev)}
                    className={`text-white rounded py-1 shadow w-44 self-center px-2 ${showDesc ? showBtnClass : hiddenBtnClass}`}>
                    {showDesc ? 'hidden' : 'show'}
                </button>
                <span className='flex gap-2'>
                    <button className=' w-1/2 bg-indigo-600 text-white self-center my-1 py-1 rounded transition duration-300 shadow-indigo-700 hover:bg-indigo-700 '>
                        <Link to={`/admin/update/${book.id}`}>Update</Link></button>
                    <button onClick={() => handleDelete(book.id)} className=' w-1/2 bg-red-600 text-white self-center my-1 py-1 rounded transition duration-300 shadow-red-700 hover:bg-red-700 '>
                        <Link to='/admin'>Delete</Link></button>
                </span>
            </div>
        </div>
    )
}
export default AdminBook