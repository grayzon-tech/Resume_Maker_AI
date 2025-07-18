import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { CoverLetterProvider } from './context/CoverLetterContext';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/navigation/Navbar';
import ResumeBuilder from './components/resume/ResumeBuilder';
import CoverLetterBuilder from './components/coverLetter/CoverLetterBuilder';
import LandingPage from './components/landing/LandingPage';
import './styles/animations.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

// Placeholder components for routes
const Dashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to your dashboard!</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <CoverLetterProvider>
          <Router>
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Navigate to="/landing" replace />} />
              <Route path="/*" element={
                <div className="min-h-screen bg-gray-100">
                  <Navbar />
                  <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Routes>
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/dashboard" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } />
                      <Route path="/create-resume" element={
                        <PrivateRoute>
                          <ResumeBuilder />
                        </PrivateRoute>
                      } />
                      <Route path="/cover-letter" element={
                        <PrivateRoute>
                          <CoverLetterBuilder />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </div>
                </div>
              } />
            </Routes>
          </Router>
        </CoverLetterProvider>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;