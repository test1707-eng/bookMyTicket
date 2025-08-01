import React, { useState } from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        setEmail('');
        setPassword('');
        toast.success('Login successful');
        navigate('/home');
    }
    return (
        <div className='login flex items-center justify-center h-screen'>
            <div className='login flex items-center justify-center '>
                <div className='login__container container mx-auto bg-[#2f2f2f] p-6 rounded-lg'>
                    <h1 className='login__title text-2xl font-bold text-white text-center mb-4' >Login</h1>
                    <form className='login__form space-y-4 ' onSubmit={handleSubmit}>
                        <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='login__input w-full p-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='login__input w-full p-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <button type='submit' className='login__button w-full p-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>Login</button>
                    </form>
                    <p className='login__register text-center text-white mt-4'>Don't have an account? <Link to='/register' className='login__register-link text-blue-500'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login