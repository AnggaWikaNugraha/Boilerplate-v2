export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
}