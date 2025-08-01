import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        movie: movieSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

// Log the initial state
console.log('Initial state:', store.getState());

// Subscribe to store updates
store.subscribe(() => {
    console.log('State updated:', store.getState());
});

export { store };
