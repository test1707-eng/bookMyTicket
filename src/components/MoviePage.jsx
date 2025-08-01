import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '../store/movieSlice';
import TicketPopup from './tickitPopUp'; // Import the popup component

const MoviePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { movie, loading, error } = useSelector((state) => state.movie);
    const [isLoading, setIsLoading] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setIsLoading(true);
                await dispatch(fetchMovieById(id));
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id, dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
                <h1 className="text-red-500 text-2xl mb-4">Error loading movie</h1>
                <p className="text-gray-300 mb-4">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center p-4">
                <h1 className="text-white text-2xl mb-4">Movie not found</h1>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-400 hover:text-blue-300 flex items-center"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Movies
                </button>

                <div className="bg-[#2f2f2f] rounded-lg overflow-hidden shadow-xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : 'https://via.placeholder.com/300x450?text=No+Image'}
                                alt={movie.title}
                                className="w-full h-full max-h-[600px] object-cover md:w-96"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold">
                                {movie.release_date?.split('-')[0] || 'N/A'}
                                {movie.runtime && ` • ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                            </div>
                            <h1 className="text-3xl font-bold text-white mt-2">{movie.title}</h1>

                            <div className="flex items-center mt-2">
                                <div className="flex items-center bg-blue-600 text-white text-sm font-bold px-2.5 py-0.5 rounded">
                                    <span>★</span>
                                    <span className="ml-1">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                                </div>
                                <span className="ml-3 text-gray-300 text-sm">
                                    {movie.vote_count?.toLocaleString()} votes
                                </span>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                                <p className="text-gray-300">
                                    {movie.overview || 'No overview available.'}
                                </p>
                            </div>

                            {movie.genres?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Genres</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map(genre => (
                                            <span key={genre.id} className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                                    onClick={() => setIsPopupVisible(true)} // Show popup on click
                                >
                                    Book Tickets
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isPopupVisible && (
                <TicketPopup
                    movie={movie}
                    onClose={() => setIsPopupVisible(false)}
                />
            )}
        </div>
    );
};

export default MoviePage;