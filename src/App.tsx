import './App.css'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
