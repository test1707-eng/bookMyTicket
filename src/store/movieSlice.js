import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies: [],
    movie: null,
    isLoading: false,
    isError: false,
    error: null
};

const API_KEY = 'e9e9d8da18ae29fc430845952232787c'; // TMDB API key

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        return response.data.results; // Return the array of movies
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
});

export const fetchMovieById = createAsyncThunk("movies/fetchMovieById", async (movieId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        return response.data; // Return the movie details
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
});

export const searchMovies = createAsyncThunk("movies/searchMovies", async (query) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        return response.data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
});

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        clearMovie: (state) => {
            state.movie = null;
        }
    },
    extraReducers: (builder) => {
        // For fetchMovies
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload || [];
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchMovies.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // For fetchMovieById
        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            state.movie = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(fetchMovieById.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.error = action.error.message;
            state.movie = null;
        });
        builder.addCase(fetchMovieById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // For searchMovies
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.movies = action.payload || [];
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(searchMovies.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(searchMovies.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
    }
});

export default movieSlice.reducer;
export const { clearMovie } = movieSlice.actions;