import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../fireabse';
import AdminBook from './AdminBook';
const AdminBooks = () => {
    const [books, setBooks] = useState(null);
    useEffect(() => {
        const getBooks = async () => {
            const querySnapshot = await getDocs(collection(db, "books"));
            setBooks(querySnapshot.docs)
        }
        getBooks()
    }, [])
    return (
        <div className='books flex flex-wrap gap-2 justify-center mt-5'>
            {books && books.map(book => (
                <AdminBook key={book.id} book={book.data()} />
            ))}
        </div>
    )
}
export default AdminBooks