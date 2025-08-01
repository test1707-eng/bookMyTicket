import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchMovies, fetchMovies } from '../store/movieSlice';
import { logout } from '../store/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

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
        setMenuOpen(false); // Close menu after search
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value === '') {
            dispatch(fetchMovies()); // Fetch popular movies when input is cleared
        }
    };

    return (
        <div className='header bg-[#1e1e1e] text-white p-4 relative z-10'>
            <div className='header__container container mx-auto flex items-center justify-between'>
                <div className='header__logo'>
                    <Link to="/home"><h1>BookMyMovie</h1></Link>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex items-center gap-6 font-semibold'>
                        <li><Link to='/home' className='bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F]'>Home</Link></li>
                        <li><Link to='/profile' className='bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F]'>Profile</Link></li>
                        <li><button onClick={handleLogout} className='bg-[#2f2f2f] p-2 rounded hover:bg-[#5F5F5F]'>Logout</button></li>
                    </ul>
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

                {/* Hamburger Menu Icon */}
                <div className='md:hidden'>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={!menuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='md:hidden absolute top-full left-0 right-0 bg-[#1e1e1e] p-4'>
                    <ul className='flex flex-col items-center gap-4 font-semibold'>
                        <li className='w-full'><Link to='/home' onClick={() => setMenuOpen(false)} className='block text-center bg-[#2f2f2f] p-2 rounded w-full hover:bg-[#5F5F5F]'>Home</Link></li>
                        <li className='w-full'><Link to='/profile' onClick={() => setMenuOpen(false)} className='block text-center bg-[#2f2f2f] p-2 rounded w-full hover:bg-[#5F5F5F]'>Profile</Link></li>
                        <li className='w-full'><button onClick={() => { handleLogout(); setMenuOpen(false); }} className='block text-center bg-[#2f2f2f] p-2 rounded w-full hover:bg-[#5F5F5F]'>Logout</button></li>
                    </ul>
                    <form className='header__search mt-4' onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder='Search for movies...'
                            className='header__search-input bg-[#2f2f2f] p-2 rounded w-full'
                            value={query}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default Header;