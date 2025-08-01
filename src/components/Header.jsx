import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchMovies, fetchMovies } from '../store/movieSlice';
import { logout } from '../store/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(searchMovies(query));
        } else {
            dispatch(fetchMovies()); // Fetch popular movies if search is empty
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value === '') {
            dispatch(fetchMovies()); // Fetch popular movies when input is cleared
        }
    };

    return (
        <div className='header bg-[#1e1e1e] text-white p-4'>
            <div className='header__container container mx-auto flex items-center justify-between'>
                <div className='header__logo'>
                    <Link to="/home"><h1>BookMyMovie</h1></Link>
                </div>
                <div className='header__profile'>
                    <ul className='flex items-center gap-6 font-semibold '>
                        <li className='header__profile-link bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F] hover:text-white cursor-pointer'> <Link to='/home' className='header__profile-link'>Home</Link>   </li>
                        <li className='header__profile-link bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F] hover:text-white cursor-pointer'> <Link to='/profile' className='header__profile-link'>Profile</Link>   </li>
                        <li className='header__profile-link bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F] hover:text-white cursor-pointer' onClick={handleLogout}> <button className='header__profile-link'>Logout</button> </li>
                    </ul>
                </div>
                <form className='header__search' onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder='Search for movies...'
                        className='header__search-input bg-[#2f2f2f] p-2 rounded w-64'
                        value={query}
                        onChange={handleInputChange}
                    />
                </form>
            </div>
        </div>
    );
};

export default Header;