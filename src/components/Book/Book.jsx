import React, { useState } from 'react';
const showBtnClass = 'border-red-500  shadow-red-500 bg-red-600 hover:bg-red-700';
const hiddenBtnClass = 'border-blue-500  shadow-blue-500 bg-blue-600 hover:bg-blue-700';
const Book = ({ book }) => {
    const [showDesc, setDesc] = useState(false);
    return (
        <div className={`book w-80 flex flex-col h-96  rounded shadow`}>
            {book.image && <img className='w-full rounded-t h-60' src={book.image} alt={book.title} />}
            <div className='book-desc bg-white flex flex-col p-2'>
                <h2 className='text-center mt-2 text-xl'>{book.title}</h2>
                <p className={`w-full text-center transition duration-300 ${!showDesc && 'text-ellipsis overflow-hidden whitespace-nowrap'}`}>{book.desc}</p>
                <span className='self-center text-2xl'>{book.price}</span>
                <button
                    onClick={() => setDesc(prev => !prev)}
                    className={`text-white rounded py-1 shadow w-44 self-center px-2 ${showDesc ? showBtnClass : hiddenBtnClass}`}>
                    {showDesc ? 'hidden' : 'show'}
                </button>
            </div>
        </div>
    )
}

export default Book