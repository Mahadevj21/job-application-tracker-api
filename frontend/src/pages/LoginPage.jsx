import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ identifier, password });
      toast.success('Welcome back to JobTracker!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Identity verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6 transform transition-transform hover:scale-105">
             <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Login</h2>
          <p className="mt-3 text-slate-500 text-sm font-medium">Continue your career tracking journey</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="email">Email or Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="input-field pl-10 h-12"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 h-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-500 font-medium">Auto-renew session</label>
            </div>
            <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">Lost access?</a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full h-12 text-base font-bold shadow-lg shadow-primary-100 transform transition-all active:scale-[0.98] active:shadow-sm"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <span className="flex items-center">Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" /></span>
            )}
          </button>

          <p className="text-center text-sm font-medium text-slate-500 px-1">
            Unregistered?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold transition-colors border-b-2 border-transparent hover:border-primary-600 pb-0.5">
              Create an identity
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
