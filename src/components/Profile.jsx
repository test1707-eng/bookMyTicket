import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelBooking } from '../store/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleCancelBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            dispatch(cancelBooking({ userId: currentUser.id, bookingId }));
            toast.success('Booking successfully cancelled!');
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center text-white">
                <h1 className="text-2xl mb-4">You are not logged in.</h1>
                <Link to="/" className="text-blue-400 hover:underline">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#2f2f2f] rounded-lg shadow-xl p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-lg"><span className="font-semibold">Name:</span> {currentUser.name}</p>
                    <p className="text-lg"><span className="font-semibold">Email:</span> {currentUser.email}</p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
                    {currentUser.bookings && currentUser.bookings.length > 0 ? (
                        <div className="space-y-4">
                            {currentUser.bookings.map(booking => (
                                <div key={booking.bookingId} className="bg-[#2f2f2f] rounded-lg shadow-lg p-4 flex justify-between items-start gap-4">
                                    <div className='w-[200px] h-[200px]'>
                                        <img src={`https://image.tmdb.org/t/p/w500${booking.movieImage}`} className="w-full h-full object-cover rounded-lg" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-400">{booking.movieTitle}</h3>
                                        <p className="text-gray-300">Seats: <span className="font-semibold">{booking.seats.join(', ')}</span></p>
                                        <p className="text-gray-300">Total Amount: <span className="font-semibold">₹{booking.totalAmount}</span></p>
                                        <p className="text-xs text-gray-500 mt-2">Booked on: {new Date(booking.bookingDate).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCancelBooking(booking.bookingId)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">You have no bookings yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;