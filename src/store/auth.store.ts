import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/auth.services';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

// call api

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {

    const response = await authService?.login(credentials);

    localStorage?.setItem('token', response.token);
    return response;
});

export const register = createAsyncThunk('auth/register', async (credentials: RegisterCredentials) => {

    const response = await authService?.register(credentials);

    localStorage.setItem('token', response.token);
    return response;
});

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async () => {

    const response = await authService.loginWithGoogle();

    localStorage.setItem('token', response.token);
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: (builder) => {
        builder

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })

            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })

            // Google Login
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Google login failed';
            });
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            authService.logout();
        },
    },

});

export const {
    logout,
} = authSlice.actions;
export default authSlice.reducer;