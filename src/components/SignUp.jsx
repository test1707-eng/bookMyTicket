import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../store/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
        setName("");
        setEmail("");
        setPassword("");
        if (name && email && password) {
            toast.success('Sign Up successful');
            navigate('/');
        }
    }
    return (
        <>
            <div className='signUp flex items-center justify-center h-screen'>
                <div className='signUp flex items-center justify-center w-[500px] h-[500px] '>
                    <div className='signUp__container container mx-auto bg-[#2f2f2f] p-6 rounded-lg'>
                        <h1 className='signUp__title text-2xl font-bold text-white text-center mb-4' >Sign Up</h1>
                        <form className='signUp__form space-y-4 ' onSubmit={handleSubmit}>
                            <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} className='signUp__input w-full p-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='signUp__input w-full p-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='signUp__input w-full p-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <button type='submit' className='signUp__button w-full p-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>Sign Up</button>
                        </form>
                        <p className='login__register text-center text-white mt-4'>Already have an account? <Link to='/' className='login__register-link text-blue-500'>Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp