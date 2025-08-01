import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ email, password }));
            toast.success('Login successful');
            navigate('/home');
        } else {
            toast.error('Please enter email and password');
        }
    };

    return (
        <div className='login flex items-center justify-center h-screen bg-[#1e1e1e] p-4'>
            <div className='login__container w-full max-w-md bg-[#2f2f2f] p-8 rounded-lg shadow-lg'>
                <h1 className='login__title text-3xl font-bold text-white text-center mb-6'>Login</h1>
                <form className='login__form space-y-6' onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='login__input w-full p-3 bg-[#1e1e1e] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='login__input w-full p-3 bg-[#1e1e1e] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <button type='submit' className='login__button w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold'>
                        Login
                    </button>
                </form>
                <p className='login__register text-center text-gray-400 mt-6'>
                    Don't have an account? <Link to='/register' className='login__register-link text-blue-500 hover:underline'>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;