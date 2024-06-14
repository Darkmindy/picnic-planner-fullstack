import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import LoginForm1 from './components/LoginForm/LoginForm1';
import HomePage from './components/HomePage/HomePage';
import AdminPage from './components/AdminPage/AdminPage';
import UnauthorizedPage from './components/UnauthorizedPage/UnauthorizedPage';
import SignUpForm from './components/SignUpForm/SignUpForm'; // Importa il nuovo componente

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm1 />} />
          <Route path="/signup" element={<SignUpForm />} /> {/* Aggiungi il percorso per il form di registrazione */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={['user', 'admin']}>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
