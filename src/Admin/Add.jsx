import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../fireabse';
import toast from 'react-hot-toast';
import { BsUpload } from 'react-icons/bs'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import UploadLoading from '../components/UploadLoading/UploadLoading';
const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0)
  const id = uuidv4();
  const [image, setImage] = useState(null);
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: 0,
  })
  const metadata = {
    contentType: 'image/*'
  };
  const handleChangeInput = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault()
    if (!image) {
      toast.error('You didn\'t upload image')
      return
    } else {

      try {
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);
        setLoading(true)
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(prev => prev += progress)
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                break;
              case 'storage/canceled':
                break;
              case 'storage/unknown':
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await setDoc(doc(db, "books", id), {
                id: id,
                title: book.title,
                desc: book.desc,
                price: book.price,
                image: downloadURL
              })
            });
          }
        );
        toast.success(`Successfully created ${book.title}`)
        setBook({ title: '', desc: '', price: 0 });
        setTimeout(() => {
          navigate('/admin/books')
        }, 1000)
      } catch (e) { toast.error('something error ' + e.message) }
    }
  }

  return (
    <div className='w-full py-6 flex justify-center'>
      {/* {image && <img src={image.url} alt="" />} */}
      <div className='form flex flex-col items-center w-96 gap-4'>
        <span className='text-2xl'>Add new Book</span>
        <input value={book.title}
          className='border p-2 outline-none rounded w-full shadow'
          type="text"
          placeholder='title'
          required
          onChange={handleChangeInput} name='title' />
        <input value={book.desc}
          className='border w-full p-2 outline-none rounded shadow'
          type="text"
          placeholder='desc'
          required
          onChange={handleChangeInput} name='desc' />
        <input value={book.price}
          className='border w-full p-2 outline-none rounded shadow'
          minLength={0} type="number" placeholder='price' onChange={handleChangeInput} name='price'
          required
        />
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
      {loading && <UploadLoading uploadProgress={uploadProgress} />}
    </div>
  )
}
export default Add