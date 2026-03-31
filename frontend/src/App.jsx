import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import JobDetailPage from './pages/JobDetailPage';

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'px-6 py-4 rounded-2xl bg-white text-slate-900 border border-slate-100 font-bold tracking-tight shadow-2xl',
          success: {
            iconTheme: {
              primary: '#0ea5e9',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
      <Routes>
        {/* Auth Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path="/interviews" element={<Navigate to="/jobs" replace />} />
          </Route>
        </Route>

        {/* Catch All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
