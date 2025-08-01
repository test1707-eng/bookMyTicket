import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../store/userSlice';
import { toast } from 'react-toastify';

const TicketPopup = ({ movie, onClose }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const ticketPrice = 150; // Price per ticket
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prevSeats =>
            prevSeats.includes(seatId)
                ? prevSeats.filter(s => s !== seatId)
                : [...prevSeats, seatId]
        );
    };

    const renderSeats = () => {
        const rows = 5;
        const cols = 10;
        const seats = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                // Example of some seats being already booked
                const isBooked = (i === 2 && j > 3 && j < 7) || (i === 4 && j === 5);

                seats.push(
                    <div
                        key={seatId}
                        className={`w-8 h-8 m-1 rounded cursor-pointer flex items-center justify-center text-xs font-bold
                            ${isBooked ? 'bg-gray-600 cursor-not-allowed' : ''}
                            ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}
                        `}
                        onClick={() => !isBooked && handleSeatClick(seatId)}
                    >
                        {seatId}
                    </div>
                );
            }
        }
        return seats;
    };

    const totalAmount = selectedSeats.length * ticketPrice;

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            toast.error('Please select at least one seat.');
            return;
        }

        if (!currentUser) {
            toast.error('You must be logged in to book tickets.');
            return;
        }

        const bookingDetails = {
            bookingId: Date.now(),
            movieTitle: movie.title,
            movieId: movie.id,
            seats: selectedSeats,
          
            totalAmount,
            bookingDate: new Date().toISOString(),
        };

        dispatch(addBooking({ userId: currentUser.id, bookingDetails }));
        toast.success(`Successfully booked ${selectedSeats.length} seat(s) for ${movie.title}!`);
        onClose(); // Close the popup after booking
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
            <div className='bg-[#2f2f2f] text-white rounded-lg shadow-xl w-full max-w-2xl'>
                <div className='p-6 border-b border-gray-600 flex justify-between items-center'>
                    <div>
                        <h2 className='text-2xl font-bold'>{movie.title}</h2>
                        <p className='text-sm text-gray-400'>Select your seats</p>
                    </div>
                    <button onClick={onClose} className='text-gray-400 hover:text-white'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className='p-6'>
                    <div className='flex justify-center mb-4'>
                        <div className='w-full max-w-md bg-black text-white text-center py-2 rounded-t-lg'>SCREEN</div>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        {renderSeats()}
                    </div>
                    <div className='flex justify-center gap-4 mt-4 text-sm'>
                        <div className='flex items-center'><div className='w-4 h-4 bg-gray-300 rounded mr-2'></div>Available</div>
                        <div className='flex items-center'><div className='w-4 h-4 bg-blue-500 rounded mr-2'></div>Selected</div>
                        <div className='flex items-center'><div className='w-4 h-4 bg-gray-600 rounded mr-2'></div>Booked</div>
                    </div>
                </div>

                <div className='p-6 bg-gray-800 rounded-b-lg'>
                    {selectedSeats.length > 0 ? (
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-lg font-bold'>{selectedSeats.length} Seat(s) Selected</p>
                                <p className='text-sm text-gray-400'>{selectedSeats.join(', ')}</p>
                            </div>
                            <button
                                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg'
                                onClick={handleBooking}
                            >
                                Select
                            </button>
                        </div>
                    ) : (
                        <p className='text-center text-gray-400'>Please select a seat to continue.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketPopup;