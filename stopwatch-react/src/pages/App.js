import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../backend/AuthContext';
import LoginForm from '../components/LoginForm';
import StopWatch from "../components/StopWatch";
import './App.css';

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<PrivateRoute element={<StopWatch />} />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;