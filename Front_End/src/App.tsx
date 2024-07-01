import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import TokenModal from './components/Modal/TokenModal';
import HomePage from './pages/Home/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import EventForm from './components/EventForm/EventForm';
import LoginPage from './pages/LoginPage/LoginPage';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <TokenModal />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={['user']}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
                <EventForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
