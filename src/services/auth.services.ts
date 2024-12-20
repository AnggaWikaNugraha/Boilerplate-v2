import { LoginCredentials, RegisterCredentials, User } from '../types/auth';

// Simulated responses for demonstration
const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
};

const mockToken = 'mock-jwt-token';

export const authService = {

    async login(credentials: LoginCredentials) {
        // Simulate API call

        //{ user: User; token: string }>: Menentukan tipe data yang akan dikembalikan oleh Promise.
        return new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
                resolve({ user: mockUser, token: mockToken });
            }, 1000);
        });
    },

    async register(credentials: RegisterCredentials) {
        // Simulate API call
        return new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
                resolve({
                    user: { ...mockUser, name: credentials.name },
                    token: mockToken,
                });
            }, 1000);
        });
    },

    async loginWithGoogle() {
        // Simulate OAuth login
        return new Promise<{ user: User; token: string }>((resolve) => {
            setTimeout(() => {
                resolve({ user: mockUser, token: mockToken });
            }, 1000);
        });
    },

    logout() {
        localStorage.removeItem('token');
    },

}
