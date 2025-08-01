import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { movies = [], isLoading, isError } = useSelector((state) => state.movie);
    console.log('Movies state:', { movies, isLoading, isError });

    useEffect(() => {
        console.log('Dispatching fetchMovies');
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchMovies());
                console.log('Fetch result:', result);
            } catch (error) {
                console.error('Error in fetch:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
                <h1 className="text-white text-2xl">Loading movies...</h1>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">Failed to fetch movies. Please try again later.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Explore Movies</h1>
                {movies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <div key={movie.id} className="bg-[#2f2f2f] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h2>
                                    <div className="flex items-center text-yellow-400 mb-2">

                                    </div>
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                        {movie.overview || 'No description available.'}
                                    </p>
                                    <button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                        onClick={() => {
                                            navigate(`/movie/${movie.id}`);
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 text-xl">
                        <p>No movies found.</p>
                        <p>Try a different search or clear the search bar to see popular movies.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movies;