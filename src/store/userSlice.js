import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    isLogin: !!JSON.parse(localStorage.getItem('currentUser')),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(user =>
                user.email === email && user.password === password
            );
            if (user) {
                state.currentUser = user;
                state.isLogin = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLogin = false;
            localStorage.removeItem('currentUser');
        },
        register: (state, action) => {
            const { name, email, password } = action.payload;
            const userExists = state.users.some(user => user.email === email);
            if (!userExists) {
                const newUser = { id: Date.now(), name, email, password, bookings: [] };
                state.users.push(newUser);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        addBooking: (state, action) => {
            const { userId, bookingDetails } = action.payload;
            const userIndex = state.users.findIndex(user => user.id === userId);

            if (userIndex !== -1) {
                // Ensure the bookings array exists
                if (!state.users[userIndex].bookings) {
                    state.users[userIndex].bookings = [];
                }
                state.users[userIndex].bookings.push(bookingDetails);

                // Update currentUser if they are the one making the booking
                if (state.currentUser && state.currentUser.id === userId) {
                    state.currentUser = { ...state.users[userIndex] };
                    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                }

                // Update the master users list in localStorage
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        cancelBooking: (state, action) => {
            const { userId, bookingId } = action.payload;
            const userIndex = state.users.findIndex(user => user.id === userId);

            if (userIndex !== -1) {
                state.users[userIndex].bookings = state.users[userIndex].bookings.filter(
                    booking => booking.bookingId !== bookingId
                );

                if (state.currentUser && state.currentUser.id === userId) {
                    state.currentUser = { ...state.users[userIndex] };
                    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                }

                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
    }
});

export const { login, logout, register, addBooking, cancelBooking } = userSlice.actions;
export default userSlice.reducer;
