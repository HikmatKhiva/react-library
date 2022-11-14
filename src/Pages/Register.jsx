import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../fireabse";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { IoLogIn } from 'react-icons/io5';
import { BsUpload } from 'react-icons/bs';
import {FcHome} from 'react-icons/fc';
const Register = () => {
    const [newUser, setNewUser] = useState({
        displayName: "",
        email: "",
        password: "",
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => { setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value })) };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.email.length === 0 && newUser.password.length === 0) {
            toast.error('Email kiritmadingiz va parol kiritmadingiz')
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
                const storageRef = ref(storage, `${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    (error) => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await updateProfile(res.user, {
                                    displayName: newUser.displayName,
                                    photoURL: downloadURL,
                                });
                                await setDoc(doc(db, "users", res.user.uid), {
                                    uid: res.user.uid,
                                    displayName: newUser.displayName,
                                    email: newUser.email,
                                    photoURL: downloadURL,
                                });
                                navigate("/admin/login");
                                toast.success('Yangi hisob yaratildi')
                            }
                        );
                    }
                );
            } catch (e) {
                if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
                    toast.error(e.message)
                    return
                }
                toast.error('nimadir xato')
            }
        }
    };
    return (
        <div className="flex w-full items-center bg-blue-500 h-screen justify-center">
            <div className="bg-white w-96 shadow-md  rounded px-8 pt-6 pb-4 mb-4 flex flex-col">
                <div className="mb-4">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none"
                        id="username"
                        type="text"
                        name="displayName"
                        onChange={handleChange}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 outline-none"
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div className="mb-2">
                    <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 outline-none"
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="******************"
                    />
                </div>
                <div className="mb-1 flex justify-between">
                    <label
                        className="flex items-center gap-1 text-grey-darker text-sm font-bold mb-2 cursor-pointer"
                        htmlFor="file"
                    >
                        <BsUpload title="Upload image" size={'24px'} />
                        {image?.name && <span>{image.name}</span>}
                    </label>
                    <input
                        style={{ display: "none" }}
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button onClick={() => setImage(null)} className="cursor-pointer text-lg text-red-500 border px-2 rounded transition-all duration-300 border-red-500 hover:bg-red-500 hover:text-white">clear</button>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue hover:bg-blue-dark text-black border font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                        type="button"
                    >
                        Sign Up
                    </button>
                </div>
                <span className="text-lg flex gap-1">
                    if you have an account{" "}
                    <Link className="text-blue-500 flex items-center gap-1" to="/admin/login">
                        Login <IoLogIn size={'22px'} />
                    </Link>
                </span>
                <Link to='/' className='text-xl self-center flex items-center gap-2 hover:text-blue-500 transition duration-300'>
                    Home
                    <FcHome />
                </Link>
            </div>
        </div>
    );
};

export default Register;
