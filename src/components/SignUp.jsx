import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/userSlice';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            dispatch(register({ name, email, password }));
            toast.success('Sign Up successful');
            navigate('/');
        } else {
            toast.error('Please fill in all fields');
        }
    };

    return (
        <div className='signUp flex items-center justify-center h-screen bg-[#1e1e1e] p-4'>
            <div className='signUp__container w-full max-w-md bg-[#2f2f2f] p-8 rounded-lg shadow-lg'>
                <h1 className='signUp__title text-3xl font-bold text-white text-center mb-6'>Sign Up</h1>
                <form className='signUp__form space-y-6' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className='signUp__input w-full p-3 bg-[#1e1e1e] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <input 
                        type="email" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='signUp__input w-full p-3 bg-[#1e1e1e] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='signUp__input w-full p-3 bg-[#1e1e1e] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    />
                    <button type='submit' className='signUp__button w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold'>
                        Sign Up
                    </button>
                </form>
                <p className='login__register text-center text-gray-400 mt-6'>
                    Already have an account? <Link to='/' className='login__register-link text-blue-500 hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;