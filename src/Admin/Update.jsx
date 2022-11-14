import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, storage } from '../fireabse';
import { BsUpload } from 'react-icons/bs';
const Update = () => {
  const [image, setImage] = useState(null);
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split('/').pop();
  const handleChangeInput = (e) => setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleClick = async (e) => {
    e.preventDefault()
    if (!image) {
      toast.error('you didn\'t upload image')
      return
    }
    try {
      const storageRef = ref(storage, `books/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      getDownloadURL(uploadTask.snapshot.ref).then(
        async (downloadURL) => {
          await updateDoc(doc(db, 'books', bookId), {
            title: book.title,
            desc: book.desc,
            price: book.price,
            image: downloadURL,
          })
        }
      );
      setBook({ title: '', desc: '', price: 0 });
      toast.success('Book Updated');
      navigate('/admin/books');
    } catch (e) {
      toast.error('something went ' + e.message)
    }
  }
  return (
    <div className='w-full flex justify-center py-6'>
      <div className='form flex flex-col items-center w-96 gap-4'>
        <span className='text-2xl'>Update Book</span>
        <input className='border w-full p-2 outline-none rounded shadow' type="text" placeholder='title' onChange={handleChangeInput} name='title' />
        <input className='border w-full p-2 outline-none rounded shadow' type="text" placeholder='desc' onChange={handleChangeInput} name='desc' />
        <input className='border w-full p-2 outline-none rounded shadow' minLength={0} type="number" placeholder='price' onChange={handleChangeInput} name='price' />
        <div className='flex justify-between w-full items-center'>
          <label className='cursor-pointer flex gap-4 items-center' htmlFor="image">
            <input
              style={{ display: 'none' }}
              type="file"
              id='image'
              placeholder='cover'
              accept="image/*"
              required
              onChange={e => setImage(e.target.files[0])} />
            <BsUpload size={'30px'} />
            {image && <span>{image.name}</span>}
            {/* <UploadFile /> */}
          </label>
          <button onClick={() => setImage(null)}
            className='cursor-pointer text-lg text-red-500 border px-2 rounded transition-all duration-300 border-red-500 hover:bg-red-500 hover:text-white'>
            clear
          </button>
        </div>
        <button className='border w-full p-2 rounded bg-green-500 text-white hover:bg-green-600 transition duration-300' onClick={handleClick} >Add </button>
      </div>
    </div>
  )
}
export default Update