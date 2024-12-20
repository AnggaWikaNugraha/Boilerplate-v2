import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// React.ReactNode adalah tipe data yang mewakili elemen-elemen yang dapat dirender oleh React, termasuk:
// Komponen React (JSX), String, angka, atau elemen null, Array dari elemen-elemen tersebut.

// React.ReactNode adalah tipe bawaan di React yang digunakan untuk menunjukkan semua jenis elemen atau nilai yang dapat dirender oleh React. 
// Ini termasuk hampir semua hal yang bisa Anda masukkan di dalam JSX.
interface ProtectedRouteProps {
    children: React.ReactNode
}

// Menyatakan bahwa ProtectedRoute adalah sebuah functional component yang menerima props dengan struktur sesuai ProtectedRouteProps.
// simbo "< >" Generics adalah cara untuk mendeklarasikan tipe data yang fleksibel namun tetap aman secara tipe atau tipe parameter
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { token } = useSelector((state: RootState) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;