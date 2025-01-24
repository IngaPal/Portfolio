import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import MatrixRain from './components/MatrixRain';
import EnergyField from './components/EnergyField';
import CustomCursor from './components/CustomCursor';
import ErrorBoundary from './components/ErrorBoundary';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Добавляем компонент ProtectedRoute прямо здесь, чтобы не создавать новый файл
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
        <div className="min-h-screen bg-gray-900 relative overflow-hidden w-full">
  <div className="fixed inset-0 z-0">
    <MatrixRain />
    <EnergyField />
  </div>
  <CustomCursor />
  <Navbar />
  <main className="container mx-auto px-4 py-20 relative z-10">
    <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;