import React, { useState, useEffect } from 'react';
import Book from '../components/Book/Book';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../fireabse';
import Loading from '../components/Loading/Loading';
const Books = () => {
    // const books = [
    //     { id: 1, title: 'title', desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, fugit mollitia. Corporis fugiat iure vel provident sed commodi doloribus ab!', cover: 'test.png', price: 0 },
    //     { id: 2, title: 'title', desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, fugit mollitia. Corporis fugiat iure vel provident sed commodi doloribus ab!', cover: 'test.png', price: 0 },
    //     { id: 3, title: 'title', desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, fugit mollitia. Corporis fugiat iure vel provident sed commodi doloribus ab!', cover: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdab1nmslvvntp.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F08%2F1472132976url-parameters.jpg&f=1&nofb=1&ipt=eff5f2b74e18327ecb330eedf603b8bfad677a82766d2f7e3bbf33296753da0f&ipo=images', price: 0 },
    //     { id: 4, title: 'title', desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, fugit mollitia. Corporis fugiat iure vel provident sed commodi doloribus ab!', cover: 'test.png', price: 0 },
    //     { id: 5, title: 'title', desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, fugit mollitia. Corporis fugiat iure vel provident sed commodi doloribus ab!', cover: 'test.png', price: 0 },
    // ]
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getBooks = async () => {
            const querySnapshot = await getDocs(collection(db, "books"));
            setBooks(querySnapshot.docs)
            setLoading(false)
        }
        getBooks()
    }, [])
    return (
        <>
            {loading ? <Loading /> : <div style={{height:`calc(${100}vh - ${72}px )`,background:'url(http://www.feedinspiration.com/wp-content/uploads/2015/05/The-Oberlausitzische-Library-Of-Science.jpg)'}} className='books flex flex-wrap gap-2 px-8 py-4'>
                {
                    books && books.map(book => (
                        <Book key={book.id} book={book.data()} />
                    ))
                }

            </div >
            }
        </>
    )
}
export default Books;