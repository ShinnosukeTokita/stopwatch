import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import StopWatch from "../components/StopWatch";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<StopWatch />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;