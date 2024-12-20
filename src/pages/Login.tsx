import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithGoogle } from '../store/auth.store';
import { RootState } from '../store/store';
import { LogIn, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    //  React.ChangeEvent<HTMLInputElement>: Tipe dari event yang diterima oleh handler ini.
    //  React.ChangeEvent adalah tipe event bawaan React untuk menangani perubahan pada elemen formulir seperti <input>, <textarea>, atau <select>.
    //  HTMLInputElement spesifik untuk elemen input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    // React.FormEvent: Tipe yang digunakan oleh React untuk event formulir.
    // Cakupan: Digunakan untuk elemen form seperti <form>, <input>, <textarea>, <select>, dll.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(credentials) as any);
    };

    const handleGoogleLogin = () => {
        dispatch(loginWithGoogle() as any);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <LogIn className="h-5 w-5 mr-2" />
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Chrome className="h-5 w-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginForm;